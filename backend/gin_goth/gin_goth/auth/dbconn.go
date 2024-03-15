package auth

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type TokenData struct {
	TokenId string	`gorm:"primaryKey"`
	BindId  string 
	Exptime time.Time
	UserAgent string
}

var (
	//データベース接続
	dbconn *gorm.DB

	//初期化されているか
	initialized = false
)

func Init() error {
	//DBを開く
	db_conn, err := gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	//マイグレーション
	db_conn.AutoMigrate(&TokenData{})

	//ユーザテーブル作成
	db_conn.AutoMigrate(&User{})

	//グローバル変数に保存
	dbconn = db_conn

	//JWt初期化
	err = jwt_init()

	//エラー処理
	if err != nil {
		return err
	}

	//初期化完了
	initialized = true

	return nil
}

func GetDB() (*gorm.DB, error) {
	//初期化されていなかったら初期化する
	if !initialized {
		err := Init()

		//エラー処理
		if err != nil {
			return nil, err
		}
	}
	return dbconn, nil
}
