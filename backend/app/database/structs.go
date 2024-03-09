package database

import (
	"gorm.io/gorm"
)

// 単語帳テーブル
type WordBook struct {
	ID     string //単語帳ID
	Userid string //単語帳の所有者id
	Name   string //単語帳名

	Words  []WordData `gorm:"foreignkey:Wordid;references:ID"` //単語
}

type WordData struct {
	BookID string
	Wordid string
}

/*
func (data WordData) Value() (driver.Value, error) {
	bytes, err := json.Marshal(data)

	if err != nil {
		return nil, err
	}

	return bytes, nil
}

func (data WordData) Scan(input interface{}) error {
	switch v := input.(type) {
	case string:
		return json.Unmarshal([]byte(v), data)
	case []byte:
		return json.Unmarshal(v, data)
	default:
		return fmt.Errorf("unsupported type: %T", input)
	}
}
*/

// 単語テーブル
type Word struct {
	gorm.Model
	ID          string //単語ID
	Word        string //単語
	Description string //説明
}
