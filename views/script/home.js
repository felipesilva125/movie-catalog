function getMovies() {
    buildHeader();

    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8082/busca-filmes');
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var movies = JSON.parse(request.response);
                showMovies(movies);
            }
        }
    };
    request.send();
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

        var h2_name = document.createElement("h2");
        h2_name.setAttribute("class", "title-gallery");
        h2_name.id = 'name-movie';
        h2_name.innerHTML = movie.Name;

        var h2_category = document.createElement("h2");
        h2_category.className = 'category-movie';
        h2_category.id = 'category-movie';
        h2_category.innerHTML = "Categoria: " + movie.Category;

        var h2_rating = document.createElement('h2');
        h2_rating.className = 'medium-rating'
        h2_rating.id = 'medium-rating'

        if (movie.RatingCount === 0)
            h2_rating.innerHTML = "Avaliação: " + 0;
        else
            h2_rating.innerHTML = "Avaliação: " + Math.round((movie.TotalRating / movie.RatingCount) * 10) / 10;

        var icon_star = document.createElement("img");
        icon_star.id = 'icon-star';
        icon_star.src = '/images/star1.png';

        img.appendChild(input);
        gridItem.appendChild(img);
        gridItem.appendChild(h2_name);
        gridItem.appendChild(h2_category);
        gridItem.appendChild(h2_rating);
        gridItem.appendChild(icon_star);
        gridItem.appendChild(input);
        container.appendChild(gridItem);
    });
}

function createImage(imagePath) {
    var img = document.createElement("img");

    var path = "./" + imagePath.substring(imagePath.indexOf("images"), imagePath.length);
    path = path.replace(/\\/g, "/");

    img.setAttribute("src", path);
    img.setAttribute("class", "img-gallery");

    return img;
}

function sortMovies(sortType) {
        
    var shouldSwitch, i;
    
    let movies = document.getElementById("container").children;
    let switching = true;
    
    while (switching) {                
        switching = false;                
        for (i = 0; i < (movies.length - 1); i++) {            
            shouldSwitch = false;            
            let current = movies[i].getElementsByClassName(sortType)[0];
            let next = movies[i + 1].getElementsByClassName(sortType)[0];
            let currentText = current.textContent || current.innerText;
            let nextText = next.textContent || next.innerText;

            if (currentText.toLowerCase() > nextText.toLowerCase()) {                
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {            
            movies[i].parentNode.insertBefore(movies[i + 1], movies[i]);
            switching = true;
        }
    }    

}