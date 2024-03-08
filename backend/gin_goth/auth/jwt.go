package auth

import (
	"strings"

	"github.com/golang-jwt/jwt/v5"

	"github.com/google/uuid"
)

var (
	Secret = []byte("hAUKO10XC6Ck8aUeu8LsEwFT5k5QatzXaVXTcVhJ7JCXVafVWkQ7ExyAADRCCF8t")
)


func genid() string {
	//ID生成
	uid := uuid.New()

	//ハイフンを削除
	returnid := strings.ReplaceAll(uid.String(), "-", "")

	return returnid
}

//トークンIDからBindid取得
func valid_token(tokenid string) (string,error) {
	//DB接続
	dbconn,err := GetDB()

	//エラー処理
	if err != nil {
		return "", err
	}

	get_data := &TokenData{}
	//トークン検証
	result := dbconn.Where(&TokenData{
		TokenId: tokenid,
	}).First(get_data)

	//エラー処理
	if result.Error != nil {
		return "", result.Error
	}

	return get_data.BindId, nil
}

//トークン登録
func register_token(bindid string, tokenid string) error {
	//DB接続
	dbconn,err := GetDB()

	//エラー処理
	if err != nil {
		return err
	}

	//トークン登録
	result := dbconn.Create(&TokenData{
		BindId: bindid,
		TokenId: tokenid,
	})

	//エラー処理
	if result.Error != nil {
		return result.Error
	}

	return nil
}

//トークン削除
func delete_token(tokenid string) error {
	//DB接続
	dbconn,err := GetDB()

	//エラー処理
	if err != nil {
		return err
	}

	//トークン削除
	result := dbconn.Where(&TokenData{
		TokenId: tokenid,
	}).Delete(&TokenData{})

	//エラー処理
	if result.Error != nil {
		return result.Error
	}

	return nil
}

//トークンid取得
func get_tokenid(bindid string) (string,error) {
	//DB接続
	dbconn,err := GetDB()

	//エラー処理
	if err != nil {
		return "",err
	}

	result_data := &TokenData{}
	//トークン削除
	result := dbconn.Where(&TokenData{
		BindId: bindid,
	}).First(result_data)

	//エラー処理
	if result.Error != nil {
		return "",result.Error
	}

	return result_data.TokenId, nil
}

//IDに関連したトークン生成
func GenToken(BindId string) (string, error) {
	//IDからトークン取得
	already_tokenid,err := get_tokenid(BindId)

	//IDに関連するトークンがあれば、トークンを無効にする
	if err == nil {
		//トークン無効か
		err = delete_token(already_tokenid)

		//エラー処理
		if err != nil {
			return "", err
		}
	}

	//トークンのID生成
	tokenid := genid()

	//トークンデータ
	token_claims := jwt.MapClaims{
		"tokenid" : tokenid,
	}

	//トークン生成
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, token_claims)

	//署名
	signed_str,err := token.SignedString(Secret)

	//エラー処理
	if err != nil {
		return "", err
	}

	//トークン登録
	err = register_token(BindId, tokenid)

	//エラー処理
	if err != nil {
		return "", err
	}

	return signed_str, nil
}

//トークン検証 (有効ならbindidを返す)
func ParseToken(tokenString string) (string,error) {
	//トークン検証
	token, err := jwt.Parse(tokenString,func(token *jwt.Token) (interface{}, error) {
		//トークンの署名方法を確認
		if _,ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		//検証できてたら、秘密鍵を返す
		return Secret, nil
	})

	//エラー処理
	if err != nil {
		return "", err
	}

	//クライム取得
	if claims,ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//トークンが有効か検証
		bindid,err := valid_token(claims["tokenid"].(string))

		//エラー処理
		if err != nil {
			return "", err
		}

		return bindid, nil
	}

	return "", err
}

//トークン無効化 
func DisableToken(tokenString string) (error) {
	//トークン検証
	token, err := jwt.Parse(tokenString,func(token *jwt.Token) (interface{}, error) {
		//トークンの署名方法を確認
		if _,ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		//検証できてたら、秘密鍵を返す
		return Secret, nil
	})

	//エラー処理
	if err != nil {
		return err
	}

	//クライム取得
	if claims,ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//トークンが有効か検証
		bindid,err := valid_token(claims["tokenid"].(string))

		//エラー処理
		if err != nil {
			return err
		}

		_ = bindid

		//トークン無効化
		err = delete_token(claims["tokenid"].(string))

		//エラー処理
		if err != nil {
			return err
		}

		return nil
	}

	return err
}