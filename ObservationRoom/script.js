window.Apex = {
  chart: {
    foreColor: "#fff",
    toolbar: {
      show: false,
    },
  },
  colors: ["#FCCF31", "#17ead9", "#f02fc2", "#3399ff", "#cc3300"],
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
      gradientToColors: ["#F55555", "#6078ea", "#6094ea", "#e6ecff", "#ffece6"],
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
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
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
  series: [
    {
      name: "共機",
      data: [5, 12, 40, 50, 25, 7, 17, 0, 0, 0, 15, 10, 43, 14, 7, 11, 34, 38, 24, 2],
    },
    {
      name: "共艦",
      data: [9, 6, 6, 6, 7, 6, 6, 6, 6, 8, 7, 7, 6, 6, 8, 7, 8, 7, 8, 12],
    },
    {
      name: "氣球",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  title: {
    text: "共軍擾台觀察",
    align: "center",
    style: {
      fontSize: "20px",
      color: "white",
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
      color: "gray",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      //   gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100],
      colorStops: [],
    },
  },
  xaxis: {
    labels: {
      style: {
        fontSize: "10px",
      },
    },
    categories: ['2025-06-23', '2025-06-22', '2025-06-21', '2025-06-20', '2025-06-19', '2025-06-18', '2025-06-17', '2025-06-16', '2025-06-15', '2025-06-14', '2025-06-13', '2025-06-12', '2025-06-11', '2025-06-10', '2025-06-09', '2025-06-08', '2025-06-07', '2025-06-06', '2025-06-05', '2025-06-04'],
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      borderRadiusApplication: "end", // 'around', 'end'
      borderRadiusWhenStacked: "last", // 'all', 'last'
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
  series: [100.0, 60.0],
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
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
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
    name: '本月共機架次',
    type: 'column',
    data: [368, 487, 512, 448, 464, 341, 130]
  }, {
    name: '本月共機逾越架次',
    type: 'line',
    data: [268, 362, 337, 324, 347, 249, 65]
  },
  {
    name: '本月共艦艘次',
    type: 'column',
    data: [165, 250, 249, 224, 221, 191, 93]
  },{
    name: 'Total',
    type: 'line',
    data: [533, 737, 761, 672, 685, 532, 223]
  },{
    name: '飛彈飛越外太空',
    type: 'line',
    data: [1, 2, 1, 2, 1, 1, 1]
  }],
  chart: {
    height: 270,
    type: 'line',
  },
  stroke: {
    width: [0, 0, 0, 4, 0]
  },
  title: {
    text: '每月統計'
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1, 3, 4]
  },
  labels: ['2025-06', '2025-05', '2025-04', '2025-03', '2025-02', '2025-01', '2024-12'],
  yaxis: [{
    title: {
      text: '總數量',
    },
  }, {
      show: false
    }, { show: false }, { show: false },
    {
      opposite: true,
      stepSize: 1,
      floating: false,
      min: 0,
      title: {
        text: '頭頂有飛彈次數'
      },
  }],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      //   gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100],
      colorStops: [],
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


