package main

import (
	"gin_app/auth_grpc"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	log.Print("main start")

	// 9000番ポートでクライアントからのリクエストを受け付けるようにする
	listen, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()

	// Sample構造体のアドレスを渡すことで、クライアントからGetDataリクエストされると
	// GetDataメソッドが呼ばれるようになる
	auth_grpc.RegisterAuthServerServer(grpcServer, &Auth{})

	// 以下でリッスンし続ける
	if err := grpcServer.Serve(listen); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}

	log.Print("main end")
}

type Auth struct {
	name string
}

func (auth *Auth) Auth(
	ctx context.Context,
	token *auth_grpc.AuthToken,
) (*auth_grpc.AuthResult, error) {
	return &auth_grpc.AuthResult{Success: true}, nil
}

func (auth *Auth) Refresh(
	ctx context.Context,
	token *auth_grpc.AuthToken,
) (*auth_grpc.RefreshResult, error) {
	return &auth_grpc.RefreshResult{Success: true}, nil
}

