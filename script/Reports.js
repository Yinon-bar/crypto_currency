// יצירת אי פי אי להשגת המידע על המטבעות

function Reports(SelectedCoinsArr) {
  compareCoin(SelectedCoinsArr);
  console.log(SelectedCoinsArr);

  function compareCoin(SelectedCoinsArr) {
    $.ajax({
      url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR",
      success: function (data) {
        createTimeCoin(data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  let coins = [];
  function createTimeCoin(data) {
    // console.log(data);
    for (let coin in data) {
      let coinObj = {};
      coinObj.cName = coin;
      coinObj.cValue = data[coin].USD;
      coins.push(coinObj);
    }
    // console.log(coins[0].cName);
    let date = new Date();
    console.log(date);
    let dd = date.getDate();
    let mm = date.getMonth();
    let yy = date.getFullYear();
    // console.log(dd);
    // console.log(mm);
    // console.log(yy);
    let date2 = date.toLocaleDateString("en-IL");
    // console.log(date2);
  }

  $("#coinSec").html(
    `<div id=chartContainer style="height: 450px; width: 100%" ></div>`
  );

  let dataPoints1 = [];
  let dataPoints2 = [];

  let x = {
    _defaultsKey: "DataSeries",
    type: "line",
    xValueType: "dateTime",
    yValueFormatString: "$####.00",
    showInLegend: true,
    name: "Inon",
    dataPoints: dataPoints2,
    lineThickness: 3,
  };

  let chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2",
    zoomEnabled: true,
    title: {
      text: "Coins Compare",
    },
    axisX: {
      title: "chart updates every 3 secs",
    },
    axisY: {
      prefix: "$",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 22,
      fontColor: "dimGrey",
      itemclick: toggleDataSeries,
    },
    data: [
      // {
      //   type: "line",
      //   xValueType: "dateTime",
      //   yValueFormatString: "$####.00",
      //   xValueFormatString: "hh:mm:ss TT",
      //   showInLegend: true,
      //   name: cName,
      //   dataPoints: dataPoints1,
      // },
      // {
      //   type: "line",
      //   xValueType: "dateTime",
      //   yValueFormatString: "$####.00",
      //   showInLegend: true,
      //   name: "Company B",
      //   dataPoints: dataPoints2,
      // },
    ],
  });

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  var updateInterval = 3000;
  // initial value
  var yValue1 = 600;
  var yValue2 = 605;

  var time = new Date();
  // starting at 9.30 am
  // time.setHours(9);
  // time.setMinutes(30);
  // time.setSeconds(00);
  // time.setMilliseconds(00);

  function updateChart(count) {
    count = count || 1;
    var deltaY1, deltaY2;
    for (var i = 0; i < count; i++) {
      time.setTime(time.getTime() + updateInterval);
      deltaY1 = 0.5 + Math.random() * (-0.5 - 0.5);
      deltaY2 = 0.5 + Math.random() * (-0.5 - 0.5);

      // adding random value and rounding it to two digits.
      yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
      yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;

      // pushing the new values
      dataPoints1.push({
        x: time.getTime(),
        y: yValue1,
      });
      dataPoints2.push({
        x: time.getTime(),
        y: yValue2,
      });
    }

    // updating legend text with  updated with y Value
    // chart.options.data[0].legendText = cName + "  $" + yValue1;
    // chart.options.data[1].legendText = " Company B  $" + yValue2;
    // --------------------------------------------
    // var length = chart.options.data[0].dataPoints.length;
    // chart.options.title.text = "New DataPoint Added at the end";
    // chart.options.data[0].dataPoints.push(dataPoints2);
    chart.render();
  }

  // generates first set of dataPoints
  updateChart(100);
  setInterval(function () {
    updateChart();
  }, updateInterval);
  chart.options.data.push(x);
  // console.log(chart.data);
}

export default Reports;
