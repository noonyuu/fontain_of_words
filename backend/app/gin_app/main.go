package main

import (
	"gin_app/auth_grpc"
	"gin_app/database"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	Init()

	//データベース初期化
	database.DBPATH = "./Datas.db"
	err := database.Init()

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
				word_data,err := GetWord_Byid(words[word].Wordid)

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
		wordbook, err := GetWordBook(user.UserID, bookid)

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
			winfo,err := GetWord_Byid(val.Wordid)

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
		
		is_registered,err := check_registerd(user.UserID,data.Bookid,gen_word.ID)

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

	router.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}
