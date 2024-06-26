// const create_word_button = document.getElementById("create_word_button");

// create_word_button.addEventListener("click", async (evt) => {
//     evt.preventDefault();

//     try {
//         //ログアウト
//         const req = await fetch(base_path + "app/wordbook/create", {
//             method: "POST",
//             body: JSON.stringify({
//                 Name: "hello world",
//             }),
//         });

//         //200の時
//         if (req.status == 200) {
//             console.log(await req.json());
//         }
//     } catch (ex) {
//         //エラー
//         console.log(ex);
//         return false;
//     }
// });

// let check_books = {};
// const get_word_books = document.getElementById("get_word_books");
// const word_book_div = document.getElementById("word_book_div");
// const input_word = document.getElementById("input_word");

// get_word_books.addEventListener("click", async (evt) => {
//     evt.preventDefault();

//     try {
//         while (word_book_div.firstChild) {
//             word_book_div.removeChild(word_book_div.firstChild);
//         }

//         check_books = {};

//         //一覧取得
//         const req = await fetch(base_path + "app/wordbook/get_books", {
//             method: "GET",
//         });

//         //200の時
//         if (req.status == 200) {
//             //データ
//             const res_data = await req.json();

//             for (const book of res_data["books"]) {
//                 //単語帳を作成
//                 word_book_div.insertAdjacentHTML(
//                     "beforeend",
//                     `
//                     <div style="margin: 20px;" id="${book["Id"]}_div">
//                         <label for="${book["Id"]}">${book["Name"]}</label>
//                         <input type="checkbox" id="${book["Id"]}">
//                     </div>
//                 `
//                 );

//                 const check = document.getElementById(`${book["Id"]}`);
//                 check_books[`${book["Id"]}`] = check;
//             }
//         }
//     } catch (ex) {
//         //エラー
//         console.log(ex);
//     }
// });

// const register_word_btn = document.getElementById("register_word");

// register_word_btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();

//     for (const bookid of Get_Checked()) {
//         console.log(bookid);
//         await RegisterWord(bookid, input_word.value);
//     }
// });

// const delete_word_books = document.getElementById("delete_word_books");

// delete_word_books.addEventListener("click", async (evt) => {
//     evt.preventDefault();

//     try {
//         for (const bookid of Get_Checked()) {
//             await delete_word_book(bookid);
//         }
//     } catch (ex) {
//         //エラー
//         console.log(ex);
//     }
// });

// //
// function* Get_Checked() {
//     for (const bookid of Object.keys(check_books)) {
//         if (check_books[bookid].checked) {
//             yield bookid;
//         }
//     }
//     return null;
// }

const base_path = "https://fountain-of-words.noonyuu.com/";
// const base_path = "https://fountain-of-words.noonyuu.com/";

export const Create_word_book = async function create_word_book(name) {
  try {
    //ログアウト
    const req = await fetch(base_path + "app/wordbook/create", {
      method: "POST",
      body: JSON.stringify({
        Name: name,
      }),
    });

    //200の時
    if (req.status == 200) {
      const res = await req.json();
      return res["bookid"];
    }
  } catch (ex) {
    //エラー
    console.log(ex);
    return false;
  }
  return false;
};

export const create_book = async function create_book(name) {
    try {
        //単語帳作成
        const req = await fetch(base_path + "app/wordbook/create", {
            method: "POST",
            body: JSON.stringify({
                Name: name,
            }),
        });

        //200の時
        if (req.status == 200) {
            console.log(await req.json());
            return true;
        }
    } catch (ex) {
        //エラー
        console.log(ex);
        return false;
    }
}

//単語帳を削除する (成功したらtrueを返す)
export const Delete_word_book = async function delete_word_book(bookid) {
  try {
    //単語帳削除
    const req = await fetch(base_path + "app/wordbook/delete", {
      method: "POST",
      body: JSON.stringify({
        Id: bookid,
        Name: "",
      }),
    });

    //200の時
    if (req.status == 200) {
      console.log(await req.json());
      return true;
    }
  } catch (ex) {
    //エラー
    console.log(ex);
  }
  return false;
};

//登録されている単語を単語帳から取得する
export const Get_words = async function Get_Words(bookid) {
  try {
    //取得
    const req = await fetch(base_path + "app/wordbook/get_book/" + bookid, {
      method: "GET",
    });

    //200の時
    if (req.status == 200) {
      //データ
      const res_data = await req.json();

      //データを返す
      return {
        success: true,
        data: res_data["words"],
        name: res_data["name"],
      };
    }
  } catch (ex) {
    //エラー
    console.log(ex);
  }

  return {
    success: false,
    data: [],
    name: "",
  };
};

//単語帳一覧を取得する
export const Get_books = async function Get_Books() {
  try {
    //一覧取得
    const req = await fetch(base_path + "app/wordbook/get_books", {
      method: "GET",
    });

    //200の時
    if (req.status == 200) {
      //データ
      const res_data = await req.json();

      //データを返す
      return {
        success: true,
        data: res_data["books"],
      };
    }
  } catch (ex) {
    //エラー
    console.log(ex);
  }

  return {
    success: false,
    data: [],
  };
};

//単語を登録する (単語帳ID , 単語)
export const RegisterWord = async function RegisterWord(id, word) {
  try {
    //リクエスト送信
    const req = await fetch(base_path + "app/wordbook/register", {
      method: "POST",
      body: JSON.stringify({
        bookid: id,
        word: word,
      }),
    });

    //200の時
    if (req.status == 200) {
      console.log(await req.json());
      return true;
    }
  } catch (ex) {
    //エラー
    console.log(ex);
  }

  return false;
};

//単語を登録解除する (単語帳ID , 単語id)
export const UnregisterWord = async function UnregisterWord(id, wordid) {
  try {
    //リクエスト送信
    const req = await fetch(base_path + "app/wordbook/unregister", {
      method: "POST",
      body: JSON.stringify({
        bookid: id,
        wordid: wordid,
      }),
    });

    //200の時
    if (req.status == 200) {
      console.log(await req.json());
      return true;
    }
  } catch (ex) {
    //エラー
    console.log(ex);
  }

  return false;
};

//テキストファイルをアップロードする
export const uptext = async function uptext(file) {
  let results_list = [];
  try {
    //フォームデータ
    const fdata = new FormData();

    //ファイルを追加
    fdata.append("file", file);

    //ポスト
    const req = await fetch(base_path + "app/uptext", {
      method: "POST",
      body: fdata,
    });

    //200の時
    if (req.status == 200) {
      //jsonで取得
      const results = await req.json();

      //リストを回す
      for (const result of results["result"]) {
        //結果に追加
        results_list.push(result);
      }
    }
  } catch (ex) {
    //エラー
    console.log(ex);
  }

  //結果を返す
  return results_list;
};
