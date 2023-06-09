'use strict';

import {
    api_key,
    fetchDataFromServer
} from "./api.js";
import {
    sidebar
} from "./sidebar.js";
import {
    createMovieCard
} from "./movie-card.js";
import {
    search
} from "./search.js";

// collection genre name & url parameters from local storage
const genreName = window.localStorage.getItem("genreName")
const urlParam = window.localStorage.getItem("urlParam")

const pageContent = document.querySelector("[page-content]")


sidebar();

let currentPage = 1;
let totalPage = 0;


fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=2fe477d4bb84e836499e2e6f9871e1f6&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function ({
    results: movieList,
    total_pages
}) {

    totalPage = total_pages;

    document.title = `${genreName} Movies - THiNK FILMS`

    const movieListElem = document.createElement("section")
    movieListElem.classList.add("movie-list", "genre-list");

    movieListElem.ariaLabel = `${genreName} Movies`
    movieListElem.innerHTML = `

<div class="title-wrapper">
    <h1 class="heading">All ${genreName} Movies</h1>
</div>

    <div class="grid-list"></div>

<button class="btn load-more" load-more>Load More</button>

    `;

    // Add movie card based on fetched item
    for (const movie of movieList) {
        const movieCard = createMovieCard(movie)

        movieListElem.querySelector(".grid-list").appendChild(movieCard)

    }
    pageContent.appendChild(movieListElem)


    // Load More button functionality
    document.querySelector("[load-more]").addEventListener("click", function () {

        if (currentPage >= totalPage) {
            this.style.display = "none" // this === loading btn
            return;
        }

        currentPage++;
        this.classList.add("loading");


        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=2fe477d4bb84e836499e2e6f9871e1f6&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({
            results: movieList
        }) => {
            this.classList.remove("loading");

            for (const movie of movieList) {
                const movieCard = createMovieCard(movie)

                movieListElem.querySelector(".grid-list").appendChild(movieCard)

            }
        })

    })


})


search();