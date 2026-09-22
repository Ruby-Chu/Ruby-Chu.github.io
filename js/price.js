async function loadExchangeChart() {
  const response = await fetch("./data/exg_data.json");

  if (!response.ok) {
    throw new Error(`JSON 讀取失敗：${response.status}`);
  }

  const infos = await response.json();

  // JSON 已由新到舊排序時，取前 30 筆；
  // reverse() 後圖表由舊到新呈現
  const recent30 = infos.slice(0, 30).reverse();

  const labels = recent30.map(item => item.dt);
  const exchangeRates = recent30.map(item => Number(item.exg ?? 0));

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",

    data: {
      labels: labels,
      datasets: [{
        label: "美金匯率",
        data: exchangeRates,
        borderColor: "#2470c1",
        backgroundColor: "rgba(36, 112, 193, 0.15)",
        borderWidth: 1,
        fill: false,
        // tension: 0.25
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,

          title: {
            display: true,
            text: "匯率"
          }
        },

        x: {
          ticks: {
            minRotation: 90,
            maxRotation: 90
          },
          title: {
            display: true,
            text: "日期"
          }
        }
      }
    }
  });
}

loadExchangeChart().catch(error => {
  console.error("匯率圖表載入失敗：", error);
});
