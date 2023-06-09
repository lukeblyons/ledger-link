const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
  
    res.send('Signup successful');
});
  

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.send('Login successful');
});

const stockTickers = [
  'MSFT', 'GOOGL', 'FB', 'NVDA', 'ADBE', 'PYPL', 'V', 'MA', 'CRM', 'CSCO',
  'INTC', 'AVGO', 'QCOM', 'TXN', 'FIS', 'ACN', 'ORCL', 'IBM', 'UBER', 'LYFT',
  'BLK', 'GS', 'JPM', 'BAC', 'C', 'WFC', 'AXP', 'VZ', 'T', 'TMUS', 'AMT',
  'CCI', 'SBAC', 'NEE', 'D', 'SO', 'DUK', 'PCG', 'EXC', 'AEP', 'AES', 'ED',
  'ETR', 'NEE', 'AON', 'MMC', 'SPGI', 'MSCI', 'ICE', 'NDAQ', 'TRI'
];


app.get('/getRandomTicker', (req, res) => {

  const randomIndex = Math.floor(Math.random() * stockTickers.length);
  const randomTicker = stockTickers[randomIndex];
  res.json({ ticker: randomTicker });
});


app.get('/client/html/landing.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/landing.html'));
})

app.get('/client/html/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/dashboard.html'));
})

app.get('/client/html/otp.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/otp.html'));
})

app.get('/client/html/news.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/news.html'));
})

// CSS
app.get('/client/css/buttons.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/buttons.css'));
});

app.get('/client/css/cards.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/cards.css'));
});

app.get('/client/css/dashboard.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/dashboard.css'));
});

app.get('/client/css/logo.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/logo.css'));
});

app.get('/client/css/otp.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/otp.css'));
});

app.get('/client/css/signup-form.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/signup-form.css'));
});

app.get('/client/css/star.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/star.css'));
});

app.get('/client/css/stocks.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/stocks.css'));
});

app.get('/client/css/news.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/css/news.css'));
});

// JS
app.get('/client/frontend-js/buttons.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/buttons.js'));
});

app.get('/client/frontend-js/dashboard.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/dashboard.js'));
});

app.get('/client/frontend-js/otp.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/otp.js'));
});

app.get('/client/frontend-js/signup-form.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/signup-form.js'));
});

app.get('/client/frontend-js/star.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/star.js'));
});

app.get('/client/frontend-js/stocks.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/stocks.js'));
});

app.get('/client/frontend-js/news.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/frontend-js/news.js'));
});





const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
