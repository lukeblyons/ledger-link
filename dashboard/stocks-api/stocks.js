const searchForm = document.getElementById('search-form');
const stockTickerInput = document.getElementById('stock-ticker');
const favoritesList = document.getElementById('favorites-list').querySelector('tbody');

const ALPHA_VANTAGE_API_KEY = '6OQU5XY1RI3KONVS';

// Function to fetch stock data using Alpha Vantage API
async function fetchStockData(stockTicker) {
  const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockTicker}&apikey=${ALPHA_VANTAGE_API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data['Global Quote'];
}

// Add numberWithCommas and formatMarketCap functions
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

// Calculate daily change
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

// Function to add stock to favorites list
function addStockToFavorites(stockData) {
  const newRow = favoritesList.insertRow();
  newRow.insertCell().innerText = stockData['01. symbol'];
  newRow.insertCell().innerText = 'N/A'; // Replace with stock name if available
  newRow.insertCell().innerText = stockData['05. price'];
  newRow.insertCell().innerText = stockData['09. change'];
  newRow.insertCell().innerText = formatMarketCap('N/A'); // Replace with market cap if available
  newRow.insertCell().innerText = 'N/A'; // Replace with dividend yield if available
  newRow.insertCell().innerHTML = '<button class="remove-stock">Remove</button>';

  // Add event listener to the remove button
  newRow.querySelector('.remove-stock').addEventListener('click', () => {
    newRow.remove();
    // Add logic to remove stock from the user's favorites list in the database
  });
}

// Event listener for the search form
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const stockTicker = stockTickerInput.value.toUpperCase();
  const stockData = await fetchStockData(stockTicker);

  if (stockData) {
    addStockToFavorites(stockData);
    // Add logic to save stock to the user's favorites list in the database
  } else {
    alert('Stock not found');
  }
});

// Event listener for removing stocks from the favorites list
favoritesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-stock')) {
    const stockRow = event.target.parentNode.parentNode;
    stockRow.remove();
    // Add logic to remove stock from the user's favorites list in the database
  }
});
