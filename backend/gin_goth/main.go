package main

import (
	"context"
	"crypto/sha512"
	"fmt"

	"log"
	"net/http"
	"os"
	"time"

	"gin_oauth/auth"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"

	"github.com/markbates/goth/providers/discord"
	"github.com/markbates/goth/providers/github"
	"github.com/markbates/goth/providers/google"
	"github.com/markbates/goth/providers/line"
	"github.com/markbates/goth/providers/microsoftonline"

	"github.com/wader/gormstore/v2"

	"github.com/joho/godotenv"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"

	"github.com/mileusna/useragent"
)

func contextWithProviderName(ctx *gin.Context, provider string) *http.Request {
	return ctx.Request.WithContext(context.WithValue(ctx.Request.Context(), "provider", provider))
}

func loadEnv() {
	// ここで.envファイル全体を読み込みます。
	// この読み込み処理がないと、個々の環境変数が取得出来ません。
	// 読み込めなかったら err にエラーが入ります。
	err := godotenv.Load(".env")

	// もし err がnilではないなら、"読み込み出来ませんでした"が出力されます。
	if err != nil {
		log.Panicln("読み込み出来ませんでした: %v", err)
	}
}

var (
	//有効期限
	exp_time = 31536000
	domain = ""
)

func main() {
	loadEnv()

	//認証初期化
	err := auth.Init()

	//エラー処理
	if err != nil {
		panic("failed to connect database")
	}

	//JWT鍵設定
	jwt_secret := os.Getenv("JWT_SECRET")

	//鍵がない場合
	if jwt_secret == "" {
		panic("No JWT_SECRET environment variable set")
	}

	//JWT鍵設定
	auth.Secret = []byte(jwt_secret)

	//セッション鍵
	key := os.Getenv("SESSION_SECRET") // Replace with your SESSION_SECRET or similar

	//鍵がない場合
	if key == "" {
		panic("No SESSION_SECRET environment variable set")
	}

	//認証用DB
	dbconn, err := gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	//ストア設定
	store := gormstore.New(dbconn, []byte(key))
	store.MaxAge(31536000)
	store.SessionOpts.Secure = true
	store.SessionOpts.HttpOnly = true
	store.SessionOpts.SameSite = http.SameSiteLaxMode

	//クリーンアップ
	quit := make(chan struct{})
	go store.PeriodicCleanup(1*time.Hour, quit)

	//ストアを設定する
	gothic.Store = store

	//プロバイダ設定
	goth.UseProviders(
		google.New(os.Getenv("Google_ID"), os.Getenv("Google_SECRET"), os.Getenv("Google_Redirect_URL"), "email", "profile"),
		github.New(os.Getenv("Github_ID"), os.Getenv("Github_SECRET"), os.Getenv("Github_Redirect_URL"), "read:user", "user:email"),
		discord.New(os.Getenv("Discord_ID"), os.Getenv("Discord_SECRET"), os.Getenv("Discord_Redirect_URL"), "identify", "email"),
		line.New(os.Getenv("Line_ID"), os.Getenv("Line_SECRET"), os.Getenv("Line_Redirect_URL"), "profile", "openid"),
		microsoftonline.New(os.Getenv("Microsoftonline_ID"), os.Getenv("Microsoftonline_SECRET"), os.Getenv("Microsoftonline_Redirect_URL"), "user.read", "email", "openid", "profile"),
	)

	//GRPC開始
	go start_grpc()

	//ルータ
	router := gin.Default()

	//セッション設定
	session_store := cookie.NewStore([]byte(key))
	session_store.Options(sessions.Options{
		MaxAge:   exp_time,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		Domain:   domain,
	})

	router.Use(sessions.Sessions("AuthSession", session_store))

	//ミドルウェア設定
	router.Use(auth.Middleware())

	router.POST("/refresh", func(ctx *gin.Context) {
		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		//認証済み判定
		authed := ctx.MustGet("authed")

		//認証済みか
		if !authed.(bool) {
			//認証されていなかったら
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
			return
		}

		//トークン解析
		token_data, err := auth.ParseToken(ctx.MustGet("token").(string))

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		//ユーザーエージェント取得
		UserAgent := ctx.GetHeader("User-Agent")

		//新しいトークン発行
		new_token, err := auth.UpdateToken(token_data.TokenId, UserAgent)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		//セキュリティ
		ctx.SetSameSite(http.SameSiteLaxMode)
		//Cookie設定
		ctx.SetCookie("token", new_token, exp_time, "/", domain, true, true)
		//レスポンスを返す
		ctx.JSON(200,gin.H{"message" : "success"})
	})

	router.GET("/:provider", func(ctx *gin.Context) {
		_, err := set_redirect_url(ctx)

		//エラー処理
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		//認証済みか取得
		authed := ctx.MustGet("authed")

		//認証済みか
		if authed.(bool) {
			//認証されていたら
			//ログアウト処理
			err := Logout(ctx)

			//エラー処理
			if err != nil {
				ctx.JSON(500,gin.H{"error" : err.Error()})
				return
			}
		}

		provider := ctx.Param("provider")
		ctx.Request = contextWithProviderName(ctx, provider)

		//認証
		gothic.BeginAuthHandler(ctx.Writer, ctx.Request)
	})

	router.GET("/.well-known/microsoft-identity-association.json", func(ctx *gin.Context) {
		ctx.File("./Secret/microsoft-identity-association.json")
	})

	router.GET("/:provider/callback", func(ctx *gin.Context) {
		//プロバイダ取得
		provider := ctx.Param("provider")
		//コンテキスト差し替え
		ctx.Request = contextWithProviderName(ctx, provider)

		//認証
		user, err := gothic.CompleteUserAuth(ctx.Writer, ctx.Request)
		if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}

		//ID生成
		hash_data := sha512.Sum512([]byte(user.Provider + user.UserID))
		hash_data_str := fmt.Sprintf("%x", hash_data)

		//ユーザデータ取得
		get_user, err := auth.GetUserInfo(hash_data_str)

		//ユーザ情報
		register_data := auth.User{
			UserID:         hash_data_str,
			Provider:       user.Provider,
			ProviderUserId: user.UserID,
			Name:           user.Name,
			NickName:       user.NickName,
			LastName:       user.LastName,
			FirstName:      user.FirstName,
			AvatarURL:      user.AvatarURL,
			Email:          user.Email,
			Description:    user.Description,
			ExpiresAt:      user.ExpiresAt,
		}

		if err == gorm.ErrRecordNotFound {
			//登録
			err = auth.Register(register_data)

			//エラー処理
			if err != nil {
				ctx.JSON(500, gin.H{"error": err.Error()})
				return
			}

			//ユーザ取得
			get_user, err = auth.GetUserInfo(hash_data_str)

			//エラー処理
			if err != nil {
				ctx.JSON(500, gin.H{"error": err.Error()})
				return
			}
		} else if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		} else {
			log.Println("更新")
			//更新
			err = auth.UpdateUSer(register_data)

			//エラー処理
			if err != nil {
				ctx.JSON(500, gin.H{"error": err.Error()})
				return
			}

			get_user, err = auth.GetUserInfo(hash_data_str)

			//エラー処理
			if err != nil {
				ctx.JSON(500, gin.H{"error": err.Error()})
				return
			}
		}

		_ = get_user

		//ユーザーエージェント取得
		UserAgent := ctx.GetHeader("User-Agent")

		//トークン生成
		token, err := auth.GenToken(hash_data_str, UserAgent)

		//エラー処理
		if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}

		//セキュリティ
		ctx.SetSameSite(http.SameSiteLaxMode)
		//トークン設定
		ctx.SetCookie("token", token, exp_time, "/", domain, true, true)
		//リダイレクト
		ctx.Redirect(303, get_redirect_url(ctx))
	})

	router.POST("/logout", func(ctx *gin.Context) {
		//認証済み判定
		authed := ctx.MustGet("authed")

		//認証済みか
		if !authed.(bool) {
			//認証されていなかったら
			ctx.JSON(http.StatusUnauthorized,gin.H{"message" : "not authenticated"})
			return
		}

		//ログアウト処理
		err := Logout(ctx)

		//エラー処理
		if err != nil {
			ctx.JSON(500,gin.H{"error" : err.Error()})
			return
		}

		//成功メッセージ
		ctx.JSON(200,gin.H{
			"message" : "success",
		})
	})

	router.POST("/disable_session", func(ctx *gin.Context) {
		//認証済み判定
		authed := ctx.MustGet("authed")

		//認証済みか
		if !authed.(bool) {
			//認証されていなかったら
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
			return
		}

		//ユーザ取得
		user := ctx.MustGet("user").(auth.User)

		var data DisableData

		//情報取得
		if err := ctx.ShouldBindJSON(&data); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		//トークンからユーザID取得
		userid, err := auth.Valid_token(data.SessionID)

		//エラー処理
		if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}

		//ユーザーID比較
		if userid != user.UserID {
			ctx.JSON(http.StatusForbidden, gin.H{"message": "No permission"})
			return
		}

		//トークン無効
		err = auth.DisableToken(data.SessionID)

		//エラー処理
		if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"message": "success"})
	})

	router.POST("/getuser",func(ctx *gin.Context) {
		//認証済み判定
		authed := ctx.MustGet("authed")

		//認証済みか
		if !authed.(bool) {
			//認証されていなかったら
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
			return
		}

		user := ctx.MustGet("user").(auth.User)
		
		ctx.JSON(200,gin.H{
			"id" : user.UserID,
			"name" : user.Name,
			"icon" : user.AvatarURL,
			"mail" : user.Email,
			"provider" : user.Provider,	

			"first_name" : user.FirstName,
			"nick_name" : user.NickName,
			"last_name" : user.LastName,
		})
	})

	router.POST("/sessions", func(ctx *gin.Context) {
		//認証済み判定
		authed := ctx.MustGet("authed")

		//認証済みか
		if !authed.(bool) {
			//認証されていなかったら
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
			return
		}

		//ユーザ取得
		user := ctx.MustGet("user").(auth.User)

		//トークン取得
		tokens, err := auth.GetTokens(user.UserID)

		//エラー処理
		if err != nil {
			ctx.JSON(500, gin.H{"error": err.Error()})
			return
		}

		//結果
		results := []SessionData{}

		for token_data := range tokens {
			//ユーザーエージェント解析
			ua := useragent.Parse(tokens[token_data].UserAgent)

			//結果追加
			results = append(results, SessionData{
				IsMobile:  ua.Mobile,
				IsDesktop: ua.Desktop,
				IsTablet:  ua.Tablet,
				IsBot:     ua.Bot,
				OSstr:     ua.OS,

				Browser:   ua.Name,
				Exptime:   tokens[token_data].Exptime,
				SessionID: tokens[token_data].SessionID,
			})
		}

		//結果返却
		ctx.JSON(200, gin.H{"sessions": results})
	})

	router.RunTLS(":3000", "./keys/server.crt", "./keys/server.key")

}

