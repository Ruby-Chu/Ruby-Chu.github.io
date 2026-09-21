function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

async function loadChart() {
  const response = await fetch("mnd_data.json");
  if (!response.ok) {
    throw new Error(`JSON 讀取失敗：${response.status}`);
  }
  const infos = await response.json();
  // 建立：日期 -> 資料 的索引
  const dataByDate = new Map(
    infos.map(item => [item.dt, item])
  );

  // 今天；未來即使資料尚未寫入，也會有預設 0
  const todayText = formatDate(new Date());

  const emptyData = {
    dt: todayText,
    fighter: 0,
    enter_fighter: 0,
    warship: 0,
    officialship: 0,
    balloon: 0,
    missile: 0
  };

// 本日資料：若資料庫沒有今天，所有數值為 0
const latest = {
  ...emptyData,
  ...(dataByDate.get(todayText) ?? {})
};

// 產生今天往前 6 天，共 7 天；依日期由新到舊排序
const last7Days = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);

  const dt = formatDate(date);

  return {
    ...emptyData,
    dt,
    ...(dataByDate.get(dt) ?? {})
  };
});



  // const latest = infos[0] ?? {};
  // const fighter = Number(latest.fighter ?? 0);
  // const enterFighter = Number(latest.enter_fighter ?? 0);

  // const enterRate = fighter > 0 ? Math.round((enterFighter / fighter) * 100) : 0;
const fighter = Number(latest.fighter ?? 0);
const enterFighter = Number(latest.enter_fighter ?? 0);

const enterRate = fighter > 0
  ? Math.round((enterFighter / fighter) * 100)
  : 0;

const toChartData = (fieldName) =>
  last7Days.map(item => ({
    x: item.dt,
    y: Number(item[fieldName] ?? 0)
  }));

  // const toChartData = (fieldName) =>
  //   infos.map(item => ({
  //     x: item.dt,
  //     y: Number(item[fieldName] ?? 0)
  //   }));

  // chart 1
  var options1 = {
    series: [enterRate],
    chart: {
      height: 350,
      type: 'gauge',
    },
    title: {
      text: latest.dt ?? "無最新資料",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        bands: [
          { from: 0, to: 100, color: '#FF4560' },
        ],
        bandsStyle: {
          strokeWidth: '60%',
          gap: 2,
        },
        hollow: {
          margin: 0,
          size: '60%',
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 8,
            fontSize: '24px',
            fontWeight: 700,
            formatter: function (val) {
              return val + '%'
            },
          },
        },
      },
    },
    fill: { opacity: 0.8 },
    labels: ['逾越比率'],
  } // options1
  const chart1 = new ApexCharts(
  document.querySelector("#chart1"),
  options1
  );
  chart1.render();

  // chart 2
  const options2 = {
    series: [
      {
        name: "共機",
        data: toChartData("fighter")
      },
      {
        name: "共機逾越",
        data: toChartData("enter_fighter")
      },
      {
        name: "共艦",
        data: toChartData("warship")
      },
      {
        name: "公務船",
        data: toChartData("officialship")
      },
      {
        name: "氣球",
        data: toChartData("balloon")
      },
      {
        name: "飛彈",
        data: toChartData("missile")
      }
    ],
    chart: {
      height: 350,
      type: "heatmap"
    },

    dataLabels: {
      enabled: true
    },

    colors: ["#2470c1"],

    title: {
      text: "近 7 日資料"
    }
  }; // option2

  const chart2 = new ApexCharts(
    document.querySelector("#chart2"),
    options2
  );
  chart2.render();
}

