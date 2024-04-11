package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"

	"github.com/joho/godotenv"

	"github.com/ikawaha/kagome/v2/tokenizer"
)

// .envを呼び出します。
func loadEnv() {
	// ここで.envファイル全体を読み込みます。
	// この読み込み処理がないと、個々の環境変数が取得出来ません。
	// 読み込めなかったら err にエラーが入ります。
	err := godotenv.Load(".env")

	// もし err がnilではないなら、"読み込み出来ませんでした"が出力されます。
	if err != nil {
		log.Panicln("読み込み出来ませんでした: %v", err)
	}
}

var (
	models                         = []*genai.GenerativeModel{}
	parser    *tokenizer.Tokenizer = nil
	now_count                      = 0
)

func main() {
	loadEnv()
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

	text := "アストンマーチン"

	QueAi(text)
	QueAi(text)
	QueAi(text)
	QueAi(text)
}

func QueAi(text string) {
	log.Println(now_count)

	ctx := context.Context(context.Background())

	ai_model := models[now_count]

	resp, err := ai_model.GenerateContent(ctx, genai.Text(text+"について短く説明してください。"))

	if err != nil {
		log.Fatal(err)
	}

	log.Println(Get_text(resp))

	now_count++

	if now_count == len(models) {
		now_count = 0
	}
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
