// יצירת אי פי אי להשגת המידע על המטבעות

function Reports(SelectedCoinsArr) {
  compareCoin(SelectedCoinsArr);
  console.log(SelectedCoinsArr);

  function compareCoin(SelectedCoinsArr) {
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${SelectedCoinsArr}&tsyms=USD,EUR`,
      success: function (data) {
        createTimeCoin(data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  let coins = [];
  let cName = "inon";
  function createTimeCoin(data) {
    console.log(data);
    for (let coin in data) {
      let coinObj = {};
      console.log(coin);
      (coinObj._defaultsKey = "DataSeries"),
        (coinObj.type = "line"),
        (coinObj.mame = coin),
        (coinObj.showInLegend = true),
        (coinObj.xValueType = "dateTime"),
        (coinObj.yValueFormatString = "$####.00"),
        (coinObj.cValue = data[coin].USD),
        (coinObj.dataPoints = dataPoints1),
        (coinObj.lineThickness = 3),
        (coinObj.legendText = coin),
        coins.push(coinObj);
    }
    console.log("coins:", coins);
    // console.log(coins[0].cName);
    let date = new Date();
    // console.log(date);
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

  // let x = {
  //   _defaultsKey: "DataSeries",
  //   type: "line",
  //   xValueType: "dateTime",
  //   yValueFormatString: "$####.00",
  //   showInLegend: true,
  //   name: "Inon",
  //   dataPoints: dataPoints2,
  //   lineThickness: 3,
  // };

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
    ],
  });

  // הערכים שאני הכנסתי
  chart.options.data = coins;
  console.log(chart.options);

  // כבוי והדלקה של התצוגת מטבעות על הגרף
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  let updateInterval = 3000;
  // initial value
  let yValue1 = 300;
  console.log(coins);

  let time = new Date();
  // starting at 9.30 am
  // time.setHours(9);
  // time.setMinutes(30);
  // time.setSeconds(00);
  // time.setMilliseconds(00);

  function updateChart(count) {
    count = count || 1;
    let deltaY1, deltaY2;
    for (let i = 0; i < count; i++) {
      time.setTime(time.getTime() + updateInterval);
      deltaY1 = 0.5 + Math.random() * (-0.5 - 0.5);

      // adding random value and rounding it to two digits.
      yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
      // console.log(coins[0]);
      // yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;

      // pushing the new values
      console.log("coins_0", chart.options.data);
      console.log("coins", coins);
      dataPoints1.push({
        x: time.getTime(),
        y: +coins[0].cValue,
      });
    }

    // updating legend text with  updated with y Value
    // chart.options.data[0].legendText = "BTC" + "  $" + yValue1;
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
  console.log(chart.options.data);
  console.log(chart.options.data[1]);
}

export default Reports;
