const logout_button = document.getElementById("logout_button");

logout_button.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const result = await Logout();

  //成功したら
  if (result) {
    window.location.reload();
  }
});

const icon_img = document.getElementById("icon_img");

const getuser_button = document.getElementById("getuser_button");

getuser_button.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const uinfo = await GetInfo();

  if (uinfo) {
    icon_img.src = uinfo[1].icon;
  }
});

const refresh_button = document.getElementById("refresh_button");

refresh_button.addEventListener("click", async (evt) => {
  evt.preventDefault();

  console.log(await Refresh_Token());
});

getuser_button.click();

async function main() {
  const uinfo = await GetInfo();
  console.log(uinfo[0]);
  console.log(await Refresh_Token());
}

const txt_upload = document.getElementById("txt_upload");

txt_upload.addEventListener("change", async (evt) => {
  for (let result of await uptext(txt_upload.files[0])) {
    kaiseki_result.insertAdjacentHTML("beforeend", result + "<br>");
  }
});

main();
