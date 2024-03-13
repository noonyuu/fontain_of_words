package main

import (
	"gin_app/auth_grpc"
	"gin_app/database"
	"strings"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gorilla/websocket"

	"github.com/ikawaha/kagome-dict/ipa"
	"github.com/ikawaha/kagome/v2/tokenizer"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  8192,
	WriteBufferSize: 8192,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func main() {
	Init()

	//tokenizer
	tokennn, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		panic(err)
	}

	//データベース初期化
	database.DBPATH = "./Datas.db"
	err = database.Init()

	//エラー処理
	if err != nil {
		//パニックを起こす
		log.Fatalln(err)
	}

	//ルーター
	router := gin.Default()

	//認証用ミドルウェア
	router.Use(AuthMiddleware())

	router.GET("/", func(ctx *gin.Context) {
		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)
		log.Println(user)

		ctx.Redirect(http.StatusTemporaryRedirect, "/statics/index.html")
	})

	router.GET("/ping", func(ctx *gin.Context) {

	})

	//単語帳api グループ
	word_group := router.Group("/wordbook")

	type BookData struct {
		Name string
		ID   string
	}

	type WordData struct {
		Word   string //単語
		WordID string //単語ID
	}

	type Get_BookData struct {
		Id   string //単語帳ID
		Name string //単語帳名

		Words []WordData
	}

	//単語帳を取得する エンドポイント
	word_group.GET("/get_books", func(ctx *gin.Context) {
		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//単語帳を取得
		books, err := GetWordBooksByUserID(user.UserID)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": "Internal Server Error"})
			return
		}

		//データ
		datas := []Get_BookData{}

		//回す
		for book := range books {
			//追加するデータ
			add_word_datas := []WordData{}

			//単語一覧
			words := books[book].Words

			//単語を回す
			for word := range words {
				//単語を取得 IDから
				word_data, err := GetWord_Byid(words[word].Wordid)

				//エラー処理
				if err != nil {
					log.Println(err)
					continue
				}

				//単語を追加
				add_word_datas = append(add_word_datas, WordData{
					Word:   word_data.Word,
					WordID: words[word].Wordid,
				})
			}
			//追加する
			datas = append(datas, Get_BookData{
				Id:   books[book].ID,
				Name: books[book].Name,

				Words: add_word_datas,
			})

		}

		//成功
		ctx.JSON(200, gin.H{"books": datas})
	})

	word_group.GET("/get_book/:id", func(ctx *gin.Context) {
		//単語帳を取得するエンドポイント (単語帳)

		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//クエリから取得
		bookid := ctx.Param("id")

		//単語帳が存在するか
		if bookid == "" {
			ctx.JSON(500, gin.H{"message": "Book Not Found"})
			return
		}

		//単語帳を取得
		wordbook, err := GetWordBook_Preload(user.UserID, bookid)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//単語ID一覧
		result := []WordData{}

		//単語を回す
		for _, val := range wordbook.Words {
			//単語取得
			winfo, err := GetWord_Byid(val.Wordid)

			//エラー処理
			if err != nil {
				log.Println(err)
				continue
			}

			//単語IDを追加
			result = append(result, WordData{
				Word:   winfo.Word,
				WordID: val.Wordid,
			})
		}

		//成功
		ctx.JSON(200, gin.H{"words": result})
	})

	word_group.POST("/delete", func(ctx *gin.Context) {
		//削除するエンドポイント (単語帳)
		var data BookData
		//データ取得
		if err := ctx.ShouldBindJSON(&data); err != nil {
			log.Println(err)
			//エラーを返す
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//単語帳を作成
		err := DeleteWordBook(user.UserID, data.ID)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//成功
		ctx.JSON(200, gin.H{"message": "success"})
	})

	word_group.POST("/create", func(ctx *gin.Context) {
		//作成するエンドポイント (単語帳)
		var data BookData
		//データ取得
		if err := ctx.ShouldBindJSON(&data); err != nil {
			log.Println(err)
			//エラーを返す
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//単語帳を作成
		bookid, err := CreateWordBook(user.UserID, data.Name)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//成功
		ctx.JSON(200, gin.H{"bookid": bookid})
	})

	type RegisterData struct {
		Bookid string `json:"bookid"`
		Word   string `json:"word"`
	}

	word_group.POST("/register", func(ctx *gin.Context) {
		//作成するエンドポイント (単語帳)
		var data RegisterData
		//データ取得
		if err := ctx.ShouldBindJSON(&data); err != nil {
			log.Println(err)
			//エラーを返す
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//単語ID生成
		word_id, err := GenID()

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//単語を生成 (ある場合は生成)
		gen_word, err := GenerateWord(database.Word{
			ID:          word_id,
			Word:        data.Word,
			Description: "",
		})

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//単語登録
		err = RegisterWord(user.UserID, data.Bookid, gen_word)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		log.Println(gen_word)

		//登録されているか
		is_registered, err := check_registerd(user.UserID, data.Bookid, gen_word.ID)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		log.Println(is_registered)

		//成功
		ctx.JSON(200, gin.H{"message": "success"})
	})

	type DeleteData struct {
		Bookid string `json:"bookid"`
		WordID string `json:"wordid"`
	}

	//単語帳から単語を削除するエンドポイント
	word_group.POST("/unregister", func(ctx *gin.Context) {
		//作成するエンドポイント (単語帳)
		var data DeleteData
		//データ取得
		if err := ctx.ShouldBindJSON(&data); err != nil {
			log.Println(err)
			//エラーを返す
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//単語が登録されているか
		is_registered, err := check_registerd(user.UserID, data.Bookid, data.WordID)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//登録されていない時
		if !is_registered {
			ctx.JSON(404, gin.H{"message": "Not Found"})
			return
		}

		//単語削除
		err = UnregisterWord(user.UserID, data.Bookid, data.WordID)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//成功
		ctx.JSON(200, gin.H{"message": "success"})
	})

	//単語の説明を取得するエンドポイント
	router.GET("/description/:id", func(ctx *gin.Context) {
		//説明を取得するエンドポイント
		//クエリから取得
		wordid := ctx.Param("id")

		//単語帳が存在するか
		if wordid == "" {
			ctx.JSON(400, gin.H{"message": "Invalid word ID"})
			return
		}

		//単語を取得
		word, err := GetWord_Byid(wordid)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//説明がない場合
		if word.Description == "" {
			ctx.JSON(404, gin.H{"message": "no word description"})
			return
		}

		//成功
		ctx.JSON(200, gin.H{"description": word.Description})
	})

	type TextData struct {
		Text string	//テキスト
	}

	//WebSocket
	router.GET("/ws", func(ctx *gin.Context) {
		//データ取得
		user_data := ctx.MustGet("user")
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//キャスト
		user := user_data.(*auth_grpc.User)

		//WebSocket
		wsconn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println(user.UserID)
		
		//テキスト
		txtData := TextData{}

		//ループ回す
		go func() {
			defer wsconn.Close()

			for {
				//メッセージ読み込み
				err = wsconn.ReadJSON(&txtData)

				//エラー処理
				if err != nil {
					log.Println(err)
					return
				}

				log.Println(txtData.Text)
			
				tokens := tokennn.Tokenize(txtData.Text)

				for _, token := range tokens {
					
					features := strings.Join(token.Features(), ",")
					log.Printf("%s\t%v\t%v\n", token.Surface, features,token.Index)
				}
			}
		}()
	})

	router.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}
