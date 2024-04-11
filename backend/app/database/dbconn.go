package database

import (
	"errors"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"

	"os"
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
	debug_mode := os.Getenv("DEBUG_MODE")

	var db *gorm.DB
	var err error
	//デバッグモード
	if debug_mode == "true" {
		dbconn,err = gorm.Open(sqlite.Open(DBPATH))

		//エラー処理
		if err != nil {
			return err
		}

	} else {
		uname := os.Getenv("POSTGRES_USER")
		dbname := os.Getenv("POSTGRES_DB")
		password := os.Getenv("POSTGRES_PASSWORD")
		host := os.Getenv("POSTGRES_HOST")
		port := os.Getenv("POSTGRES_PORT")

		dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",host,uname,password,dbname,port)
		dbconn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		//エラー処理
		if err != nil {
			return err
		}
	}

	db = dbconn

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

	err = db.AutoMigrate(&WordData{})

	//エラー処理
	if err != nil {
		return err
	}

	//初期化済みにする
	isinit = true

	return nil
}

func GetDB() (*gorm.DB, error) {
	//初期化されていなかったら
	if !isinit {
		//初期化されていないエラーを返す
		return nil, errors.New("database is not initialized")
	}
	return dbconn, nil
}
