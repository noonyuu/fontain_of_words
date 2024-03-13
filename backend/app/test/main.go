package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"golang.org/x/exp/utf8string"
	"google.golang.org/api/option"

	"github.com/joho/godotenv"

	"github.com/ikawaha/kagome-dict/ipa"
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
	models = []*genai.GenerativeModel{}
)

func main() {
	//tokenizer
	tokennn, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		panic(err)
	}

	base_txt := `もちろんです。Golang、別名Goは、Googleによって開発されたプログラミング言語です。2009年に公開され、システムプログラミングに適した静的型付け言語として設計されました。その主な特徴は以下の通りです。
	Goは、シンプルで読みやすい文法を持っており、C言語のような伝統的な構文に基づいていますが、冗長な要素を取り除いています。
	Goはゴルーチンと呼ばれる軽量スレッドを使用し、チャネルを介して通信することで、並行処理を容易にします。
	Goはコンパイル速度が非常に速いことで知られており、大規模なプロジェクトでも迅速なビルドが可能です。
	自動メモリ管理を提供し、開発者がメモリリークを心配することなくコードを書くことができます。
	Goには豊富な標準ライブラリがあり、ネットワーキング、暗号化、文字列処理など、多くの標準的な機能を提供しています。
	Goは静的型付け言語であり、型安全性が保証されているため、実行時エラーよりもコンパイル時に多くのエラーを検出することができます。
	Goのプログラムは、さまざまなオペレーティングシステムやアーキテクチャでコンパイルして実行することができます。
	Goにはフォーマットツール（gofmt）、ドキュメントツール（godoc）、パッケージ管理（go get）など、効率的な開発をサポートするツールが含まれています。
	Goは、特にネットワークサーバー、データベース、分散システム、クラウドサービスなどの分野で好んで使用されています。その効率性とシンプルさから、多くの企業やオープンソースプロジェクトで採用されています。`
	base_txt = strings.TrimRight(base_txt, "\n")
	tokens := tokennn.Tokenize(base_txt)

	base_u8_str := utf8string.NewString(base_txt)

	result_txt := ""
	start_pos := 0
	is_first := true

	for _, token := range tokens {
		features := token.Features()
		if features[0] == "名詞" {
			//features_str := strings.Join(features, ",")
			u8_str := utf8string.NewString(token.Surface)

			add_str := ""
			if is_first {
				add_str += `||--`
				is_first = false
			}
			add_str += base_u8_str.Slice(token.Start, token.Start+u8_str.RuneCount())

			result_txt += base_u8_str.Slice(start_pos, token.Start) + add_str
			start_pos = token.End

			//log.Printf("%s\t%v\t%v\n", token.Surface, features_str, token.Start)
		} else {
			if !is_first {
				is_first = true
				result_txt += "--||"
			}
		}
	}

	result_txt += base_u8_str.Slice(start_pos, base_u8_str.RuneCount())

	wfile, err := os.Create("write.md")

	if err != nil {
		log.Fatal(err)
	}

	wfile.Write([]byte(result_txt))
	wfile.Close()

	_ = result_txt
}

func wao() {
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

	ctx := context.Context(context.Background())

	text := "アストンマーチン"

	for _, ai_model := range models {
		resp, err := ai_model.GenerateContent(ctx, genai.Text(text+"について短く説明してください。"))

		if err != nil {
			log.Fatal(err)
		}
		printResponse(resp)
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

func printResponse(resp *genai.GenerateContentResponse) {
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				fmt.Println(part)
			}
		}
	}
	fmt.Println("---")
}
