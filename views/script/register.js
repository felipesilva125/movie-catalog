function validateForm() {
            
    var request = new XMLHttpRequest();
    var movieName = document.getElementById("movieName").value;            
    request.open('POST', 'http://localhost:8082/cadastro/valida-form');
    request.setRequestHeader("Content-Type", "application/json");

    const json = {
        name: movieName
    };
    
    request.onreadystatechange = () => {
        if(request.readyState == 4) {
            if(request.status == 200) {                        
                alert("Filme salvo com sucesso!")
                document.getElementById("registerForm").submit();
            }                    
            else if (request.status == 500)                    
                alert("Filme ja existe!");                    
        }                
    };
    
    request.send(JSON.stringify(json));
    console.log(result);            
}