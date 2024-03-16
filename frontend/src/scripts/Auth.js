//ベースパス
const base_path = "https://fountain-of-words.noonyuu.com/";

//トークンを更新する (成功したら true) それ以外は false
export const Refresh_Token = async () => {
    try {
        //トークン更新
        const req = await fetch(base_path + "auth/refresh", {
            method: "POST",
        });

        //200の時
        if (req.status == 200) {
            return true;
        }

        //それ以外の時
        return false;
    } catch (ex) {
        //エラー
        console.log(ex);
        return false;
    }
}

//ログアウト (成功したら true) それ以外は false
export const Logout = async () => {
    try {
        //ログアウト
        const req = await fetch(base_path + "auth/logout", {
            method: "POST",
        });

        //200の時
        if (req.status == 200) {
            return true;
        }

        //それ以外の時
        return false;
    } catch (ex) {
        //エラー
        console.log(ex);
        return false
    }
}

//ログインしてたら(true,ユーザー情報)を返す
export const GetInfo = async () => {
    try {
        //ログアウト
        const req = await fetch(base_path + "auth/getuser", {
            method: "POST",
        });

        //200の時
        if (req.status == 200) {
            return [true, await req.json()];
        }

        //それ以外の時
        return [false, null];
    } catch (ex) {
        //エラー
        console.log(ex);
        return [false, null];
    }
}