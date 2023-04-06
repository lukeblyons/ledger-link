const API_KEY = '6OQU5XY1RI3KONVS';
const API_BASE_URL = 'https://www.alphavantage.co/query?';

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const stockTicker = document.getElementById('stock-ticker').value.toUpperCase();
  addStockToFavoriteList(stockTicker);
});

document.querySelector('#getRandomTickerButton').addEventListener('click', () => {
  fetch('/getRandomTicker')
    .then(response => response.json())
    .then(data => {
      addStockToFavoriteList(data.ticker);
      document.querySelector('#ticker').innerHTML = `Added ${data.ticker} to favorites list.`;
    })
    .catch(error => {
      console.log(error);
    });
});

async function addStockToFavoriteList(stockTicker) {
  // Default tickers
  const defaultTickers = ['AAPL', 'META', 'TSLA'];
  
  // If the stock ticker is not provided, use default tickers
  if (!stockTicker) {
    for (const ticker of defaultTickers) {
      await addStockToFavoriteList(ticker);
    }
    return;
  }
  
  const stockInfo = await getStockInfo(stockTicker);
  if (!stockInfo) return;
  const favoritesList = document.getElementById('favorites-list').getElementsByTagName('tbody')[0];

  const newRow = favoritesList.insertRow();
  newRow.innerHTML = `
    <td>${stockInfo.ticker}</td>
    <td>${stockInfo.name}</td>
    <td>${stockInfo.price}</td>
    <td style="color: ${stockInfo.dailyChange >= 0 ? 'green' : 'red'}">${stockInfo.dailyChange} ${stockInfo.dailyChange >= 0 ? '<i class="fi fi-rr-angle-small-up"></i>' : '<i class="fi fi-rr-angle-small-down"></i>'}</td>
    <td>${stockInfo.marketCap}</td>
    <td>${stockInfo.dividendYield}</td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
  `;

  sortTable(favoritesList);
}


async function getStockInfo(stockTicker) {
  try {
    const overviewUrl = `${API_BASE_URL}function=OVERVIEW&symbol=${stockTicker}&apikey=${API_KEY}`;
    const dailyUrl = `${API_BASE_URL}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockTicker}&apikey=${API_KEY}`;

    const [overviewResponse, dailyResponse] = await Promise.all([
      fetch(overviewUrl),
      fetch(dailyUrl),
    ]);

    const [overviewData, dailyData] = await Promise.all([
      overviewResponse.json(),
      dailyResponse.json(),
    ]);

    if (!overviewData.Name || !dailyData['Time Series (Daily)']) {
      alert('Invalid stock ticker or error fetching data. Please try again.');
      return null;
    }

    const dailyTimeSeries = dailyData['Time Series (Daily)'];
    const latestDate = Object.keys(dailyTimeSeries)[0];
    const latestData = dailyTimeSeries[latestDate];

    const stockInfo = {
      ticker: stockTicker,
      name: overviewData.Name,
      price: `$${parseFloat(latestData['4. close']).toFixed(2)}`,
      dailyChange: `${(((parseFloat(latestData['4. close']) - parseFloat(latestData['1. open'])) / parseFloat(latestData['1. open'])) * 100).toFixed(2)}%`,
      marketCap: formatMarketCap(parseInt(overviewData.MarketCapitalization)),
      dividendYield: `${(parseFloat(overviewData.DividendYield) * 100).toFixed(2)}%`,
    };

    return stockInfo;
  } catch (error) {
    console.error('Error fetching stock info:', error);
    return null;
  }
}



function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function sortTable(tbody) {
  const rows = Array.from(tbody.rows);
  rows.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText));
  rows.forEach(row => tbody.appendChild(row));
}

function formatMarketCap(marketCap) {
  const trillion = 1000000000000;
  const billion = 1000000000;
  const million = 1000000;

  if (marketCap >= trillion) {
    return `$${(marketCap / trillion).toFixed(2)}T`;
  } else if (marketCap >= billion) {
    return `$${(marketCap / billion).toFixed(2)}B`;
  } else if (marketCap >= million) {
    return `$${(marketCap / million).toFixed(2)}M`;
  } else {
    return `$${marketCap}`;
  }
}

addStockToFavoriteList('');