async function loadChart2() {
  // chart 3
  const DAY = 86400000;
  const calEnd = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  );

  const calStart = calEnd - 364 * DAY;
  function parseUtcDate(dateText) {
    return new Date(`${dateText}T00:00:00Z`).getTime();
  }

  function weekStartOf(ms) {
    return ms - new Date(ms).getUTCDay() * DAY;
  }

  function buildCalendar(infos) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const byDay = weekdays.map(name => ({
      name,
      data: []
    }));

    // 建立「日期 -> 當日資料」索引
    const dataByDate = new Map(
      infos.map(item => [item.dt, item])
    );
    for (let t = calStart; t <= calEnd; t += DAY) {
      const dateText = new Date(t).toISOString().slice(0, 10);
      const item = dataByDate.get(dateText) ?? {};

      const fighter = Number(item.fighter ?? 0);
      const enterFighter = Number(item.enter_fighter ?? 0);
      const warship = Number(item.warship ?? 0);
      const missile = Number(item.missile ?? 0);
      const balloon = Number(item.balloon ?? 0);

      // Heatmap 色階依此總數顯示
      const total = fighter + warship + missile + balloon;

      // 共機為 0 時，避免除以 0
      const enterRate = fighter > 0
        ? (enterFighter / fighter) * 100
        : 0;

      const dow = new Date(t).getUTCDay();

      byDay[dow].data.push({
        x: weekStartOf(t),
        y: total,
        date: t,

        // 保留 Tooltip 要顯示的細項
        fighter,
        enterFighter,
        enterRate,
        warship,
        missile,
        balloon
      });
    }
    return byDay.reverse();
  }
  const response = await fetch("mnd_data.json");
  const infos = await response.json();
  const calendarData = buildCalendar(infos);
  var calMinX = weekStartOf(calStart) - 3.5 * DAY
  var calMaxX = weekStartOf(calEnd) + 3.5 * DAY
  var options3 = {
    series: calendarData,
    chart: {
      height: 250,
      width: '100%',
      type: 'heatmap',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    title: {
      text: '近一年內的資訊',
      align: 'center',
      style: { fontSize: '14px', fontWeight: 600 },
    },
    dataLabels: { enabled: false },
    // A small light gap between cells, like a contributions calendar.
    stroke: { width: 3, colors: ['#fff'] },
    legend: { show: false },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    plotOptions: {
      heatmap: {
        radius: 2,
        // Flat bucket colors (no within-range shading), so each level is one color.
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, name: '0', color: '#ebedf0' },
            { from: 1, to: 20, name: '1-20', color: '#9be9a8' },
            { from: 21, to: 50, name: '21-50', color: '#001eff82' },
            { from: 51, to: 100, name: '51-100', color: '#ff01aa74' },
            { from: 101, to: 300, name: '100+', color: '#ff0000c3' },
          ],
        },
      },
    },
    xaxis: {
      type: 'datetime',
      min: calMinX,
      max: calMaxX,
      position: 'top',
      labels: {
        format: 'MMM',
        datetimeUTC: false,
        style: { colors: '#767676', fontSize: '12px' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      // Show only alternate weekday labels (Mon / Wed / Fri), like the original.
      labels: {
        formatter: function (val) {
          return ['Mon', 'Wed', 'Fri'].indexOf(val) >= 0 ? val : ''
        },
        style: { colors: ['#767676'], fontSize: '12px' },
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
    custom: function (opts) {
      const pt = opts.w.config.series[opts.seriesIndex]
        .data[opts.dataPointIndex];

      const when = new Date(pt.date).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timeZone: "UTC"
      });

      return `
        <div style="
          padding:8px 12px;
          font-size:8px;
          line-height:1;
          background: rgba(255, 255, 255, 0.65);
          color: #222;
          border-radius: 6px;
        ">
          <b>${when}</b><br>
          共機：${pt.fighter} 架
          （逾越：${pt.enterFighter} 架，${pt.enterRate.toFixed(1)}%）<br>
          共艦：${pt.warship} 艘<br>
          飛彈：${pt.missile} 枚<br>
          氣球：${pt.balloon} 顆<br>
          <hr style="margin:4px 0; border:0; border-top:1px solid #ddd">
          合計：${pt.y}
        </div>
      `;
    }
  },
  }

  // var chart3 = new ApexCharts(document.querySelector('#chart3'), options3)
  // chart3.render()
  const chart3 = new ApexCharts(
    document.querySelector("#chart3"),
    options3
  );
  chart3.render();
}

loadChart().catch(error => {
  console.error("圖表建立失敗：", error);
});

loadChart2().catch(error => {
  console.error("圖表建立失敗：", error);
});













