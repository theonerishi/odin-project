const img = document.querySelector('img');
const input = document.querySelector('#searchInput');
const button = document.querySelector('#searchButton');
const status = document.querySelector('#status');

function findImage(search) {
    const query = search.trim();

    if (!query) {
        status.textContent = 'Please enter a search term.';
        return;
    }

    status.textContent = 'Loading...';

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=${encodeURIComponent(query)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then((response) => {
            const imageUrl = response?.data?.images?.original?.url;

            if (imageUrl) {
                img.src = imageUrl;
                img.alt = `GIF for ${query}`;
                status.textContent = '';
            } else {
                throw new Error('No image found');
            }
        })
        .catch((error) => {
            console.error(error);
            status.textContent = 'No image found. Please try another search term.';
        });
}

button.addEventListener('click', (event) => {
    event.preventDefault();
    findImage(input.value);
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        findImage(input.value);
    }
});

findImage('cats');