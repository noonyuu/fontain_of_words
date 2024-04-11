package auth

import (
	"log"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"

	"github.com/google/uuid"
)

var (
	Secret = []byte("hAUKO10XC6Ck8aUeu8LsEwFT5k5QatzXaVXTcVhJ7JCXVafVWkQ7ExyAADRCCF8t")
)
 
func jwt_init() error {
	//古いトークンを削除する
	go Cleanup_OldToken(time.Duration(time.Second * 1))
	return nil
}

func get_exptime() time.Time {
	//現在時刻
	now_time := time.Now()

	//トークン有効期限
	after_time := now_time.AddDate(0,1,0)

	return after_time
}

//古いトークンを削除する
func Cleanup_OldToken(duration time.Duration) {
	for {
		now_time := time.Now()
		//有効期限が切れたトークンを削除する
		result := dbconn.Where("exptime <= ?",now_time).Delete(TokenData{})

		log.Println(result.RowsAffected)

		//指定した期間まつ
		time.Sleep(duration)
	}
}

//トークンを更新する
func UpdateToken(tokenid string,UserAgent string) (string,error) {
	//トークンから関連ID取得
	bindid,err := Valid_token(tokenid)

	//エラー処理
	if err != nil {
		log.Println(err)

		return "",err
	}

	//新しいトークンを発行する
	new_token,err := GenToken(bindid,UserAgent)

	//エラー処理
	if err != nil {
		log.Println(err)
		return "",err
	}

	//既存のトークン無効化
	err = delete_token(tokenid)

	//エラー処理
	if err != nil {
		log.Println(err)
		return "",err
	}

	//トークンを返す
	return new_token, nil
}

func genid() string {
	//ID生成
	uid := uuid.New()

	//ハイフンを削除
	returnid := strings.ReplaceAll(uid.String(), "-", "")

	return returnid
}

//トークンIDからBindid取得
func Valid_token(tokenid string) (string,error) {
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
func register_token(bindid string, tokenid string,exptime time.Time,UserAgent string) error {
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
		Exptime: exptime,
		UserAgent: UserAgent,
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


//IDに関連したトークン生成
func GenToken(BindId string,UserAgent string) (string, error) {
	/*
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
	*/

	//トークンのID生成
	tokenid := genid()

	//有効期限取得
	after_time := get_exptime()

	//トークンデータ
	token_claims := jwt.MapClaims{
		"tokenid" : tokenid,
		"exp" : after_time.Unix(),
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
	err = register_token(BindId, tokenid,after_time,UserAgent)

	//エラー処理
	if err != nil {
		return "", err
	}

	return signed_str, nil
}

//トークン検証 (有効ならbindidとtokenidを返す)
func ParseToken(tokenString string) (TokenData,error) {
	//返すデータ
	return_data := TokenData{}

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
		return return_data, err
	}

	//クライム取得
	if claims,ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//トークンが有効か検証
		_,err := Valid_token(claims["tokenid"].(string))

		//エラー処理
		if err != nil {
			return return_data, err
		}

		//dbからトークン取得
		result := dbconn.Where(&TokenData{
			TokenId: claims["tokenid"].(string),
		}).First(&return_data)

		//エラー処理
		if result.Error != nil {
			//エラー表示
			return TokenData{}, result.Error
		}

		return return_data, nil
	}

	return return_data, err
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
		bindid,err := Valid_token(claims["tokenid"].(string))

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

//セッションデータ
type SessionData struct {
	SessionID string
	Exptime int64
	UserAgent string
}

//IDに発行されたトークンを取得
func GetTokens(bindid string) ([]SessionData,error) {
	//DB接続
	dbconn,err := GetDB()

	//エラー処理
	if err != nil {
		return nil,err
	}

	//結果
	tokens_id := []TokenData{}

	//トークン取得
	result := dbconn.Where(TokenData{BindId: bindid}).Find(&tokens_id)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return nil, result.Error
	}

	//トークン一覧
	toknes := []SessionData{}

	//回す
	for token_data := range tokens_id {
		//トークンIDを追加
		toknes = append(toknes, SessionData{
			SessionID : tokens_id[token_data].TokenId,
			Exptime : tokens_id[token_data].Exptime.Unix(),
			UserAgent : tokens_id[token_data].UserAgent,
		})
	}

	return toknes, nil
}