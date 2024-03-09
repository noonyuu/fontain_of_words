package database

import (
	"gorm.io/gorm"
)

// 単語帳テーブル
type WordBook struct {
	gorm.Model
	ID     string //単語帳ID
	Userid string //単語帳の所有者id
	Name   string //単語帳名

	Words_Map map[string]Word //単語
}

// 単語テーブル
type Word struct {
	gorm.Model
	ID          string //単語ID
	Word        string //単語
	Description string //説明
}
