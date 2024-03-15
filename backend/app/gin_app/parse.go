package main

import (
	"log"
	"strings"

	"github.com/ikawaha/kagome-dict/ipa"
	"github.com/ikawaha/kagome/v2/tokenizer"

	"golang.org/x/exp/utf8string"
)

var (
	parser *tokenizer.Tokenizer = nil
)

func parser_init() {
	tokennn, err := tokenizer.New(ipa.Dict(), tokenizer.OmitBosEos())
	if err != nil {
		panic(err)
	}

	parser = tokennn
}

func parse_sentence(base_txt string) string {
	base_txt = strings.TrimRight(base_txt, "\n")
	tokens := parser.Tokenize(base_txt)

	base_u8_str := utf8string.NewString(base_txt)

	result_txt := ""
	start_pos := 0
	is_first := true

	for _, token := range tokens {
		features := token.Features()

		log.Println(token.Surface)
		log.Println(features)
		add_str := false
		if (features[0] == "名詞" && features[1] != "非自立" &&
			features[1] != "代名詞") || features[0] == "空白" ||
			(features[0] == "接頭詞" && features[1] == "名詞接続") {

			add_str = true

			if token.Surface == ":" {
				add_str = false
			}

			if add_str {
				//features_str := strings.Join(features, ",")
				u8_str := utf8string.NewString(token.Surface)

				add_str := ""
				if is_first {
					add_str += `||--`
					//add_str += `<span style="color: red; ">`
					is_first = false
				}

				add_str += base_u8_str.Slice(token.Start, token.Start+u8_str.RuneCount())

				result_txt += base_u8_str.Slice(start_pos, token.Start) + add_str
				start_pos = token.End
			}

			//log.Printf("%s\t%v\t%v\n", token.Surface, features_str, token.Start)
		} else {
			if !is_first {
				is_first = true
				result_txt += "--||"
				//result_txt += "</span>"
			}
		}

		if !is_first {
			is_first = true
			result_txt += "--||"
			//result_txt += "</span>"
		}
	}

	result_txt += base_u8_str.Slice(start_pos, base_u8_str.RuneCount())

	return result_txt
}
