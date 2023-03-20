const form = document.getElementById('film-search');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn')
const apiKey = "678402f2"

form.addEventListener('submit', async () => {
    event.preventDefault()
    
    const searchQuery = searchInput.value
    const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`)
    const data = await res.json()
    
    let html = ""
    if (!data.Search > 0) {
        document.querySelector('.placeholder').innerHTML = `
        <h3>Unable to find what you’re looking for. Please try another search.</h3>
        `
    } else {

        // Handle API response data here
        for (let film of data.Search) {
            // console.log(film.imdbID)
            const res = await fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=678402f2`)
            const imdbID = await res.json()
            
            document.getElementById('placeholder').innerHTML = `
            <div class="loading">
            <h3>Searching for films</h3>
                <img src="images/loading.svg">
            </div>
            `
            
            html += `
                <div class="film-result">
                    <img src="${imdbID.Poster}" class="film-poster" />
                    <div class="film-info">
                        <div class="title-rating">
                            <h2>${imdbID.Title}</h2>
                            <p><i class="fa-solid fa-star yellow"></i> ${imdbID.imdbRating}</p>
                        </div>
                        <div class="film-details">
                            <p>${imdbID.Runtime}</p>
                            <p>${imdbID.Genre}</p>
                            <p id="watchlist" data-id=${imdbID.imdbID}><a><i class="fa fa-plus-circle" aria-hidden="true"></i> Watchlist</a></p>
                        </div>
                        <p>${imdbID.Plot}</p>
                    </div>
                </div>
                    <hr class="divider">
                `
        }
        document.getElementById('search-results').innerHTML = html
    }
})



