package database

import (
	"errors"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	//データベースパス
	DBPATH = "./data.db"

	//初期化されているか
	isinit = false

	//データベース
	dbconn *gorm.DB
)

func Init() error {
	//データベースに接続する
	db, err := gorm.Open(sqlite.Open(DBPATH), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	err = db.AutoMigrate(&Word{})

	//エラー処理
	if err != nil {
		return err
	}

	err = db.AutoMigrate(&WordBook{})

	//エラー処理
	if err != nil {
		return err
	}

	//グローバル変数に格納
	dbconn = db

	//初期化済みにする
	isinit = true

	return nil
}

func GetDB() (*gorm.DB,error) {
	//初期化されていなかったら
	if (!isinit) {
		//初期化されていないエラーを返す
		return nil, errors.New("database is not initialized")
	}
	return dbconn,nil
}
