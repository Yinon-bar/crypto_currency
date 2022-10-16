const labels = [
  "ירושלים",
  "תל - אביב",
  "חיפה",
  "ראשון לציון",
  "פתח - תקוה",
  "נתניה",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "אוכלסיה",
      backgroundColor: "rgb(255, 186, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [],
      borderWidth: 2,
    },
    // {
    //   label: "אוכלסיה",
    //   backgroundColor: "rgb(255, 186, 132)",
    //   borderColor: "rgb(255, 185, 132)",
    //   data: [255, 45855, 4584, 45448, 45648, 458845],
    //   borderWidth: 2,
    // },
  ],
};

console.log(data.datasets[0].data);

for (let i = 0; i < labels.length; i++) {
  let rndNum = Math.floor(Math.random() * 600000) + 50000;
  data.datasets[0].data.push(rndNum);
}

const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "כמות תושבים לפי עיר",
        font: {
          size: 27,
        },
      },
      legend: {
        position: "top",
        labels: {
          color: "#444",
        },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);

// הגדרת משתנים גלובלים
Chart.defaults.font.family = "assistant";
// Chart.defaults.font.size = "15px";
Chart.defaults.font.weight = "600";
