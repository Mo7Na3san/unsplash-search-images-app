const accessKey = "Mh4msjLCDTxd8owVMva2LSjYkAdSyh8H5sVv94pstfQ";

const formEl = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");
const searchBtn = document.getElementById("search-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data);
  const results = data.results;
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("search-result");
    const photo = document.createElement("img");
    photo.src = result.urls.small;
    photo.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    // imgLink.textContent = result.alt_description; //if you want to show alt description
    imgLink.appendChild(photo);
    newDiv.appendChild(imgLink);
    searchResults.appendChild(newDiv);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
