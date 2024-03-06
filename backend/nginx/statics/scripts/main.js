const logout_button = document.getElementById("logout_button");

logout_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    const result = await Logout();

    //成功したら
    if (result) {
        
    }
})

const getuser_button = document.getElementById("getuser_button");

getuser_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    
});

const refresh_button = document.getElementById("refresh_button");

refresh_button.addEventListener("click", async (evt) => {
    evt.preventDefault();

    console.log(await Refresh_Token());
})

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