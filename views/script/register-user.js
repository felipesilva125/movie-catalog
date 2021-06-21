function validateUser() {    

    if (!validateName())
        return;

    var email = document.getElementById("email").value;
    if (!validateEmail(email))
        return;

    if (!validatePassword())
        return;
    
    validateDatabase(email);
}

function validateDatabase(typedEmail) {
    
    var request = new XMLHttpRequest();
    request.open('POST', document.location.origin+'/usuario/valida');
    request.setRequestHeader("Content-Type", "application/json");

    const json = {
        email: typedEmail
    };

    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                alert("Usuário salvo com sucesso!");
                document.getElementById("registerUser").submit();
            }
            else if (request.status == 500)
                alert("E-mail já cadastrado!");
        }
    };

    request.send(JSON.stringify(json));
}

function validateName(){
    let name = document.getElementById("name").value;
    if (invalidInput(name)){    
        alert("Nome inválido!");
        return false;
    }

    return true;
}

function validateEmail(email) {    
    let user = email.substring(0, email.indexOf("@"));
    let domain = email.substring(email.indexOf("@")+ 1, email.length);
  
    if ((user.length >=1) &&
        (domain.length >=3) &&
        (user.search("@")==-1) &&
        (domain.search("@")==-1) &&
        (user.search(" ")==-1) &&
        (domain.search(" ")==-1) &&
        (domain.search(".")!=-1) &&
        (domain.indexOf(".") >=1)&&
        (domain.lastIndexOf(".") < domain.length - 1)) {
      return true
    }
    
    alert("E-mail com formato inválido!");
    return false;  
}

function validatePassword(){
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if (invalidInput(password) || invalidInput(password2)) {
        alert("Senha inválida!");
        return false;
    }

    if (password != password2){
        alert("As senhas não coincidem!");
        return false;
    }

    return true;
}

function invalidInput(input){
    return !input || typeof input == undefined || input == null;
}
