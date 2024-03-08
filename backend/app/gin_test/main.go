package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"go_test/auth_grpc"
	"log"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

func main() {
	var conn *grpc.ClientConn
	conn, err := grpc.Dial("auth_Server:9000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	auth_conn := auth_grpc.NewAuthServerClient(conn)

	/*
		response, err := auth_conn.Auth(context.Background(), &auth_grpc.AuthToken{Token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiZGU0NTA5NDIxNWQyNDUzZWEwZWU5ZDQzZDAzZjAxZTMifQ.bFp3ph_2BpRcZvLKVAO1FP_hjRHullt7XrQ4huhE3rWN-gLyNedpVsXaW6WTqRhQzsXmOhiu8HMa0D_69Ixd9g"})
		if err != nil {
			log.Fatalf("Error when calling SayHello: %s", err)
		}

		log.Println(response.Success)
		log.Println(response.User)
	*/

	context.Background()
	_ = auth_conn

	defer conn.Close()

	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		token,err := ctx.Cookie("token")

		//エラー処理
		if err != nil {
			log.Println(err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		response, err := auth_conn.Auth(context.Background(), &auth_grpc.AuthToken{Token: token})
		if err != nil {
			log.Println("Error when calling SayHello: %s", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		log.Println(response.Success)
		log.Println(response.User.Name)

		ctx.JSON(http.StatusOK, gin.H{"name" : response.User.Name})
	})

	router.GET("/ping", func(ctx *gin.Context) {
		
	})
	router.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080
}
