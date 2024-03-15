package auth

import (
	"time"
)

type User struct {
	//ユーザID
	UserID string `gorm:"primaryKey"`

	//プロバイダ
	Provider string

	//プロバイダのユーザID
	ProviderUserId string

	//名前
	Name string

	//ニックネーム
	NickName string

	//苗字
	LastName string

	//名
	FirstName string

	//アイコンURL
	AvatarURL string

	//メールアドレス
	Email string

	//説明
	Description string

	//有効期限
	ExpiresAt time.Time
}

func Register(user User) error {
	//DB接続
	dbconn, err := GetDB()

	//エラー処理
	if err != nil {
		return err
	}

	//ユーザ登録
	result := dbconn.Create(&user)

	//エラー処理
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func UpdateUSer(user User) error {
	//DB接続
	dbconn, err := GetDB()

	//エラー処理
	if err != nil {
		return err
	}

	//ユーザ登録
	result := dbconn.Save(&user)

	//エラー処理
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func GetUserInfo(userid string) (User, error) {
	//DB接続
	dbconn, err := GetDB()

	//エラー処理
	if err != nil {
		return User{}, err
	}

	get_data := &User{}
	//ユーザ検索
	result := dbconn.Where(&User{
		UserID: userid,
	}).First(get_data)

	//エラー処理
	if result.Error != nil {
		return User{}, result.Error
	}

	return *get_data, nil

}
