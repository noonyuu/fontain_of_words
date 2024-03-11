const create_word_button = document.getElementById("create_word_button");

create_word_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    try {
        //ログアウト
        const req = await fetch(base_path + "app/wordbook/create", {
            method: "POST",
            body: JSON.stringify({
                "Name" : "hello world"
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