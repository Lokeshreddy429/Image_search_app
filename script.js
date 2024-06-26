const accessKey = "yqT5nchk1Xl926ckkiRIzzADsK4oeL_-WSuGAZyDkUc";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
let isLoading = false;

async function searchImages() {
  if (isLoading) return;
  isLoading = true;

  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    if (results.length > 0) {
      page++;
      showMore.style.display = "block";
    } else {
      showMore.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading = false;
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

searchButton.addEventListener("click", () => {
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
