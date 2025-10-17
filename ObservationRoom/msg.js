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
      data: [18, 23, 16, 12, 13, 16, 7, 8, 9, 26, 3, 10, 9, 10, 6, 11, 12, 33, 8, 6, 19, 11, 0, 0, 15, 3, 2, 5, 13, 7],
    }, {
      name: "共艦",
      data: [9, 8, 13, 6, 6, 8, 8, 9, 7, 7, 7, 6, 6, 7, 7, 8, 8, 8, 8, 7, 7, 7, 5, 1, 1, 4, 6, 5, 6, 6],
    }, {
      name: "氣球",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    categories: ['2025-10-17', '2025-10-16', '2025-10-15', '2025-10-14', '2025-10-13', '2025-10-12', '2025-10-11', '2025-10-10', '2025-10-09', '2025-10-08', '2025-10-07', '2025-10-06', '2025-10-05', '2025-10-04', '2025-10-03', '2025-10-02', '2025-10-01', '2025-09-30', '2025-09-29', '2025-09-28', '2025-09-27', '2025-09-26', '2025-09-25', '2025-09-24', '2025-09-23', '2025-09-22', '2025-09-21', '2025-09-20', '2025-09-19', '2025-09-18'],
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
    data: [209, 439, 510, 531, 497, 487, 512]
  }, {
    name: '共機逾越架次',
    type: 'line',
    data: [142, 307, 314, 375, 359, 362, 337]
  },
  {
    name: '共艦艘次',
    type: 'column',
    data: [130, 208, 191, 239, 208, 250, 249]
  }, {
    name: '共機+共艦',
    type: 'line',
    data: [339, 647, 701, 770, 705, 737, 761]
  }, {
    name: '飛彈飛越',
    type: 'line',
    data: [0, 3, 1, 1, 1, 2, 1]
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
  labels: ['2025-10', '2025-09', '2025-08', '2025-07', '2025-06', '2025-05', '2025-04'],
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