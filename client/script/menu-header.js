var user;

function buildHeader() {    
    var xhr = new XMLHttpRequest();                         
    xhr.open('GET', document.location.origin+'/usuario/user');            
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {                        
            if(xhr.status == 200) {  
                let response = xhr.response;
                if (response)
                    user = JSON.parse(response);

                buildInfo();
            }
        }
    };
    xhr.send(); 
}

function buildInfo() {

    let menu = document.getElementById('menu');
    let headerLeft = buildHeaderLeft();
    let headerRight = buildHeaderRight();

    menu.appendChild(headerLeft);
    menu.appendChild(headerRight);
}

function buildHeaderRight(){
    let headerRight = document.createElement('div');
    headerRight.className = 'header-right';

    let menuHeader = document.createElement('div');
    menuHeader.className = 'menu-header';   

    let search = buildSearchBar();

    headerRight.appendChild(search);
    return headerRight;
}

function buildSearchBar() {
    let search = document.createElement('div');
    search.className = 'search';

    let input = document.createElement('input');
    input.id = 'searchName';
    input.className = 'txtSearch';
    input.type = 'text';
    input.placeholder = 'Pesquisar...';
    input.onkeyup = filterMovies;

    let img = document.createElement('img');
    img.className = 'btnSearch';
    img.src = '../images/search.png';

    search.appendChild(input);
    search.appendChild(img);
    return search;
}

function buildHeaderLeft(){
    let headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';

    let menuHeader = document.createElement('div');
    menuHeader.className = 'menu-header';

    let ul = document.createElement('ul');             

    let liHome = buildHome();
    let liRegister = buildMovieRegister();
    let liUser = buildUserRegister();
    let liLogin = buildLoginMenu();   
    let liLogoff = buildLogoffMenu();

    ul.appendChild(liHome);
    
    if (!user)
        ul.appendChild(liLogin);

    if (user) {
        ul.appendChild(liRegister);
        ul.appendChild(liUser);    
        ul.appendChild(liLogoff);
    }

    menuHeader.appendChild(ul);                
    headerLeft.appendChild(menuHeader);

    return headerLeft;
}

function buildLogoffMenu() {
    let liLogoff = document.createElement('li');
    let logoff = document.createElement('a');
    logoff.href = '/usuario/logout';
    logoff.innerHTML = `${user ? user.Name : ""} | Sair`;

    console.log(user);

    liLogoff.appendChild(logoff);
    return liLogoff;
}

function buildHome() {
    let liHome = document.createElement('li');
    let home = document.createElement('a');
    home.href = '/';
    home.innerHTML = 'Início';
    liHome.appendChild(home);
    return liHome;
}

function buildLoginMenu() {
    let liLogin = document.createElement('li');
    let login = document.createElement('a');
    login.href = '/usuario/login';
    login.innerHTML = 'Login';
    liLogin.appendChild(login);
    return liLogin;
}

function buildMovieRegister() {
    let liRegister = document.createElement('li');
    let register = document.createElement('a');
    register.href = '/cadastro';
    register.innerHTML = 'Cadastrar Filme';
    liRegister.appendChild(register);
    return liRegister;
}

function buildUserRegister() {
    let liUser = document.createElement('li');
    let registerUser = document.createElement('a');
    registerUser.href = '/usuario/cadastrar';
    registerUser.innerHTML = 'Cadastrar Usuário';
    liUser.appendChild(registerUser);
    return liUser;
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