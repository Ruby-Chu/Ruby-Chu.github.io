window.Apex = {
  chart: {
    animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    foreColor: "#fff",
    toolbar: {
      show: false,
    },
  },
  colors: ["#f6d365", "#48c6ef", "#fdfbfb", "#a1c4fd","#fbc2eb", "#43e97b"],
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: "#333",
    },
    axisBorder: {
      color: "#333",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      shadeIntensity: 0.5,
      gradientToColors: ["#fda085", "#6f86d6", "#ebedee", "#c2e9fb", "#a6c1ee", "#38f9d7"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      // stops: [0, 50, 100],
      stops: [0, 25, 50, 75, 100],
      colorStops: [],
    },
  },
  tooltip: {
    theme: "dark",
  },
  yaxis: {
    opposite: true,
    labels: {
      offsetX: -10,
    },
  },
};

var optionsColumn = {
  chart: {
    height: 350,
    type: "bar",
    stacked: true,
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    width: 0,
  },
  series: [{
      name: "共機",
      data: [2, 26, 26, 34, 9, 20, 10, 0, 4, 3, 23, 9, 11, 8, 3, 0, 4, 6, 3, 77, 130, 2, 3, 13, 2, 6, 5, 6, 4, 7],
    }, {
      name: "共艦",
      data: [8, 8, 8, 11, 11, 9, 5, 5, 6, 6, 6, 5, 6, 7, 8, 5, 6, 0, 17, 17, 14, 9, 7, 7, 6, 8, 8, 6, 6, 7],
    }, {
      name: "氣球",
      data: [1, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 1, 2, 2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    },
    
  ],
  title: {
    text: "共軍擾台觀察",
    align: "center",
    style: {
      fontSize: "20px",
      color: "whitesmoke",
    },
  },
  subtitle: {
    text: "數量",
    floating: false,
    align: "right",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: "14px",
      color: "whitesmoke",
    },
  },
  fill: {
    gradient: {
      type: "vertical", // vertical, horizontal, diagonal1, diagonal2
    },
  },
  xaxis: {
    labels: {
      style: {
        fontSize: "10px",
        // fontFamily: 'cursivesystem-ui',
      },
    },
    categories: ['2026-01-19', '2026-01-18', '2026-01-17', '2026-01-16', '2026-01-15', '2026-01-14', '2026-01-13', '2026-01-12', '2026-01-11', '2026-01-10', '2026-01-09', '2026-01-08', '2026-01-07', '2026-01-06', '2026-01-05', '2026-01-04', '2026-01-03', '2026-01-02', '2026-01-01', '2025-12-31', '2025-12-30', '2025-12-29', '2025-12-28', '2025-12-27', '2025-12-26', '2025-12-25', '2025-12-24', '2025-12-23', '2025-12-22', '2025-12-21'],
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      borderRadiusApplication: "end", // 'around', 'end'
      borderRadiusWhenStacked: "last", // 'all', 'last'
      columnWidth: '70%',
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "12px",
            fontWeight: 900,
            color: "gray",
          },
        },
      },
    },
  },
};

var chartColumn = new ApexCharts(
  document.querySelector("#columnchart"),
  optionsColumn
);
chartColumn.render();

var optionsCircle = {
  chart: {
    type: "radialBar",
    height: 250,
    offsetX: 0
  },
  plotOptions: {
    radialBar: {
      inverseOrder: false,
      hollow: {
        margin: 5,
        size: "48%",
        background: "transparent"
      },
      track: {
        show: true,
        background: "#40475D",
        strokeWidth: "10%",
        opacity: 1,
        margin: 3 // margin is in pixels
      }
    }
  },
  series: [100.0, 100.0],
  labels: ["共機百分比", "逾越百本比"],
  legend: {
    show: true,
    position: "left",
    offsetX: -30,
    offsetY: -10,
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
    }
  },
  fill: {
    gradient: {
      type: "vertical",
    }
  }
};

var chartCircle = new ApexCharts(
  document.querySelector("#circlechart"),
  optionsCircle
);
chartCircle.render();

var options = {
  series: [{
    name: '共機架次',
    type: 'column',
    data: [201, 470, 398, 325, 440, 510, 531]
  }, {
    name: '共機逾越架次',
    type: 'line',
    data: [109, 258, 266, 226, 308, 314, 375]
  },
  {
    name: '共艦艘次',
    type: 'column',
    data: [137, 231, 187, 205, 208, 191, 239]
  }, {
    name: '共機+共艦',
    type: 'line',
    data: [338, 701, 585, 530, 648, 701, 770]
  }, {
    name: '飛彈飛越',
    type: 'line',
    data: [1, 1, 0, 0, 3, 1, 1]
  }],
  chart: {
    height: 370,
    type: 'line',
  },
  stroke: {
    width: [0, 0, 0, 4, 0]
  },
  title: {
    text: '每月累計',
    style: {
      fontSize: "16px",
      color: "whitesmoke",
    },
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1, 3, 4]
  },
  labels: ['2026-01', '2025-12', '2025-11', '2025-10', '2025-09', '2025-08', '2025-07'],
  yaxis: [{
    min: 0,
    max: 800,
    title: {
      text: '總數量(架/艘)',
      style: {
        fontSize: "14px",
        color: "white",
      },
    },
  },
  {
    min: 0,
    max: 800,
    show: false
  },
  {
    min: 0,
    max: 800,
    show: false
  },
  {
    min: 0,
    max: 800,
    show: false
  },
  {
    opposite: true,
    stepSize: 1,
    floating: false,
    min: 0,
    title: {
      text: '太空有飛彈次數',
      style: {
        fontSize: "14px",
        color: "whitesmoke",
      },
    },
  }],
  // legend: {
  //   show: false
  // },
  fill: {
    gradient: {
      type: "vertical",
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      borderRadiusApplication: "end", // 'around', 'end'
      borderRadiusWhenStacked: "last", // 'all', 'last'
      columnWidth: '70%',
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "12px",
            fontWeight: 900,
            color: "gray",
          },
        },
      },
    },
  }
};

var chart = new ApexCharts(document.querySelector("#chart2"), options);
chart.render();