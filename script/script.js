import Header from "./Header.js";
import Nav from "./Nav.js";
import About from "./About.js";
import Reports from "./Reports.js";

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

  // במידה והכל תקין הפעלת פונקציית דיספליי
  function display(arr) {
    let kryptoArr = [];
    arr.forEach((obj) => {
      kryptoArr.push(obj);
    });
    // יש לחתוך את המערך ל200 מטבעות בלבד
    kryptoArr.splice(200);
    // עבור כל מטבע שחזר במערך יש לרנדר לדיו המתאים
    $("#coinSec").html("");
    kryptoArr.forEach((obj) => {
      $("#coinSec").append(`
      <div
            class="card text-white bg-dark mb-3 p-0" id="${obj.id}"
            style="max-width: 20rem; min-height: 20rem;" >
            <div class="card-header">${obj.symbol}</div>
            <div class="card-body row d-flex  align-items-space-between">
              <div class="sec col-9">
                <h4 class="card-title">${obj.name}</h4>
                <h6 class="text-secondary card-title">ID: ${obj.id}</h6>
              </div>
              <div
                class="form-check d-flex justify-content-end col-3 form-switch"
              >
                <input
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
    getInfo(kryptoArr);
    function getInfo(arr) {
      console.log(arr);
      $("button").each(function (index) {
        let flag = 1;
        $(this).on("click", function () {
          // console.log(this.dataset.objid);
          let btn = this;
          let cardId = this.dataset.objid;
          // console.log(cardId);
          $(`#${cardId} .prog`).slideDown(200);
          $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/" + this.dataset.objid,
            success: function (data) {
              coinDisc(data, cardId);
            },
            error: function (err) {
              console.log(err);
            },
          });
          // תוספת פרטים נפתחת
          function coinDisc(data, cardId) {
            console.log(cardId);
            // console.log(data);
            console.log(flag);
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
        });
      });
    }
  }

  changeToReports();

  function changeToReports() {
    $(".btn-check").each(function (index) {
      // console.log(index);
      // console.log(this);
      $(this).on("change", function () {
        console.log(this.id);
        switch (this.id) {
          case "home":
            $("#coinSec").html(getAllApi());
            break;
          case "reports":
            $("#coinSec").html(Reports());
            break;
          case "about":
            $("#coinSec").html(About());
            break;
        }
      });
    });
  }
});
