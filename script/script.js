import Header from "./Header.js";
import Nav from "./Nav.js";
import About from "./About.js";
import Reports from "./Reports.js";
import CoinTable from "./CoinTable.js";

export function addToArrReports(SelectedCoinsArr, final = "") {
  // console.log(cardId);
  $("#coinSec input[type=checkbox]").each(function () {
    $(this).on("change", function () {
      let cardId = this.dataset.objid;
      $("#reports").removeAttr("disabled");
      // ולידציה להוספת מטבעות
      if (this.checked) {
        if (SelectedCoinsArr.length < 5 || SelectedCoinsArr.length > 5) {
          if (final == 1) {
            $("#coinSec").html(Reports(SelectedCoinsArr));
          }
          SelectedCoinsArr.push(cardId);
        } else {
          SelectedCoinsArr.push(cardId);
          console.log(SelectedCoinsArr);
          CoinsLimit(SelectedCoinsArr);
          // alert("The maximum coins to compare is 5");
          this.checked = false;
        }
      } else {
        // let delItem = SelectedCoinsArr.indexOf(this.dataset.objid);
        // console.log(delItem);
        // SelectedCoinsArr.splice(delItem, 1);
        // console.log(SelectedCoinsArr);
      }
      console.log(SelectedCoinsArr);
    });
  });
}

function CoinsLimit(coinsArray) {
  $("#coinSec").html(CoinTable(coinsArray));
  $(".coinTable").slideDown(200);
}

// רנדור "קומפוננטות" ההדר והנאב בר
function renderToHtml() {
  $(".container").prepend(Header());
  $(".container > main").prepend(Nav());
}

renderToHtml();

// ביצוע קריאת API לכל המטבעות
$(document).ready(function getAllApi() {
  $.ajax({
    url: "https://api.coingecko.com/api/v3/coins/list",
    success: function (data) {
      display(data);
    },
    error: function (err) {
      console.log(err);
    },
  });

  let SelectedCoinsArr = [];

  // במידה והכל תקין הפעלת פונקציית דיספליי
  function display(arr) {
    let kryptoArr = [];
    arr.forEach((obj) => {
      kryptoArr.push(obj);
    });
    // יש לחתוך את המערך ל200 מטבעות בלבד
    kryptoArr.splice(200);
    console.log(kryptoArr);
    // עבור כל מטבע שחזר במערך יש לרנדר לדיו המתאים
    $("#coinSec").html("");
    kryptoArr.forEach((obj) => {
      // console.log(obj);
      $("#coinSec").append(`
      <div
            class="card text-white bg-dark mb-3 p-0" id="${obj.id}"
            style="max-width: 20rem; min-height: 20rem;" >
            <div class="card-header">${obj.symbol}</div>
            <div class="card-body row d-flex align-items-space-between">
              <div class="sec col-9">
                <h4 class="card-title">${obj.name}</h4>
                <h6 class="text-secondary card-title">ID: ${obj.id}</h6>
              </div>
              <div
                class="form-check d-flex justify-content-end col-3 form-switch"
              >
                <input
                  data-objid='${obj.symbol}'
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  style="font-size: 1.5rem;"
                />
              </div>
              <div id="para">
                <div class="coin-desc prog">
                  <img width="100%" src="./img/Loading_icon.gif">
                </div>
              </div>
              <div class="moreBtn row-2 p-0 d-flex align-items-end">
                <button type="button" data-objid='${obj.id}' class="btn btn-success mx-auto mb-0">Read More</button>
              </div>
            </div>
          </div>
      `);
    });

    addToArrReports(SelectedCoinsArr);
    // הכנסת המטבעות למערך בלחיצה על טוגל באטטן

    getInfo(kryptoArr);

    // הגדרת המערך שאליו ייכנסו האובייקטים של המידע הנוסף
    let coinInfo = [];
    // פונקצייה להבאת נתונים נוספים עבור מטבע נוכחי
    function getInfo(arr) {
      // console.log(arr);
      $("button").each(function (index) {
        let flag = 1;
        $(this).on("click", function () {
          let btn = this;
          let cardId = this.dataset.objid;
          function coinDisc(data, cardId) {
            console.log(flag);
            coinInfo.push(data);
            localStorage.setItem(`${cardId}`, JSON.stringify(data));
            if (flag == 1) {
              $(`#${cardId} .prog`)
                .html(
                  `<div class="row mt-4 mb-5 d-flex justify-content-center align-items-between">
                <div class="col"><img width="100%" src="${data.image.small}"></div>` +
                    `<div class="col-8"><h5>Currency Values</h5>
                USD: ${data.market_data.current_price.usd} $<br>` +
                    `EUR: ${data.market_data.current_price.eur} &euro;<br>` +
                    `ILS: &#x20AA; ${data.market_data.current_price.ils} 
                </div>
                `
                )
                .slideDown();

              // .addClass("coin-desc");
              // console.log($(btn).parent().prev().children());
              $(btn).text("Read Less");
              flag = 2;
            } else {
              $(btn).parent().prev().children().slideUp();
              $(btn).parent().prev().children("prog").slideUp();
              flag = 1;
            }
          }
          // יש לבצע בדיקה האם המטבע קיים כבר אצלינו
          if (localStorage[`${cardId}`]) {
            let getCoin = localStorage.getItem(`${cardId}`);
            let coinObj = JSON.parse(getCoin);
            console.log(coinObj);
            coinDisc(coinObj, cardId);
          } else {
            $(`#${cardId} .prog`).slideDown(200);
            $.ajax({
              url:
                "https://api.coingecko.com/api/v3/coins/" + this.dataset.objid,
              success: function (data) {
                coinDisc(data, cardId);
              },
              error: function (err) {
                console.log(err);
              },
            });
            // תוספת פרטים נפתחת
          }
        });
      });
    }
  }

  changeToReports();

  function changeToReports() {
    $(".btn-check").each(function (index) {
      $(this).on("change", function () {
        // console.log(this.id);
        switch (this.id) {
          case "home":
            let rep = $("#reports");
            console.log(rep);
            rep.attr("disabled", "");
            $("#coinSec").html(getAllApi());
            break;
          case "reports":
            $("#coinSec").html(Reports(SelectedCoinsArr));
            break;
          case "about":
            $("#coinSec").html(About());
            break;
        }
      });
    });
  }
});
