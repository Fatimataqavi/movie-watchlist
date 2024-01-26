const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
let moviesContainer = document.getElementById("movies-list")
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
let moviesId = []

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    getMovieItem(searchInput.value)
    searchInput.value =""
})

function getMovieItem(movie){
    fetch(`https://omdbapi.com/?apikey=24ac2f39&s=${movie}`)
    .then (res=>res.json())
    .then (data => {
      //console.log(data.Search) 
    if(data.Search){
        for (let i= 0; i< data.Search.length ; i++){
            moviesId.push(data.Search[i].imdbID)  
         } 
    }else{
        moviesContainer.innerHTML=`
        <div class="error"><h2>Unable to find what you're looking for. Please try another search.</h2></div>`
    }
    })
    .then(()=>{
        for(let i=0; i< moviesId.length; i++){
            fetch(`https://www.omdbapi.com/?apikey=24ac2f39&i=${moviesId[i]}`)
            .then(res => res.json())
            .then(data => {
                moviesId= []
                    document.addEventListener("click", e => {
                        if((e.target.dataset.text || e.target.dataset.icon)  === `${data.imdbID}`){
                            watchlist.push(e.target.dataset.text)
                            localStorage.setItem("watchlist", JSON.stringify(watchlist))
                            document.getElementById(`${data.imdbID}`).innerHTML = `
                            <p class="added-movie">Added</p>`
                        }   
                    }) 
                            
                 moviesContainer.innerHTML +=`
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
                            <p id="${data.imdbID}" data-text="${data.imdbID}"><i class="fa fa-plus-circle" data-icon="${data.imdbID}"></i>  Watchlist</p>
                        </div>
                        <p class="description">${data.Plot}</p>
                    </div>
                </div>
            `
        })
       }
    })
     searchInput.value = ""
     moviesContainer.innerHTML = ""  
}     

   