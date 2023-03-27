const watchlistResults = document.getElementById('watchlist-results')

renderWatchlist( JSON.parse(window.localStorage.getItem("watchlist")) || [])

function renderWatchlist(watchlist) {
    if (watchlist.length > 0) {
        document.getElementById('placeholder').style.display = 'none'
        watchlist.forEach(film => {
            const filmHtml = `
                <div class="film-result">
                    <img src="${film.Poster}" class="film-poster" />
                    <div class="film-info">
                        <div class="title-rating">
                            <h2>${film.Title}</h2>
                            <p><i class="fa-solid fa-star yellow"></i> ${film.imdbRating}</p>
                        </div>
                        <div class="film-details">
                            <p>${film.Runtime}</p>
                            <p>${film.Genre}</p>
                            <p id="${film.Id}">
                                <a href="#" class="remove-from-watchlist">
                                    <i class="fa fa-minus-circle" aria-hidden="true"></i> Remove
                                </a>
                            </p>
                        </div>
                        <p>${film.Plot}</p>
                    </div>
                </div>
                <hr class="divider">
            `
            watchlistResults.innerHTML += filmHtml
        })
    } else {
        document.getElementById('placeholder').style.display = 'flex'
    }
}

// listen for clicks on the watchlist results and remove the item clicked 
watchlistResults.addEventListener('click', function (event) {
    const watchlistArray = JSON.parse(window.localStorage.getItem("watchlist")) || []
    
    if ( event.target.classList.contains('remove-from-watchlist')) {
        const filmId = event.target.parentNode.id
        const updatedWatchlistArray = watchlistArray.filter(film => film.Id !== filmId)
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlistArray))

        // re-render the watchlist with the updated array
        if (updatedWatchlistArray === 0) {
            updatedWatchlistArray.length === 0
            document.getElementById('placeholder').style.display = 'flex'
        } else {
            watchlistResults.innerHTML = ''
            renderWatchlist(updatedWatchlistArray)
        }
    }
})