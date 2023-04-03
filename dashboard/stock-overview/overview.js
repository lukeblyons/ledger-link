const tableRows = document.querySelectorAll("#favorites-list tbody tr");

tableRows.forEach((row) => {
  row.addEventListener("click", () => {
    const ticker = row.querySelector("td:first-child").textContent;
    
    // Show the stock details (chart and news) for the clicked stock
    showStockDetails(ticker);
  });
});

function showStockDetails(ticker) {
  // Add code here to fetch stock chart data and news articles for the given ticker
  // and display them in the chart-container and news-container elements
}

function showStockDetails(ticker) {
  const chartContainer = document.querySelector(".chart-container");
  const newsContainer = document.querySelector(".news-container");
  
  // Clear the chart and news containers before displaying new data
  chartContainer.innerHTML = "";
  newsContainer.innerHTML = "";
  
  // Fetch the stock chart data
  const chartDataUrl = `https://api.example.com/charts/${ticker}`;
  fetch(chartDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch chart data.");
      }
      return response.json();
    })
    .then((chartData) => {
      // Add code here to display the chart using a charting library like Highcharts or Chart.js
      // Example: createChart(chartContainer, chartData);
    })
    .catch((error) => {
      console.error(error);
      chartContainer.innerHTML = "Failed to fetch chart data.";
    });
  
  // Fetch the stock news articles
  const newsDataUrl = `https://api.example.com/news/${ticker}`;
  fetch(newsDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch news articles.");
      }
      return response.json();
    })
    .then((newsData) => {
      // Add code here to display the news articles
      // Example: displayNews(newsContainer, newsData);
    })
    .catch((error) => {
      console.error(error);
      newsContainer.innerHTML = "Failed to fetch news articles.";
    });
}
