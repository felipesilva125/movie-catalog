function buildHeader() {
    let menu = document.getElementById('menu');
    let headerLeft = buildHeaderLeft();
    let headerRight = buildHeaderRight();
                                    
    menu.appendChild(headerLeft);
    menu.appendChild(headerRight);
}

function buildHeaderRight(){
    let headerRight = document.createElement('div');
    headerRight.className = 'header-right';

    let search = document.createElement('div');
    search.className = 'search';

    let input = document.createElement('input');
    input.id = 'searchName'
    input.className = 'txtSearch';
    input.type = 'text';
    input.placeholder = 'Pesquisar...';
    input.onkeyup = filterMovies;

    let img = document.createElement('img');
    img.className = 'btnSearch'
    img.src = '../images/search.png'

    search.appendChild(input);
    search.appendChild(img);
    headerRight.appendChild(search);
    return headerRight;
}

function buildHeaderLeft(){
    let headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';

    let menuHeader = document.createElement('div');
    menuHeader.className = 'menu-header';

    let ul = document.createElement('ul');             

    let liHome = document.createElement('li');                
    let home = document.createElement('a');
    home.href = '/';
    home.innerHTML = 'Início';
    liHome.appendChild(home);

    let liRegister = document.createElement('li');
    let register = document.createElement('a');
    register.href = '/cadastro';
    register.innerHTML = 'Cadastrar Filme';
    liRegister.appendChild(register);
    

    ul.appendChild(liHome);
    ul.appendChild(liRegister);
    menuHeader.appendChild(ul);                
    headerLeft.appendChild(menuHeader);

    return headerLeft;
}

function filterMovies() {
    var input, filter, movies;

    input = document.getElementById("searchName");
    filter = input.value.toUpperCase();                               

    movies = document.getElementById("container").children;                                

    for (i = 0; i < movies.length; i++){
        let title = movies[i].getElementsByClassName('title-gallery')[0];
        let titleValue = title.textContent || title.innerText;                    

        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            movies[i].style.display = "";
        } else {
            movies[i].style.display = "none";
        }
    }
}