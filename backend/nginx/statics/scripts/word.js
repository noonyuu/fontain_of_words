const create_word_button = document.getElementById("create_word_button");

create_word_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    try {
        //ログアウト
        const req = await fetch(base_path + "app/wordbook/create", {
            method: "POST",
            body: JSON.stringify({
                "Name": "hello world"
            })
        });

        //200の時
        if (req.status == 200) {
            console.log(await req.json())
        }

    } catch (ex) {
        //エラー
        console.log(ex);
        return false
    }
})

let check_books = {};
const get_word_books = document.getElementById("get_word_books");
const word_book_div = document.getElementById("word_book_div");
const input_word = document.getElementById("input_word");

get_word_books.addEventListener("click", async (evt) => {
    evt.preventDefault();

    try {
        while (word_book_div.firstChild) {
            word_book_div.removeChild(word_book_div.firstChild);
        }

        check_books = {};

        //一覧取得
        const req = await fetch(base_path + "app/wordbook/get_books", {
            method: "GET",
        });

        //200の時
        if (req.status == 200) {
            //データ
            const res_data = await req.json();

            for (const book of res_data["books"]) {
                //単語帳を作成
                word_book_div.insertAdjacentHTML("beforeend", `
                    <div style="margin: 20px;" id="${book["Id"]}_div">
                        <label for="${book["Id"]}">${book["Name"]}</label>
                        <input type="checkbox" id="${book["Id"]}">
                    </div>
                `)

                const check = document.getElementById(`${book["Id"]}`);
                check_books[`${book["Id"]}`] = check;
            }
        }
    } catch (ex) {
        //エラー
        console.log(ex);
    }
})

async function RegisterWord(id,word) {
    try {
        //リクエスト送信
        const req = await fetch(base_path + "app/wordbook/register", {
            method: "POST",
            body: JSON.stringify({
                "bookid" : id,
                "word" : word
            })
        })

        //200の時
        if (req.status == 200) {
            console.log(await req.json());
            return true
        }
    } catch (ex) {
        //エラー
        console.log(ex);
    }

    return false
}

const register_word_btn = document.getElementById("register_word");

register_word_btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    for (const bookid of Get_Checked()) {
        console.log(bookid);
        await RegisterWord(bookid, input_word.value);
    }
})

const delete_word_books = document.getElementById("delete_word_books");

delete_word_books.addEventListener("click", async (evt) => {
    evt.preventDefault();

    try {
        for (const bookid of Get_Checked()) {
            await delete_word_book(bookid);
        }
    } catch (ex) {
        //エラー
        console.log(ex);
    }
})

async function delete_word_book(bookid) {
    try {
        //単語帳削除
        const req = await fetch(base_path + "app/wordbook/delete", {
            method: "POST",
            body: JSON.stringify({
                "Id": bookid,
                "Name": ""
            })
        });

        //200の時
        if (req.status == 200) {
            console.log(await req.json())
        }
    } catch (ex) {
        //エラー
        console.log(ex);
    }
}

function* Get_Checked() {
    for (const bookid of Object.keys(check_books)) {
        if (check_books[bookid].checked) {
            yield bookid;
        }
    }
    return null;
}