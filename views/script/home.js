function getMovies() {
    buildHeader();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8082/busca-filmes');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
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

        var h2_name = document.createElement("h2");
        h2_name.setAttribute("class", "title-gallery");
        h2_name.id = 'name-movie';
        h2_name.innerHTML = movie.Name;

        var h2_category = document.createElement("h2");
        h2_category.id = 'category-movie';
        h2_category.innerHTML = "Categoria: " + movie.Category;

        var h2_rating = document.createElement('h2');
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