async function loadExchangeChart() {
  const response = await fetch("./data/exg_data.json");

  if (!response.ok) {
    throw new Error(`JSON 讀取失敗：${response.status}`);
  }

  const data = await response.json();
  const exg2 = (data.exg_2 ?? []).slice(0, 30).reverse();
  const exg3 = (data.exg_3 ?? []).slice(0, 30).reverse();

  // JSON 已由新到舊排序時，取前 30 筆；
  // reverse() 後圖表由舊到新呈現
  // const recent30 = infos.slice(0, 30).reverse();

  const labels = exg2.map(item => item.dt);
  // const exchangeRates = recent30.map(item => Number(item.exg ?? 0));

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",

    data: {
      labels: labels,
      datasets: [
        {
          label: "美元匯率",
          data: exg2.map(item => Number(item.exg ?? 0)),
          borderColor: "#2470c1",
          borderWidth: 1,
          tension: 0.25,
          yAxisID: "yUSD"
        },
        {
          label: "人民幣匯率",
          data: exg3.map(item => Number(item.exg ?? 0)),
          borderColor: "#e67e22",
          borderWidth: 1,
          tension: 0.25,
          yAxisID: "yHKD"
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            minRotation: 90,
            maxRotation: 90
          },
          title: {
            display: true,
            text: "日期"
          }
        },
        yUSD: {
          type: "linear",
          position: "left",
          beginAtZero: false,

          title: {
            display: true,
            text: "美元匯率"
          }
        },
        yHKD: {
          type: "linear",
          position: "right",
          beginAtZero: false,

          title: {
            display: true,
            text: "港幣匯率"
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
}

loadExchangeChart().catch(error => {
  console.error("匯率圖表載入失敗：", error);
});
