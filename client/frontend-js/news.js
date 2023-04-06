const ALPHA_VANTAGE_API_KEY = '6OQU5XY1RI3KONVS';
const NEWS_API_KEY = '456fc36ea18f44a8bf5fed7e5cebbd40';

let articles;
let currentArticleIndex = 0;

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const companyName = document.getElementById('company-name').value;
  
  fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${ALPHA_VANTAGE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const bestMatch = data.bestMatches[0];
      const symbol = bestMatch['1. symbol'];
      
      return fetch(`https://newsapi.org/v2/everything?q=${symbol}&apiKey=${NEWS_API_KEY}`);
    })
    .then(response => response.json())
    .then(data => {
      articles = data.articles;
      currentArticleIndex = 0;
      displayArticles();
    })
    .catch(error => {
      console.log(error);
    });
});

const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
  displayArticles();
});

function displayArticles() {
  const newsContainer = document.getElementById('news-container');
  const endIndex = currentArticleIndex + 5;
  
  for (; currentArticleIndex < endIndex && currentArticleIndex < articles.length; currentArticleIndex++) {
    const article = articles[currentArticleIndex];
    const newsArticle = document.createElement('div');
    newsArticle.className = 'news-article';
    newsArticle.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsArticle);
  }
}




document.querySelector(".fi-rr-apps").addEventListener("click", function() {
	const dropdownMenu = document.querySelector(".dropdown-menu");
	const menuIcon = document.querySelector(".fi-rr-apps");

	if (dropdownMenu.style.display === "block") {
		dropdownMenu.style.display = "none";
		menuIcon.classList.remove("active");
	} else {
		dropdownMenu.style.display = "block";
		menuIcon.classList.add("active");
	}
});

// Optional: Close the dropdown menu when clicking outside of it
window.addEventListener("click", function(event) {
	if (!event.target.matches(".fi-rr-apps")) {
		const dropdownMenu = document.querySelector(".dropdown-menu");
		const menuIcon = document.querySelector(".fi-rr-apps");
		dropdownMenu.style.display = "none";
		menuIcon.classList.remove("active");
	}
});

