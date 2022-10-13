// יצירת אי פי אי להשגת המידע על המטבעות
// compareCoin();

// function compareCoin(SelectedCoinsArr) {
//   $.ajax({
//     url: "https://www.cryptocompare.com/api/#-api-data-price",
//     success: function (data) {
//       display(data);
//     },
//     error: function (err) {
//       console.log(err);
//     },
//   });
// }

function Reports() {
  let unixTime1 = 1664582400;
  let unixTime2 = 1664668800;
  let date = new Date(unixTime1 * 1000);
  // console.log(date);
  let dd = date.getDate();
  let mm = date.getMonth();
  let yy = date.getFullYear();
  // console.log(dd);
  // console.log(mm);
  // console.log(yy);
  let date2 = date.toLocaleDateString("en-IL");
  // console.log(date2);

  $("#coinSec").html(
    `<div id=chartContainer style="height: 450px; width: 100%" ></div>`
  );

  let dataPoints = [];

  let chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2",
    title: {
      text: "Coin Compare",
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 22,
      // fontColor: "dimGrey",
      itemclick: toggleDataSeries,
    },
    axisY: {
      prefix: "$",
    },
    toolTip: {
      shared: true,
    },
    axisX: {
      // valueFormatString: `${(+dd, +mm)}`,
      title: "chart updates every 2 secs",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    data: [
      {
        name: "BTC",
        type: "line",
        lineThickness: 3,
        yValueFormatString: "$####.00",
        xValueType: "dateTime",
        showInLegend: true,
        xValueFormatString: "hh:mm:ss TT",
        dataPoints: dataPoints,
      },
      {
        name: "ETH",
        type: "line",
        lineThickness: 3,
        yValueFormatString: "$####.00",
        dataPoints: [
          { x: 1, y: 15 },
          { x: 7, y: 18 },
          { x: 36, y: 27 },
        ],
        color: "red",
        showInLegend: true,
      },
      {
        name: "BUL",
        type: "line",
        lineThickness: 3,
        dataPoints: [
          { x: 5, y: 15 },
          { x: 17, y: 10 },
          { x: 52, y: 5 },
        ],
        color: "green",
        showInLegend: true,
      },
    ],
  });
  updateData();

  // Initial Values
  var xValue = 0;
  var yValue = 20;
  var newDataCount = 3;

  function addData(data) {
    if (newDataCount != 1) {
      $.each(data, function (key, value) {
        dataPoints.push({ x: value[0], y: parseInt(value[1]) });
        xValue++;
        yValue = parseInt(value[1]);
      });
    } else {
      //dataPoints.shift();
      dataPoints.push({ x: data[0][0], y: parseInt(data[0][1]) });
      xValue++;
      yValue = parseInt(data[0][1]);
    }

    newDataCount = 1;
    chart.render();
    setTimeout(updateData, 1000);
  }

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  function updateData() {
    $.getJSON(
      "https://canvasjs.com/services/data/datapoints.php?xstart=" +
        xValue +
        "&ystart=" +
        yValue +
        "&length=" +
        newDataCount +
        "type=json",
      addData
    );
  }
}

export default Reports;
