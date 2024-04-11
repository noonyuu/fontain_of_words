package main

import (
	"container/list"
	"context"
	"fmt"
	"gin_app/database"
	"log"
	"os"
	"time"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"

	"strings"
)

var (
	models    = []*genai.GenerativeModel{}
	now_count = 0
	queue     = list.New()
)

type Question struct {
	id     string
	text   string
	isfake bool
}

func Gemini_Init() {
	model, err := GenAI(os.Getenv("API_KEY1"))

	if err != nil {
		log.Fatal(err)
	}

	models = append(models, model)

	model, err = GenAI(os.Getenv("API_KEY2"))

	if err != nil {
		log.Fatal(err)
	}

	models = append(models, model)

	model, err = GenAI(os.Getenv("API_KEY3"))

	if err != nil {
		log.Fatal(err)
	}

	models = append(models, model)

	milli_time := time.Millisecond * 1000

	go func() {
		for {
			// Dequeue
			front := queue.Front()

			//キューから取得
			if front == nil {
				time.Sleep(milli_time)
				continue
			}

			// This frees up memory and prevents memory leaks.
			queue.Remove(front)

			// キューから取得
			question_data := front.Value.(Question)

			//偽物の場合戻る
			if question_data.isfake {
				time.Sleep(milli_time)
				continue
			}

			go func() {
				//ID取得
				question_id := question_data.id

				//AIに聞く
				CallAI(question_id, question_data.text)
			}()

			// Sleep
			time.Sleep(milli_time)
		}
	}()
}

func QueAi(text string) (string, error) {
	ctx := context.Context(context.Background())

	//モデル取得
	ai_model := models[now_count]

	//生成
	resp, err := ai_model.GenerateContent(ctx, genai.Text(text+"について短く説明してください。"))

	//エラーチェック
	if err != nil {
		log.Println(err)
		return "", err
	}

	//現在のカウント
	now_count++

	//カウントがマックスまで行ったとき戻す
	if now_count == len(models) {
		now_count = 0
	}

	return Get_text(resp), nil
}

func GenAI(API_KEY string) (*genai.GenerativeModel, error) {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(API_KEY))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	model := client.GenerativeModel("gemini-1.0-pro")
	return model, nil
}

func Get_text(resp *genai.GenerateContentResponse) string {
	result_txt := ""
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				result_txt += fmt.Sprint(part)
			}
		}
	}

	return result_txt
}

func PushText(id string, text string) {
	queue.PushBack(Question{
		id:     id,
		text:   text,
		isfake: false,
	})
}

// AIに聞く
func CallAI(id string, text string) (string, error) {
	//データベース接続を取得する
	dbconn, err := database.GetDB()

	//エラー処理
	if err != nil {
		log.Println(err)
		return "", nil
	}

	//単語取得
	word_data, err := GetWord_Byid(id)

	if err != nil {
		log.Println(err)
		return "", nil
	}

	//検索中にする
	word_data.IsSearching = true

	//更新
	result := dbconn.Save(&word_data)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return "", nil
	}

	//AI生成
	ai_txt, err := QueAi(text)

	if err != nil {
		log.Println(err)
		return "", nil
	}

	//検索中解除
	word_data.IsSearching = false

	//更新
	result = dbconn.Save(&word_data)

	//エラー処理
	if result.Error != nil {
		log.Println(result.Error)
		return "", nil
	}

	ai_txt = strings.Replace(ai_txt, "*", "", -1)

	//単語更新
	err = UpdateWord(id, ai_txt)

	if err != nil {
		log.Println(err)
		return "", nil
	}

	return ai_txt, nil
}

func Count_Que() int {
	return queue.Len()
}
