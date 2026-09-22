  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2026-09-22', '2026-09-21', '2026-09-18', '2026-09-17', '2026-09-16', '2026-09-15', '2026-09-14'],
      datasets: [{
        label: '美金匯率',
        data: [31.76, 31.76, 31.81, 31.88, 31.89, 31.85, 31.69],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
