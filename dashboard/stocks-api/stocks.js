// Event listeners
document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const stockTicker = document.getElementById('stock-ticker').value.toUpperCase();
  const stockData = await fetchStockData(stockTicker);
  if (stockData) {
    addToFavorites(stockData);
  }
});

// API-related functions
async function fetchStockData(ticker) {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=yourapikey`);
  const data = await response.json();
  if (data.length === 0) {
    alert('Invalid ticker symbol. Please try again.');
    return null;
  }
  const stockData = {
    ticker: data[0].symbol,
    name: data[0].name,
    price: data[0].price,
    marketCap: data[0].marketCap,
    dividendYield: data[0].lastAnnualDividend,
    dailyData: null
  };
  const dailyResponse = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=yourapikey`);
  const dailyData = await dailyResponse.json();
  if (dailyData.historical.length < 2) {
    alert('Error fetching stock data. Please try again later.');
    return null;
  }
  stockData.dailyData = dailyData.historical.slice(0, 2);
  return stockData;
}

function calculateDailyChange(dailyData) {
  const currentDayClose = parseFloat(dailyData[0].close);
  const previousDayClose = parseFloat(dailyData[1].close);
  const percentageChange = ((currentDayClose - previousDayClose) / previousDayClose) * 100;

  return {
    percentageChange: percentageChange,
    arrowIcon: percentageChange >= 0 ? '<i class="fi fi-ts-angle-double-small-up"></i>' : '<i class="fi fi-ts-angle-double-small-down"></i>',
    textColor: percentageChange >= 0 ? 'green' : 'red'
  };
}



// Favorites-related functions
async function addToFavorites(stockData, userId) {
  const { percentageChange, arrowIcon, textColor } = calculateDailyChange(stockData.dailyData);
  
  // Add the stock to the user's favorites in the database
  await addFavoriteStock(userId, stockData.ticker, stockData.name, stockData.price, percentageChange, stockData.marketCap, stockData.dividendYield);
  
  const favoritesList = document.getElementById('favorites-list').getElementsByTagName('tbody')[0];
  const tableRow = document.createElement('tr');
  tableRow.id = stock-${stockData.ticker};
  
  const tickerCell = document.createElement('td');
  tickerCell.innerText = stockData.ticker;
  tableRow.appendChild(tickerCell);
  
  const nameCell = document.createElement('td');
  nameCell.innerText = stockData.name;
  tableRow.appendChild(nameCell);
  
  const priceCell = document.createElement('td');
  priceCell.innerText = $${numberWithCommas(parseFloat(stockData.price).toFixed(2))};
  tableRow.appendChild(priceCell);
  
  const dailyChangeCell = document.createElement('td');
  dailyChangeCell.innerHTML = <span style="color:${textColor};">${arrowIcon} ${percentageChange.toFixed(2)}%</span>;
  tableRow.appendChild(dailyChangeCell);
  
  const marketCapCell = document.createElement('td');
  marketCapCell.innerText = $${formatMarketCap(stockData.marketCap)};
  tableRow.appendChild(marketCapCell);
  
  const dividendYieldCell = document.createElement('td');
  dividendYieldCell.innerText = ${(parseFloat(stockData.dividendYield) * 100).toFixed(2)}%;
  tableRow.appendChild(dividendYieldCell);
  
  const actionCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', async () => {
  await removeFavoriteStock(stockData.ticker); // Use the stockId instead of the ticker once you have it
  deleteFromFavorites(stockData.ticker);
  });
  actionCell.appendChild(deleteButton);
  tableRow.appendChild(actionCell);
  
  favoritesList.appendChild(tableRow);
  
  sortFavoritesList();
  }
  
  function deleteFromFavorites(ticker) {
  const listItem = document.getElementById(stock-${ticker});
  listItem.remove();
  }
  
  function sortFavoritesList() {
  const favoritesList = document.getElementById('favorites-list').getElementsByTagName('tbody')[0];
  const rows = Array.from(favoritesList.getElementsByTagName('tr'));
  
  rows.sort((a, b) => {
  const tickerA = a.cells[0].innerText;
  const tickerB = b.cells[0].innerText;
  return tickerA.localeCompare(tickerB);
});

favoritesList.innerHTML = '';

for (const row of rows) {
favoritesList.appendChild(row);
}
}



// Helper functions
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function formatMarketCap(marketCap) {
  const value = parseFloat(marketCap);
  
  if (value >= 1e12) {
  return (value / 1e12).toFixed(2) + 'T';
  } else if (value >= 1e9) {
  return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
  return (value / 1e6).toFixed(2) + 'M';
  } else {
  return numberWithCommas(value.toFixed(2));
  }
  }
  
  (async function loadFavorites() {
  const userId = 'your_user_id'; // Replace this with the actual user ID after implementing authentication
  const favoriteStocks = await getFavoriteStocks(userId);
  
  for (const stockData of favoriteStocks) {
  addToFavorites(stockData, userId);
  }
  })();
  
  async function addFavoriteStock(userId, ticker, name, price, percentageChange, marketCap, dividendYield) {
  try {
  const response = await fetch('your-add-favorite-api-url', {
  method: 'POST',
  body: JSON.stringify({ userId, ticker, name, price, percentageChange, marketCap, dividendYield }),
  headers: {
  'Content-Type': 'application/json'
  }
  });

  if (!response.ok) {
    throw new Error('Error adding favorite stock');
  }
} catch (error) {
  console.error('Error:', error);
  }
  }
  
  async function removeFavoriteStock(stockId) {
  try {
  const response = await fetch(your-remove-favorite-api-url/${stockId}, {
  method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error removing favorite stock');
  }
  } catch (error) {
console.error('Error:', error);
}
}

async function getFavoriteStocks(userId) {
try {
const response = await fetch(your-get-favorite-api-url/${userId});
if (!response.ok) {
throw new Error('Error getting favorite stocks');
}
const favoriteStocks = await response.json();
return favoriteStocks;
} catch (error) {
console.error('Error:', error);
return [];
}
}