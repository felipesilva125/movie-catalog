function validateForm() {    
    
    var movieName = document.getElementById("movieName").value;
    if (movieName.includes('\\') 
        || movieName.includes('/')
        || movieName.includes(':')
        || movieName.includes('*')
        || movieName.includes('?')
        || movieName.includes('<')
        || movieName.includes('>')
        || movieName.includes('|')) {   

        alert("Caracteres não permitidos: \\ / : * ? < > |");
        return;
    }

    verifyDataBase(movieName);
}

function verifyDataBase(movieName) {

    var request = new XMLHttpRequest();
    request.open('POST', document.location.origin+'/cadastro/valida-form');
    request.setRequestHeader("Content-Type", "application/json");

    const json = {
        name: movieName
    };

    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                alert("Filme salvo com sucesso!");
                document.getElementById("registerForm").submit();
            }
            else if (request.status == 500)
                alert("Filme ja existe!");
        }
    };

    request.send(JSON.stringify(json));
    console.log(result);
}

function getFileName() {
    var input, fileName;
    input = document.getElementById('input-file');
    fileName = document.getElementById('file-name');
    var name = input.value.replace(/^.*[\\\/]/, '')
    fileName.innerHTML = name;
}
