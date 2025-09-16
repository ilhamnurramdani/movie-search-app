const cardContainer = document.querySelector(".movie-container");
const btnSearch = document.querySelector(".btnSearch");
const modal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const btnClose = document.querySelector(".close");

window.onload = () => {
  search("avengers");
};

function search(input) {
  cardContainer.innerHTML = "";

  if (input === "") {
    cardContainer.innerHTML = `<p style="color:white;">Silakan masukkan judul film.</p>`;
    return;
  }
  fetch(`https://www.omdbapi.com/?apikey=104df631&s=${input}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        cardContainer.innerHTML = `<p style="color:white;">judul film tidak ditemukan.</p>`;
        return;
      }
      data.Search.forEach((item, index) => {
        fetch(`http://www.omdbapi.com/?apikey=104df631&i=${item.imdbID}`)
          .then((res) => res.json())
          .then((detail) => {
            const div = document.createElement("div");
            div.classList.add("movie-card");
            div.innerHTML = `
              <img
                class="movie-poster"
                src="${detail.Poster}"
              />
              <div class="movie-info">
                <h3 class="movie-title">${detail.Title}</h3>
                <p class="">${detail.Year}</p>
                <p class="movie-rating">⭐ ${detail.imdbRating}</p>
                <button class="movie-button" data-id="${detail.imdbID}">Lihat Detail</button>
              </div>
            `;
            cardContainer.appendChild(div);

            const btnDetail = div.querySelector(".movie-button");
            btnDetail.addEventListener("click", () => {
              modalBody.innerHTML = `
                <h2>${detail.Title}</h2>
                <img src="${detail.Poster}" alt="" />
                <p>Genre : ${detail.Genre}</p>
                <p>Runtime : ${detail.Runtime}</p>
                <p>Actors : ${detail.Actors}</p>
                <p>Plot : ${detail.Plot}</p>
                `;
              modal.classList.remove("hidden");
            });
          });
      });
    });
}

btnSearch.addEventListener("click", () => {
  const input = document.querySelector(".search").value;
  search(input);
});

btnClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

