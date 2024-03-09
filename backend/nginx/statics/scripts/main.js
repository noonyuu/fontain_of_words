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
