// יצירת אי פי אי להשגת המידע על המטבעות

function Reports(SelectedCoinsArr) {
  const coins = [];
  const updateInterval = 3000;

  // 1. create chart and consts
  // 2. fetch data in an interval

  compareCoin(SelectedCoinsArr);

  function compareCoin(SelectedCoinsArr) {
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${SelectedCoinsArr}&tsyms=USD,EUR`,
      success: function (priceMultidata) {
        // generates first set of dataPoints
        createTimeCoin(priceMultidata);
        updateChart();
        setInterval(function () {
          updateChart();
        }, updateInterval);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  function createTimeCoin(priceMultidata) {
    const time = new Date();

    for (let coin in priceMultidata) {
      const dataPoint = { x: time.getTime(), y: coin.cValue };
      let coinObj = {};
      (coinObj._defaultsKey = "DataSeries"),
        (coinObj.type = "line"),
        (coinObj.mame = coin),
        (coinObj.showInLegend = true),
        (coinObj.xValueType = "dateTime"),
        (coinObj.yValueFormatString = "$####.00"),
        (coinObj.cValue = priceMultidata[coin].USD),
        (coinObj.dataPoints = [dataPoint]),
        (coinObj.lineThickness = 3),
        (coinObj.legendText = coin),
        coins.push(coinObj);
    }
  }

  $("#coinSec").html(
    `<div id=chartContainer style="height: 450px; width: 100%" ></div>`
  );

  const chart = new CanvasJS.Chart("chartContainer", {
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
    data: [],
  });

  // הערכים שאני הכנסתי
  chart.options.data = coins;

  // כבוי והדלקה של התצוגת מטבעות על הגרף
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  // initial value
  let yValue1 = 300;

  function updateChart(count) {
    const updatedTime = new Date();

    count = count || 1;
    let deltaY1, deltaY2;
    for (let i = 0; i < count; i++) {
      updatedTime.setTime(updatedTime.getTime() + updateInterval);
      deltaY1 = 0.5 + Math.random() * (-0.5 - 0.5);

      // adding random value and rounding it to two digits.
      yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;

      // pushing the new values
      console.log("coins_0", chart.options.data);
      console.log("coins", coins);

      for (i = 0; i < coins.length; i++) {
        chart.options.data[i].dataPoints.push({
          x: updatedTime.getTime(),
          y: coins[i].cValue,
        });
      }
    }

    chart.render();
  }
}

export default Reports;
