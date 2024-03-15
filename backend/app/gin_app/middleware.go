package main

import (
	"github.com/gin-gonic/gin"

	"gin_app/auth_grpc"
	"log"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

var conn *grpc.ClientConn = nil
var auth_conn auth_grpc.AuthServerClient = nil
var isInit = false

func Init() error {
	//サーバーに接続
	conn, err := grpc.Dial("auth_Server:9000", grpc.WithInsecure())

	//エラー処理
	if err != nil {
		return err
	}

	//クライアントに接続
	auth_conn = auth_grpc.NewAuthServerClient(conn)

	//初期化
	isInit = true

	return nil
}

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		//サーバーに接続
		if !isInit {
			ctx.JSON(500, gin.H{"message": "Server Not Inited"})
			ctx.Abort()
			return
		}

		//初期化
		ctx.Set("success", false)
		ctx.Set("user", nil)

		//TODO 絶対に戻す
		//トークン取得
		token, err := ctx.Cookie("token")

		if err != nil {
			log.Println(err)
		 	//TODO 必ず戻す
			token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTMxOTY5NDcsInRva2VuaWQiOiI3YjM2ODJiOTFjYmU0MzIxYjI2ZjdiNmZiNDA4MmUwZCJ9.14HkHkU-jU7MyD84CL_AZpt9JyT4Hg5ZAOZ6RTFu9bDBJFZpK55h3ufu2P0e5TqSqT5Wp73y7a3w2nLqSufiHw"

		}

		// log.Println(token)
		
		//認証
		response, err := auth_conn.Auth(context.Background(), &auth_grpc.AuthToken{Token: token,UserAgent: ""})
		if err != nil {
			log.Println("Error when calling SayHello: %s", err)
			ctx.Next()
			return
		}

		//成功したか
		if response.Success {
			//データ設定
			ctx.Set("success", true)
			ctx.Set("user", response.User)
			ctx.Next()
			return
		}

		ctx.Next()
	}
}
