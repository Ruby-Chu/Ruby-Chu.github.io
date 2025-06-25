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
  colors: ["#a1c4fd", "#c471f5", "#ff9a9e", "#4facfe", "#667eea"],
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
      gradientToColors: ["#c2e9fb", "#fa71cd", "#fad0c4", "#00f2fe", "#764ba2"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100],
      colorStops: [],
    },
  },
  tooltip: {
    theme: "light",
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
      data: {military_temp},
    }, {
      name: "共艦",
      data: {warship_temp},
    }, {
      name: "氣球",
      data: {balloon_temp},
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
      type: "diagonal2", // vertical, horizontal, diagonal1, diagonal2
    },
  },
  xaxis: {
    labels: {
      style: {
        fontSize: "10px",
        // fontFamily: 'cursivesystem-ui',
      },
    },
    categories: ['2025-06-24', '2025-06-23', '2025-06-22', '2025-06-21', '2025-06-20', '2025-06-19', '2025-06-18', '2025-06-17', '2025-06-16', '2025-06-15', '2025-06-14', '2025-06-13', '2025-06-12', '2025-06-11', '2025-06-10', '2025-06-09', '2025-06-08', '2025-06-07', '2025-06-06', '2025-06-05'],
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
  series: [{today_military_p}, {today_military_wp}],
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
      type: "horizontal",
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
    data: {m_military_temp}
  }, {
    name: '共機逾越架次',
    type: 'line',
    data: {m_enter_warn_temp}
  },
  {
    name: '共艦艘次',
    type: 'column',
    data: {m_warship_temp}
  }, {
    name: 'Total',
    type: 'line',
    data: {m_total_temp}
  }, {
    name: '飛彈飛越',
    type: 'line',
    data: {m_missile_temp}
  }],
  chart: {
    height: 370,
    type: 'line',
  },
  stroke: {
    width: [0, 0, 0, 4, 0]
  },
  title: {
    text: '每月累計統計',
    style: {
      fontSize: "16px",
      color: "whitesmoke",
    },
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1, 3, 4]
  },
  labels: {m_labels_temp},
  yaxis: [{
    seriesName: "共機架次",
    title: {
      text: '總數量(架/艘)',
      style: {
        fontSize: "14px",
        color: "white",
      },
    },
  },
  {
    seriesName: "共機架次",
    show: false
  },
  {
    seriesName: "共機架次",
    show: false
  },
  {
    seriesName: "共機架次",
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
  legend: {
    show: false
  },
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


$(".counter").each(function () {
  var $this = $(this),
    countTo = $this.attr("data-count");

  $({ countNum: $this.text() }).animate(
    {
      countNum: countTo,
    },

    {
      duration: 1000,
      easing: "linear",
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(this.countNum);
      },
    }
  );
});