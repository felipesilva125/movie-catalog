function buildLogin(){
    
    buildHeader();

    var request = new XMLHttpRequest();
    request.open('GET', document.location);        
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 401) {                                              
                let error = request.getResponseHeader('error');                                                            
                if (error)
                    buildErrorLabel(error);
            }
        }
    };

    request.send();
}

function buildErrorLabel(error)
{
    let form = document.getElementById('login');

    let label = document.createElement('label');
    label.innerHTML = error;

    form.appendChild(label);
}