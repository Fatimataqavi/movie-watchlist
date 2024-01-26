const watchlistContainer= document.getElementById("watchlist-container")
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

function getWatchlistMovies(){
    if (watchlist.length > 0){
        watchlistContainer.innerHTML =""
    }
    for(id of watchlist){
        fetch(`https://omdbapi.com/?apikey=24ac2f39&i=${id}`)
        .then(res => res.json())
        .then(data => {          
            document.addEventListener("click", e => {
                    if((e.target.dataset.del || e.target.dataset.remove)  === data.imdbID){
                            let index= watchlist.indexOf(data.imdbID)
                            watchlist.splice(index, 1)
                            localStorage.setItem("watchlist", JSON.stringify(watchlist))
                            location.reload()
                        }
                    }) 
            watchlistContainer.innerHTML +=`
                    <div class="single-movie flex-items">
                    <img src=${data.Poster}/>
                    <div class="movie-detail">
                        <div class="movie-title flex-items">
                            <h3 class="name">${data.Title}</h3>
                            <p><i class="fa fa-star checked
                            aria-hidden="true"></i> ${data.imdbRating}</p>
                        </div>
                        <div class="movie-info flex-items">
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                            <p id="${data.imdbID}" data-del="${data.imdbID}"><i class="fa fa-minus-circle" data-remove="${data.imdbID}"></i>  Remove</p>
                        </div>
                        <p class="description">${data.Plot}</p>
                    </div>
                </div>`
        })
    }
}
getWatchlistMovies()