$(document).ready(function () {
  $.ajax({
    url: "https://api.coingecko.com/api/v3/coins/list",
    success: function (data) {
      display(data);
    },
    error: function (err) {
      console.log(err);
    },
  });

  function display(arr) {
    let kryptoArr = [];
    arr.forEach((obj) => {
      kryptoArr.push(obj);
    });
    // console.log(kryptoArr);
    kryptoArr.splice(200);
    // console.log(kryptoArr);

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
          console.log(this.dataset.objid);
          let btn = this;
          console.log($(`#${this.dataset.objid}`));
          $(`#${this.dataset.objid} .prog`).slideDown(200);
          $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/" + this.dataset.objid,
            success: function (data) {
              coinDisc(data, btn);
            },
            error: function (err) {
              console.log(err);
            },
          });
          function coinDisc(data, btn) {
            // console.log(btn);
            console.log(data);
            console.log(flag);
            if (flag == 1) {
              $(btn)
                .parent()
                .prev()
                .children("")
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

  function changeToReports() {
    $(".btn-group > .btn-check").each(function (index) {
      // console.log(index);
      // console.log(this);
      $(this).on("change", function () {
        console.log(this.id);
        switch (this.id) {
          case "home":
            $("#coinSec").html(home());
            break;
          case "reports":
            $("#coinSec").html(reports());
            break;
          case "about":
            $("#coinSec").html(about());
            break;
        }
      });
    });
  }

  changeToReports();

  function home() {
    return `
      <h1>Home</h1>
    `;
  }
  function reports() {
    return `
      <h1>Reports</h1>
    `;
  }
  function about() {
    return `
      <h1>About</h1>
    `;
  }
});
