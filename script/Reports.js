function Reports() {
  let unixTime1 = 1664582400;
  let unixTime2 = 1664668800;
  let date = new Date(unixTime1 * 1000);
  console.log(date);
  let dd = date.getDate();
  let mm = date.getMonth();
  let yy = date.getFullYear();
  console.log(dd);
  console.log(mm);
  console.log(yy);
  let date2 = date.toLocaleDateString("en-IL");
  console.log(date2);

  $("#coinSec").html(
    `<div id=chartContainer style="height: 450px; width: 100%" ></div>`
  );

  // -------------------------------------------------------
  let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "dark2",
    title: {
      text: "Coin Compare",
    },
    axisX: {
      valueFormatString: "DD/MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Coin Value ($)",
      includeZero: true,
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "line",
        showInLegend: true,
        name: "BTC",
        markerType: "circle",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: [
          { x: new Date(yy, mm, dd), y: 853 },
          { x: new Date(yy, mm, 3), y: 650 },
          { x: new Date(yy, mm, 4), y: 700 },
          { x: new Date(yy, mm, 5), y: 710 },
          { x: new Date(yy, mm, 6), y: 658 },
          { x: new Date(yy, mm, 7), y: 734 },
          { x: new Date(yy, mm, 8), y: 963 },
          { x: new Date(yy, mm, 9), y: 847 },
        ],
      },
      {
        type: "line",
        showInLegend: true,
        name: "ETH",
        // lineDashType: "dash",
        dataPoints: [
          { x: new Date(yy, mm, dd), y: 663 },
          { x: new Date(yy, mm, 3), y: 510 },
          { x: new Date(yy, mm, 4), y: 560 },
          { x: new Date(yy, mm, 5), y: 540 },
          { x: new Date(yy, mm, 6), y: 558 },
          { x: new Date(yy, mm, 7), y: 544 },
          { x: new Date(yy, mm, 8), y: 693 },
          { x: new Date(yy, mm, 9), y: 657 },
        ],
      },
    ],
  });
  chart.render();

  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
  // return `
  // <h1>Reportes</h1>

  // `;
}

export default Reports;
