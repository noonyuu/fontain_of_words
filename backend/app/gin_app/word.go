package main

import (
	"github.com/google/uuid"
	"gorm.io/gorm"

	"gin_app/database"

	"log"
)

func GenID() (string, error) {
	//ランダムなIDを生成
	uid, err := uuid.NewRandom()

	//エラー処理
	if err != nil {
		log.Println(err)
		return "", err
	}

	//IDを返す
	return uid.String(), nil
}

// 単語帳を作成する関数 (単語帳IDとエラー内容を返す)
func CreateWordBook(userid string, name string) (string, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		return "", err
	}

	//単語帳IDを生成
	bookid, err := GenID()

	//エラー処理
	if err != nil {
		log.Println(err)
		return "", err
	}

	//単語帳を作成
	wordbook := database.WordBook{
		ID:     bookid,
		Userid: userid,
		Name:   name,
		Words:  []database.WordData{},
	}

	//単語帳を作成
	result := dbconn.Create(&wordbook)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return "", result.Error
	}

	return bookid, nil
}

// 単語帳を取得する
func GetWordBook(userid string, bookid string) (database.WordBook, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return database.WordBook{}, err
	}

	//単語帳を取得
	var wordbook database.WordBook

	//単語帳を取得
	result := dbconn.Where("userid = ? AND id = ?", userid, bookid).First(&wordbook)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return database.WordBook{}, result.Error
	}

	return wordbook, nil
}


// 単語帳を取得する (単語ロード済み)
func GetWordBook_Preload(userid string, bookid string) (database.WordBook, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return database.WordBook{}, err
	}

	//単語帳を取得
	var wordbook database.WordBook

	//単語帳を取得
	result := dbconn.Where("userid = ? AND id = ?", userid, bookid).Preload("Words").First(&wordbook)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return database.WordBook{}, result.Error
	}

	return wordbook, nil
}

//単語帳に登録されているかを返す
func check_registerd(userid string,bookid string,wordid string) (bool,error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return false, err
	}

	//単語帳を取得
	wordbook,err := GetWordBook(userid,bookid)

	//エラー処理
	if err != nil {
		log.Println(err)
		return false, err
	}

	//検索
	count := dbconn.Model(&wordbook).Where(database.WordData{
		Wordid: wordid,
		BookID: bookid,
	}).Association("Words").Count()

	if (count >= 1) {
		return true,nil
	}

	return false,nil
}

// 単語帳に単語を登録する
func RegisterWord(userid string, bookid string, word database.Word) error {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//単語帳を取得
	wordbook, err := GetWordBook(userid, bookid)

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//登録されているか
	is_registered,err := check_registerd(userid,bookid,word.ID)

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//登録されているとき
	if is_registered {
		log.Println("already registered")
		//戻る
		return nil
	}

	//登録データ
	register_data := database.WordData{
		BookID: bookid,
		Wordid: word.ID,
	}

	//追加
	err = dbconn.Model(&wordbook).Association("Words").Append(&register_data)

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}
	
	return nil
}

//単語帳から単語を削除する
func UnregisterWord(userid string, bookid string, wordid string) error {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//単語帳を取得
	wordbook, err := GetWordBook(userid, bookid)

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//登録されているか
	is_registered,err := check_registerd(userid,bookid,wordid)

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//登録されていないとき
	if !is_registered {
		log.Println("not registered")
		//戻る
		return nil
	}

	//削除
	err = dbconn.Model(&wordbook).Association("Words").Delete(&database.WordData{
		BookID: bookid,
		Wordid: wordid,
	})

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

// 単語を生成 (存在する場合は既存のものをとってくる)
func GenerateWord(word database.Word) (database.Word, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return database.Word{}, err
	}

	//単語を取得
	word_data, err := GetWord(word.Word)

	//エラー処理
	if err == gorm.ErrRecordNotFound {
		//存在しない時
		log.Println("新規作成")

		//新規作成する
		result := dbconn.Create(&word)

		//エラー処理
		if result.Error != nil {
			log.Println(result.Error)
			return database.Word{}, result.Error
		}

		//単語を取得
		word_data, err = GetWord(word.Word)

		//エラー処理
		if err != nil {
			log.Println(err)
			return database.Word{}, err
		}

	} else if err != nil {
		//それ以外の時
		log.Println(err)
		return database.Word{}, err
	}

	//エラーなく取得したとき
	return word_data, nil
}

// 文字列から単語を取得する (ない場合はnilを返す)
func GetWord(word_str string) (database.Word, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return database.Word{}, err
	}

	//単語を取得
	var word database.Word

	//単語を取得
	result := dbconn.Where(database.Word{
		Word: word_str,
	}).First(&word)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return database.Word{}, result.Error
	}

	return word, nil
}

//単語IDから単語を取得する
func GetWord_Byid(wordid string) (database.Word, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return database.Word{}, err
	}

	//単語を取得
	var word database.Word

	//単語を取得
	result := dbconn.Where(database.Word{
		ID: wordid,
	}).First(&word)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return database.Word{}, result.Error
	}

	return word, nil
}

// ユーザーIDから単語帳を取得する
func GetWordBooksByUserID(userid string) ([]database.WordBook, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return []database.WordBook{}, err
	}

	//単語帳を取得
	var wordbooks []database.WordBook

	//単語帳を取得
	result := dbconn.Where(database.WordBook{
		Userid: userid,
	}).Preload("Words").Find(&wordbooks)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return []database.WordBook{}, result.Error
	}

	return wordbooks, nil
}



func DeleteWordBook(userid string, bookid string) error {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return err
	}

	//単語帳を削除
	result := dbconn.Where(database.WordBook{
		Userid: userid,
		ID:     bookid,
	}).Delete(&database.WordBook{})

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return result.Error
	}

	return nil
}