func Logout(ctx *gin.Context) error {
	gothic.Logout(ctx.Writer, ctx.Request)
	//トークン無効か
	err := auth.DisableToken(ctx.MustGet("token").(string))

	//エラー処理
	if err != nil {
		return err
	}

	//cookie削除
	ctx.SetCookie("token", "", -1, "/", domain, true, true)

	return nil
}

type DisableData struct {
	SessionID string
}

type SessionData struct {
	IsMobile  bool
	IsDesktop bool
	IsTablet  bool
	IsBot     bool

	OSstr     string
	Browser   string
	Exptime   int64
	SessionID string
}

// リダイレクトURL取得
func get_redirect_url(ctx *gin.Context) string {
	//セッション取得
	session := sessions.Default(ctx)

	//リダイレクトURL取得
	redirect_url := session.Get("redirect_path")

	//リダイレクトURLがなかった時
	if redirect_url == nil {
		return "/"
	}

	//URL文字列
	url_str := redirect_url.(string)

	return url_str
}

// リダイレクトURL設定
func set_redirect_url(ctx *gin.Context) (string, error) {
	session := sessions.Default(ctx)

	//パラメータから取得
	redirect_url := ctx.DefaultQuery("redirect_path", "/")

	//設定
	session.Set("redirect_path", redirect_url)

	//更新
	err := session.Save()

	//エラー処理
	if err != nil {
		return "/", err
	}

	return redirect_url, nil
}
