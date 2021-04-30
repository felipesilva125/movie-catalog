function getMovies() {
    buildHeader();

    var xhr = new XMLHttpRequest();                         
    xhr.open('GET', 'http://localhost:8082/busca-filmes');                
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {                        
            if(xhr.status == 200) {                            
                var movies = JSON.parse(xhr.response);                                                       
                showMovies(movies);
            }
        }
    };                
    xhr.send();
}

function showMovies(movies) {   
    var container = document.getElementById('container');
    movies.forEach(movie => {                                        
        var gridItem = document.createElement("div");
        gridItem.setAttribute("class", "item-gallery")

        var input = document.createElement("input");
        input.setAttribute('onclick', `location.href='/filme/${movie._id}'`);
        input.type = 'button';
        input.value = 'Ver Mais +';
        
        var img = createImage(movie.ImagePath);
        var span = document.createElement("span");
        span.setAttribute("class", "title-gallery");
        span.innerHTML = movie.Name;

        img.appendChild(input);
        gridItem.appendChild(img);
        gridItem.appendChild(span);
        gridItem.appendChild(input);
        container.appendChild(gridItem);
    });                
}

function createImage(imagePath){
    var img = document.createElement("img");                
    
    var path = "./" + imagePath.substring(imagePath.indexOf("images"), imagePath.length);                
    path = path.replace(/\\/g, "/");                

    img.setAttribute("src", path);
    img.setAttribute("class", "img-gallery");

    return img;
}