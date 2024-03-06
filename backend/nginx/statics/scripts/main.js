const logout_button = document.getElementById("logout_button");

logout_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    const result = await Logout();

    //成功したら
    if (result) {
        
    }
})

const icon_img = document.getElementById("icon_img");

const getuser_button = document.getElementById("getuser_button");

getuser_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    const uinfo = await GetInfo();

    if (uinfo) {
        icon_img.src = uinfo.icon;
    }
});

const refresh_button = document.getElementById("refresh_button");

refresh_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    console.log(await Refresh_Token());
})

getuser_button.click();

async function Refresh_Token() {
    //トークン更新
    const req = await fetch("/auth/refresh",{
        method: "POST",
    });

    //200の時
    if (req.status == 200) {
        return true;
    }

    //それ以外の時
    return false;
}

async function Logout() {
    //ログアウト
    const req = await fetch("/auth/logout",{
        method: "POST",
    });

    //200の時
    if (req.status == 200) {
        return true;
    }

    //それ以外の時
    return false;
}

async function GetInfo() {
    //ログアウト
    const req = await fetch("/auth/getuser",{
        method: "POST",
    });

    //200の時
    if (req.status == 200) {
        return await req.json();
    }

    return null;
}