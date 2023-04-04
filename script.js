const API_KEY = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";
const currentDate = new Date().toISOString().split("T")[0];

function getCurrentImageOfTheDay() {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`
  )
    .then((response) => response.json())
    .then((data) => {
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}" width="500">
                <p>${data.explanation}</p>
            `;
    })
    .catch((error) => console.error(error));
}

function getImageOfTheDay(date) {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
    .then((response) => response.json())
    .then((data) => {
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}" width="500">
                <p>${data.explanation}</p>
            `;
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => console.error(error));
}

function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory() {
  const searchHistory = document.getElementById("search-history");
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searchHistory.innerHTML = "";
  for (let i = searches.length - 1; i >= 0; i--) {
    const li = document.createElement("li");
    li.textContent = searches[i];
    li.addEventListener("click", () => getImageOfTheDay(searches[i]));
    searchHistory.appendChild(li);
  }
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const date = searchInput.value;
  getImageOfTheDay(date);
  searchInput.value = "";
});

addSearchToHistory();