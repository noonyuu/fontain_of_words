//ベースパス
const base_path = "/";

//トークンを更新する (成功したら true) それ以外は false
export async function Refresh_Token() {
  console.log("Refresh_Token");
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
export async function Logout() {
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
    return false;
  }
}

//ログインしてたら(true,ユーザー情報)を返す
export async function GetInfo() {
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
