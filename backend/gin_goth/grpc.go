package main

import (
	"gin_oauth/auth_grpc"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"log"
	"net"

	"gin_oauth/auth"
)

func start_grpc() {
	log.Println("Start grpc server")

	// 9000番ポートでクライアントからのリクエストを受け付けるようにする
	listen, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	//GRPCサーバ
	grpcServer := grpc.NewServer()

	// Auth構造体のアドレスを渡すことで、クライアントからGetDataリクエストされると
	// GetDataメソッドが呼ばれるようになる
	auth_grpc.RegisterAuthServerServer(grpcServer, &Auth{})

	// 以下でリッスンし続ける
	if err := grpcServer.Serve(listen); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}

	log.Print("grpc end")
}

// Auth構造体
type Auth struct{}

// トークンで認証
func (auther *Auth) Auth(
	ctx context.Context,
	token *auth_grpc.AuthToken,
) (*auth_grpc.AuthResult, error) {
	//トークン検証
	uid, err := auth.ParseToken(token.Token)
	if err != nil {
		//失敗した場合エラー返す
		return &auth_grpc.AuthResult{Success: false}, err
	}

	//ユーザ取得
	user, err := auth.GetUserInfo(uid)
	if err != nil {
		//失敗した場合エラー返す
		return &auth_grpc.AuthResult{Success: false}, err
	}

	//認証結果
	result := auth_grpc.AuthResult{
		Success: true,
		User: &auth_grpc.User{
			UserID:         user.UserID,         //ユーザID
			Name:           user.Name,           //ユーザ名
			Provider:       user.Provider,       //認証プロバイダー
			ProviderUserId: user.ProviderUserId, //認証プロバイダーのユーザID
			NickName:       user.NickName,       //ニックネーム
			LastName:       user.LastName,       //姓
			FirstName:      user.FirstName,      //名
			AvatarURL:      user.AvatarURL,      //アバターURL
			Email:          user.Email,          //メールアドレス
			Description:    user.Description,    //説明文
		},
	}

	//成功した場合、認証結果を返す
	return &result, nil
}
