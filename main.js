const buttonSearch  = document.querySelector('#movie__button')
const inputSearch = document.querySelector('#input')
const movieList = document.querySelector('.movie-list')
const movieItem = document.querySelector('.movie__item')
const movie = document.querySelector('.movie')
const modal = document.querySelector('.modal')
const closeBtn = document.querySelector('#close')


buttonSearch.addEventListener('click', function(event){
    event.preventDefault()
    if (inputSearch.value){   
        addItem(inputSearch.value)  
        clearInput()
    }
})


movieList.addEventListener('click', function(event){
    const clickedElement = event.target;

    if(clickedElement.matches('.movie__item')){
        const id = clickedElement.id  //id карточки

        fetch(`https://www.omdbapi.com/?i=${id}&apikey=36dbc6ee`)
        .then(response => response.json())
        .then(res =>{
            const item = `
                    <div class="modal__box">
                        <div class="movie__row-content">
                            <div class="movie__col">
                                <img class="movie__row-img" src="${res.Poster}" alt="">
                            </div>
                            <div class="movie__col">
                                <div class="movie__title movie__title_page">${res.Title}</div>
                                <div id="movie__info-year" class="movie__info_page movie__info-low-margin">Год: <span class="movie-span__info">${res.Year}</span></div>
                                <div id="movie__info-rating" class="movie__info_page movie__info-low-margin">Рейтинг: <span class="movie-span__info">${res.imdbRating}</span></div>
                                <div id="movie__info-date" class="movie__info_page movie__info-low-margin">Дата выхода: <span class="movie-span__info">${res.Released}</span></div>
                                <div id="movie__info-duration" class="movie__info_page movie__info-low-margin">Продолжительность: <span class="movie-span__info">${res.Runtime}</span></div>
                                <div id="movie__info-genre" class="movie__info_page movie__info-low-margin">Жанр: <span class="movie-span__info">${res.Genre}</span></div>
                                <div id="movie__info-director" class="movie__info_page movie__info-low-margin">Режиссер: <span class="movie-span__info">${res.Director}</span></div>
                                <div id="movie__info-script" class="movie__info_page movie__info-low-margin">Сценарий: <span class="movie-span__info">${res.Writer}</span></div>
                                <div id="movie__info-actors" class="movie__info_page movie__info-low-margin">Актеры: <span class="movie-span__info">${res.Actors}</span></div>       
                            </div>
                            <button id="close" class="movie__row-button">
                               <img src="./close.svg" alt="">
                            </button>
                        </div>
                        <div class="movie__description">${res.Plot}</div>
                    </div>
                `
            modal.innerHTML = item;
            modal.classList.add('open')

        })
    }
});

modal.addEventListener('click',function(event){
    const clickedElement = event.target;
    if(clickedElement.matches('#close')){
        modal.classList.remove('open')
    }
})


function clearInput(){
    inputSearch.value = '';
}
function addItem(value){
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=36dbc6ee`)
    .then(response => response.json())
    .then(res => {   
        const object = res.Search
        const result = object.map((element) => {
            return `
                <li id = '${element.imdbID}' class="movie__item">
                    <img class = 'movie__img' src="${element.Poster}" alt="">
                    <div class="movie__item-content">
                        <h3 class="movie__title">${element.Title}</h3>
                        <div class="movie__data">${element.Year}</div>
                        <div class="movie__type">${element.Type}</div>
                    </div>
                </li>`;    
        })
            movieList.innerHTML = result.join('')
    })
    .catch(err => {
        console.log(err)
        movieList.innerHTML = 
            `
            <li class="movie__item-active">
                <h3 class="movie__title">Такого нет! Попробуйте ещё раз</h3> 
            </li>

        `
     }) 
}


