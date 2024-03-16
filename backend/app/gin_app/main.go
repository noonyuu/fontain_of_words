package main

import (
	"bufio"
	"gin_app/auth_grpc"
	"gin_app/database"
	"os"
	"path/filepath"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"

	"github.com/gorilla/websocket"

	//TODO 開発用
	"github.com/gin-contrib/cors"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  8192,
	WriteBufferSize: 8192,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// .envを呼び出します。
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

func main() {
	loadEnv()

	//フォルダを削除する
	if err := os.Remove("texts"); err != nil {
		log.Println(err)
	}

	//フォルダを作成する
	if err := os.Mkdir("texts", 0777); err != nil {
		log.Fatalln(err)
	}

	Init()
	//パーサー初期化
	parser_init()

	//AI初期化
	Gemini_Init()

	//データベース初期化
	database.DBPATH = "./Datas.db"
	err := database.Init()

	//エラー処理
	if err != nil {
		//パニックを起こす
		log.Fatalln(err)
	}

	//検索中初期化
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		//パニックを起こす
		log.Fatalln(err)
	}

	//検索中を false にする
	init_result := dbconn.Model(&database.Word{}).Where(database.Word{IsSearching: true}).Update("IsSearching", false)

	//エラー処理
	if init_result.Error != nil {
		//パニックを起こす
		log.Fatalln(init_result.Error)
	}

	log.Println(init_result.RowsAffected)

	//ルーター
	router := gin.Default()

	//TODO CORS
	router.Use(cors.Default())

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

		ctx.Redirect(http.StatusTemporaryRedirect, "/")
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
		ctx.JSON(200, gin.H{"name" : wordbook.Name,"words": result})
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
			IsSearching: false,
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

	router.POST("/uptext", func(ctx *gin.Context) {
		//データ取得
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		//ファイル取得
		file, err := ctx.FormFile("file")

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//IDを生成
		uid, err := GenID()

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//ファイル保存
		savepath := filepath.Join("./texts", uid+".txt")

		//ファイル保存
		err = ctx.SaveUploadedFile(file, savepath)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//テキストを取得
		tfile, err := os.Open(savepath)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//テキストを取得
		scanner := bufio.NewScanner(tfile)

		total_result := []string{}
		//テキストを取得
		for scanner.Scan() {
			//テキストを取得
			text := scanner.Text()

			//テキスト解析
			total_result = append(total_result, parse_sentence(text))
		}

		//エラー処理
		if err = scanner.Err(); err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//ファイルを閉じる
		err = tfile.Close()

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//ファイルを削除
		err = os.Remove(savepath)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		ctx.JSON(200, gin.H{"result": total_result})
	})

	type TextData struct {
		Text string //テキスト
	}

	router.POST("/ai", func(ctx *gin.Context) {
		//データ取得
		success := ctx.MustGet("success")

		//認証されているか
		if !success.(bool) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		var data TextData
		//データ取得
		if err := ctx.ShouldBindJSON(&data); err != nil {
			log.Println(err)
			//エラーを返す
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		//クエリから取得
		is_refresh := ctx.DefaultQuery("refresh", "0")

		//単語を取得
		word_data, err := GetWord(data.Text)

		if err == gorm.ErrRecordNotFound {
			//存在しない時
			log.Println("新規作成")
			//単語ID生成
			word_id, err := GenID()

			//エラー処理
			if err != nil {
				log.Println(err)
				ctx.JSON(500, gin.H{"message": err.Error()})
				return
			}

			//単語を生成 (ない場合は生成)
			gen_word, err := GenerateWord(database.Word{
				ID:          word_id,
				Word:        data.Text,
				Description: "",
				IsSearching: false,
			})

			//設定
			word_data = gen_word

			//エラー処理
			if err != nil {
				log.Println(err)
				ctx.JSON(500, gin.H{"message": err.Error()})
				return
			}

		} else if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		log.Println(is_refresh)

		if is_refresh == "0" {
			//説明文を取得
			if word_data.Description != "" {
				ctx.JSON(200, gin.H{"result": "ok", "status": "success", "message": word_data.Description})
				return
			}
		}

		//検索中なら戻る
		if word_data.IsSearching {
			ctx.JSON(200, gin.H{"result": "", "status": "failed", "Sear": "searching", "count": Count_Que()})
			return
		}

		//説明文を取得
		PushText(word_data.ID, word_data.Word)

		//キューのカウントが多い場合
		if Count_Que() > 10 {
			ctx.JSON(200, gin.H{"result": "", "status": "wait", "message": "many que", "count": Count_Que()})
			return
		}

		//キューが少ない場合聞いてみる
		result, err := CallAI(word_data.ID, word_data.Word)

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(500, gin.H{"message": err.Error()})
			return
		}

		ctx.JSON(200, gin.H{"result": "ok", "status": "success", "message": result})
	})

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
					break
				}

				log.Println(txtData.Text)

				//結果を書き込む
				err = wsconn.WriteJSON(map[string]string{
					"result": parse_sentence(txtData.Text),
				})

				//エラー処理
				if err != nil {
					log.Println(err)
					break
				}
			}
		}()
	})

	router.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}