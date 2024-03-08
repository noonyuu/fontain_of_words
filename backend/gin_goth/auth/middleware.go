package auth

import (
	"github.com/gin-gonic/gin"
)

func Middleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		//認証済みではなくす
		ctx.Set("authed",false)
		//エラーかセットする
		ctx.Set("iserror",false)
		//空のユーザをセット
		ctx.Set("user", nil)
		//トークン設定
		ctx.Set("token", "")

		//トークン取得
		token,err := ctx.Cookie("token")

		//ない場合
		if err != nil {
			//処理終了
			ctx.Next()
			return
		}

		//トークン検証
		token_data, err := ParseToken(token)

		//エラー処理
		if err != nil {
			//処理終了
			ctx.Next()
			return
		}

		//ユーザ検索
		user_data, err := GetUserInfo(token_data.BindId)

		//エラー処理
		if err != nil {
			//エラーにする
			ctx.Set("iserror",true)
			//処理終了
			ctx.Next()
			return
		}

		//認証済み
		ctx.Set("authed",true)
		//ユーザセット
		ctx.Set("user", user_data)

		//トークン設定
		ctx.Set("token", token)

		//処理終了
		ctx.Next()
	}
}
