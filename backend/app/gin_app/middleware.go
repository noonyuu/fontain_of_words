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
			token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTMxNzgyNjQsInRva2VuaWQiOiI5YzRkMTBlNWM3NmI0MjU1OWJhNDIzMzdkMmJiMDVlZCJ9.o9nBTpdq1H5oOl6aznkonR35p-9CiGGYmjNr9j0YitztVfSj2NHsubJKUv3bcEOTZ48XhoRP2R3JOHqORjPAyg"

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
