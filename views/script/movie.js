var movie;

function getMovie(){

    buildHeader();

    var xhr = new XMLHttpRequest();                         
    xhr.open('GET', document.location);                                      
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {                        
            if(xhr.status == 200) {  
                movie = JSON.parse(xhr.getResponseHeader('movie'));                            
                showMovieInfo();
            }
        }
    };
    xhr.send();
}

function showMovieInfo(){
    let mainSection = document.getElementById("main-section"); 
    let movieTitle = getMovieTitle();

    let mainInfo = document.createElement('div');
    mainInfo.className = 'main-info';
    let moviePicture = getMoviePicture();
    let mainContent = createMainContent();
    let cast = createCast();
    
    let middleInfo = getMiddleInfo();

    let bottomInfo = getBottomInfo();

    mainInfo.appendChild(moviePicture);
    mainInfo.appendChild(mainContent);
    mainInfo.appendChild(cast);

    mainSection.appendChild(movieTitle);
    mainSection.appendChild(mainInfo);
    mainSection.appendChild(middleInfo);
    mainSection.appendChild(bottomInfo);
}

function getMiddleInfo(){

    let middleInfo = document.createElement('div');
    middleInfo.className = 'main-info';

    let synopsis = document.createElement('div');
    synopsis.className = 'synopsis';

    synopsis.appendChild(createH2('Sinopse:'));
    synopsis.appendChild(createParagraph(movie.Synopsis));

    middleInfo.appendChild(synopsis);

    let mediumRating = createMediumRating();
    middleInfo.appendChild(mediumRating);

    let rating = createRating();
    middleInfo.appendChild(rating);

    return middleInfo;
}

function getBottomInfo(){
    let trailer = document.createElement('div');
    trailer.className = 'trailer';

    let video = createIframe();
    trailer.appendChild(video);

    return trailer;
}

function createRating(){

    let rating = document.createElement('div');
    rating.className = 'rating';

    rating.appendChild(createH2('Avaliar:'));

    let div = document.createElement('div');
    div.className = 'rate-movie';
    for (let i = 0; i < 5; i++){
        let img = document.createElement('img');
        
        let currentRating = localStorage.getItem('rating');
        
        if (currentRating != null){
            if (currentRating >= i+1)
                img.src = '/images/star1.png';                    
            else
                img.src = '/images/star0.png';
        }
        else
            img.src = '/images/star0.png';
        
        img.setAttribute('onclick', `rateMovie(${i+1})`);                    
        div.appendChild(img);                    
    }                

    rating.appendChild(div);
    return rating;
}

function createMediumRating(){

    var rating = document.createElement('div');
    rating.className = 'rating';

    rating.appendChild(createH2('Média:'));

    var mediumRating = document.createElement('div');
    mediumRating.className = 'medium-rating';

    var h1 = document.createElement('h1');
    h1.id = 'medium-rating'

    if (movie.RatingCount === 0)
        h1.innerHTML = 0;
    else
        h1.innerHTML = Math.round((movie.TotalRating / movie.RatingCount) * 10) / 10;

    h1.style = 'font-size: 3em; text-align: center;'

    var img = document.createElement('img');
    img.src = '/images/star1.png';

    mediumRating.appendChild(h1);
    mediumRating.appendChild(img);

    rating.appendChild(mediumRating);

    return rating;                
}

function createMainContent(){

    let mainInfo = document.createElement('div')
    mainInfo.className = 'movie-content';

    mainInfo.appendChild(createH2('Ano de Estréia:'));
    mainInfo.appendChild(createParagraph(new Date(movie.ReleaseDate).getFullYear()));

    mainInfo.appendChild(createH2('Categoria:'));
    mainInfo.appendChild(createParagraph(movie.Category));

    mainInfo.appendChild(createH2('Produtora:'));
    mainInfo.appendChild(createParagraph(movie.Producer));

    mainInfo.appendChild(createH2('Diretor:'));
    mainInfo.appendChild(createParagraph(movie.Director));

    return mainInfo;
}

function createCast(){

    let mainInfo = document.createElement('div')
    mainInfo.className = 'movie-content';

    mainInfo.appendChild(createH2('Elenco:'));
    let cast = movie.Cast.slice(0, 10);

    cast.forEach((actor) => {
        mainInfo.appendChild(createParagraph(actor));
    });

    return mainInfo;
}

function createH2(content){
    var h2 = document.createElement('h2');
    h2.innerHTML = content;
    return h2;
}

function createParagraph(content){
    var p = document.createElement('p');
    p.innerHTML = content;
    return p;
}

function getMoviePicture(){
    let div = document.createElement('div');
    div.className = "movie-picture";

    let img = createImage();
    div.appendChild(img);

    return div;
}

function createImage(){
    var imagePath = movie.ImagePath;
    var img = document.createElement("img");                
    
    var path = "/" + imagePath.substring(imagePath.indexOf("images"), imagePath.length);                
    path = path.replace(/\\/g, "/");                                             
    
    img.setAttribute("src", path);
    img.setAttribute('itemprop', 'image');
    img.alt = movie.Name;

    return img;
}

function getMovieTitle(){
    let title = document.createElement('h1');
    title.style = 'text-align: center; font-size: 3em;';
    title.innerHTML = movie.Name;
    return title;
}

function getVideoUrl(){
    let videoUrl = movie.Trailer;
    let videoId = videoUrl.substring(videoUrl.indexOf('/embed/') + 7, videoUrl.length);
    return videoUrl + `?autoplay=1&mute=1&playlist=${videoId}&loop=1&controls=0"`;
}

function createIframe(){
    let iframe = document.createElement('iframe');                             
    iframe.className = 'movie-trailer';
    iframe.src = getVideoUrl();
    iframe.allowFullscreen = true;
    iframe.title = 'YouTube video player';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.frameborder="0" 

    return iframe;
}

function rateMovie(value){                                

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8082/filme/avaliar');  
    request.setRequestHeader("Content-Type", "application/json");                                    
    
    const json = {
        id: movie._id,
        rating: value
    }                

    request.onreadystatechange = () => {
        if(request.readyState == 4) {                        
            if(request.status == 200) {  
                localStorage.setItem('rating', value);
                location.reload();                                                                                  
            }
        }
    };
    request.send(JSON.stringify(json));
}