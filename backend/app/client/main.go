package main

import (
	"gin_app/auth_grpc"
	"log"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

func main() {
	var conn *grpc.ClientConn
	conn, err := grpc.Dial(":9000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	c := auth_grpc.NewAuthServerClient(conn)

	response, err := c.Auth(context.Background(), &auth_grpc.AuthToken{Token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiZGU0NTA5NDIxNWQyNDUzZWEwZWU5ZDQzZDAzZjAxZTMifQ.bFp3ph_2BpRcZvLKVAO1FP_hjRHullt7XrQ4huhE3rWN-gLyNedpVsXaW6WTqRhQzsXmOhiu8HMa0D_69Ixd9g"})
	if err != nil {
		log.Fatalf("Error when calling SayHello: %s", err)
	}

	log.Println(response.Success)
	log.Println(response.User)

	defer conn.Close()
}
