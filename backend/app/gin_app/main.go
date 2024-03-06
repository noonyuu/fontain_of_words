package main

import (
	"gin_app/auth_grpc"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	Init()

	router := gin.Default()

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

		//更新済みか取得
		refreshed := ctx.DefaultQuery("refreshed","0")

		//更新済みではない場合
		if refreshed != "1" {
			ctx.Redirect(http.StatusTemporaryRedirect, "/auth/refresh?redirect_path=/app/")
			return
		}
		
		log.Println(user)

		ctx.JSON(http.StatusOK, gin.H{"name" : user.Name})
	})

	router.GET("/ping", func(ctx *gin.Context) {
		
	})
	router.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}
