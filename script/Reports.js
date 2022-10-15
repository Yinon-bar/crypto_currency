function Reports(SelectedCoinsArr) {
  // שלב 1 - יצירת הטבלה
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
    data: initiateCoins(),
  });

  // כבוי והדלקה של התצוגת מטבעות על הגרף
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  // שלב 2 - יצירת אובייקט המכיל את כל הנתונים על מנת לבנות קו על הגרף
  function initiateCoins() {
    return SelectedCoinsArr.map((coinKey) => {
      const coinObj = {};
      (coinObj._defaultsKey = "DataSeries"),
        (coinObj.name = coinKey.toUpperCase()),
        (coinObj.dataPoints = []),
        (coinObj.legendText = coinKey),
        (coinObj.type = "line"),
        (coinObj.showInLegend = true),
        (coinObj.xValueType = "dateTime"),
        (coinObj.yValueFormatString = "$####.00"),
        (coinObj.lineThickness = 3);
      return coinObj;
    });
  }

  // קריאה לפונקציית API
  const fetchInterval = 3000;

  fetchData(SelectedCoinsArr);
  setInterval(function () {
    fetchData(SelectedCoinsArr);
  }, fetchInterval);

  function fetchData(SelectedCoinsArr) {
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${SelectedCoinsArr}&tsyms=USD,EUR`,
      success: function (priceMultiData) {
        updateChart(priceMultiData);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  // הכנסת הערכים למיקום באובייקט ברצוי
  function updateChart(priceMultiData) {
    const updatedTime = new Date();
    updatedTime.setTime(updatedTime.getTime() + fetchInterval);
    for (let i = 0; i < SelectedCoinsArr.length; i++) {
      chart.options.data[i].dataPoints.push({
        x: updatedTime.getTime(),
        y: priceMultiData[chart.options.data[i].name].USD,
      });
    }
    chart.render();
  }
}

export default Reports;
