package main

import (
	"container/list"
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
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

	go func() {
		for {
			// Dequeue
			front := queue.Front()

			//キューから取得
			if front == nil {
				time.Sleep(time.Millisecond * 500)
				continue
			}

			// This frees up memory and prevents memory leaks.
			queue.Remove(front)

			// キューから取得
			question_data := front.Value.(Question)

			//偽物の場合戻る
			if (question_data.isfake) {
				time.Sleep(time.Millisecond * 500)
				continue
			}

			go func() {
				//ID取得
				question_id := question_data.id

				//AIに聞く
				CallAI(question_id, question_data.text)
			}()

			// Sleep
			time.Sleep(time.Millisecond * 500)
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
		id:   id,
		text: text,
		isfake: false,
	})
}

// AIに聞く
func CallAI(id string, text string) (string, error) {
	//AI生成
	ai_txt, err := QueAi(text)

	if err != nil {
		log.Println(err)
		return "", nil
	}

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
