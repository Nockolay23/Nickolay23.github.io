document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadItems();
  },
  false
);

function loadItems() {
  //загружаю товары на страницу
  $.getJSON("items.json", function (data) {
    var out = "";
    for (var key in data) {
      out += '<div class="item">';
      out += "<h3>" + data[key]["name"] + "</h3>";
      out += "<p>Цена: " + data[key]["cost"] + " руб" + "</p>";
      out += '<img src=" ' + data[key].image + '" class="img">';
      out += '<button class="btn">Купить</button>';
      out += "</div>";
    }
    $("#items").html(out);
  });
}
let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let item = "";

// const btns = document.querySelectorAll(".btn");
const items = document.querySelector(".inner");

items.addEventListener("click", (e) => {
  if (e.target.closest(".btn")) {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.setText(
        `Вы выбрали товар ${e.target.getAttribute("data-num")}!`
      );
      item = `${e.target.getAttribute("data-num")}`;
      tg.MainButton.show();
    }
  }
});

// btns.forEach((btn, i) => {
//   btn.addEventListener("click", () => {
//     if (tg.MainButton.isVisible) {
//       tg.MainButton.hide();
//     } else {
//       tg.MainButton.setText(`Вы выбрали товар ${i + 1}!`);
//       item = `${i + 1}`;
//       tg.MainButton.show();
//     }
//   });
// });

Telegram.WebApp.onEvent("mainButtonClicked", function () {
  tg.sendData(item);
});

let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);
