import showModal from './utils.js'

const searchForm = document.getElementById('film-search')
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')
const placeholder = document.getElementById('placeholder')
const apiKey = "678402f2"

searchForm.addEventListener('submit', searchFilms)

async function searchFilms(event) {
    event.preventDefault()

    // Gather initial API response data
    const searchQuery = searchInput.value
    const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`)
    const data = await res.json()

    if (data.Response === "False") {
        searchResults.style.display = 'none'
        placeholder.style.display = 'flex'
        placeholder.innerHTML = `<h3>${data.Error} Please try again.</h3>`
    } else {
        searchResults.style.display = 'block'
        placeholder.style.display = 'none'
        renderFilms(data)
    }
}

async function renderFilms(results) {
    let html = ""

    // Handle API response data here
    for (let result of results.Search) {
        const res = await fetch(`https://www.omdbapi.com/?i=${result.imdbID}&apikey=678402f2`)
        const film = await res.json()

        const filmObject = {
            Title: film.Title,
            Poster: film.Poster,
            imdbRating: film.imdbRating,
            Runtime: film.Runtime,
            Genre: film.Genre,
            Plot: film.Plot,
            Id: film.imdbID
        }
        const { Title, Poster, imdbRating, Runtime, Genre, Plot, Id } = filmObject
        html += `
                <div class="film-result">
                    <img src="${Poster}" class="film-poster" />
                    <div class="film-info">
                        <div class="title-rating">
                            <h2>${Title}</h2>
                            <p><i class="fa-solid fa-star yellow"></i> ${imdbRating}</p>
                        </div>
                        <div class="film-details">
                            <p>${Runtime}</p>
                            <p>${Genre}</p>
                            <p id="${Id}">
                                <a href="#" class="add-to-watchlist">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i> Watchlist
                            </a>
                            </p>
                        </div>
                        <p>${Plot}</p>
                    </div>
                </div>
                <hr class="divider">
                                `
    }
    searchResults.innerHTML = html
}

searchResults.addEventListener('click',  addToWatchlist)

function addToWatchlist(event) {
    const watchlistArray = JSON.parse(localStorage.getItem("watchlist")) || []
        if (event.target.classList.contains('add-to-watchlist')) {
            const filmId = event.target.parentNode.id
            fetch(`https://www.omdbapi.com/?i=${filmId}&apikey=${apiKey}`)
            .then((res) => res.json())
            .then(film => {
                const filmObject = {
                Title: film.Title,
                Poster: film.Poster,
                imdbRating: film.imdbRating,
                Runtime: film.Runtime,
                Genre: film.Genre,
                Plot: film.Plot,
                Id: film.imdbID
            }
            watchlistArray.push(filmObject)
            showModal(filmObject)
            localStorage.setItem("watchlist", JSON.stringify(watchlistArray))    
        })}
}