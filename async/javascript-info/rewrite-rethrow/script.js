class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}
function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);

    }
    
}

function demoGithubUser() {
    while(true) {
        let name = prompt('Enter a name?', 'theonerishi');
        try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch(err) {
            alert('not valid input please retry');
            alert(err);
            throw err; 
        }
        
    }
}
demoGithubUser();