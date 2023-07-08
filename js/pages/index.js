const apiKey = '7065bc28cfacd8886e291178a580ce61';
let currentPage = 1;
let totalPages = 1;

function displayMovies(page) {
    const seccionPoster = document.getElementById('seccionCartelera');
    seccionPoster.innerHTML = ''; // Limpiar el contenido anterior

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            totalPages = data.total_pages;

            movies.forEach(movie => {
                const seccionPosterElement = document.createElement('div');
                seccionPosterElement.className = 'seccionPoster';

                const img = document.createElement('img');
                img.className = 'poster';
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = '';

                const title = document.createElement('h3');
                title.textContent = movie.title;

                const details = document.createElement('p');
                details.innerHTML = `Código: ${movie.id}<br>
                             Título original: ${movie.original_title}<br>
                             Idioma original: ${movie.original_language}<br>
                             Año: ${movie.release_date}`;

                const button = document.createElement('a');
                button.className = 'button';
                button.textContent = 'Agregar a favoritos';
                button.onclick = () => agregarFavorito(movie.id);

                seccionPosterElement.appendChild(img);
                seccionPosterElement.appendChild(title);
                seccionPosterElement.appendChild(details);
                seccionPosterElement.appendChild(button);
                seccionPoster.appendChild(seccionPosterElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function updatePagination() {
    const paginacionElement = document.getElementById('paginacion');
    paginacionElement.innerHTML = '';

    const btnAnterior = document.createElement('button');
    btnAnterior.className = 'btnPaginacion';
    btnAnterior.id = 'btnAnterior';
    btnAnterior.textContent = 'Anterior';
    btnAnterior.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMovies(currentPage);
            updatePagination();
        }
    });
    paginacionElement.appendChild(btnAnterior);

    const btnSiguiente = document.createElement('button');
    btnSiguiente.className = 'btnPaginacion';
    btnSiguiente.id = 'btnSiguiente';
    btnSiguiente.textContent = 'Siguiente';
    btnSiguiente.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayMovies(currentPage);
            updatePagination();
        }
    });
    paginacionElement.appendChild(btnSiguiente);
}
function agregarFavorito(id) {
    let local = [];
    local = localStorage.getItem("Favoritos");
    let nuevo = id;
    let control = true;
    if (local != null) {
        for (let i = 0; i < local.length; i++) {
            if (local[i] == nuevo) {
                control = false;
                i = local.length;
            };
        };
        if (control) {
            let msj = document.getElementById("sec-messages");
            localStorage.setItem("Favoritos", id);
            msj.innerHTML = '<p class="verde">Película agregada con éxito!</p>';
        }
        else {
            let msj = document.getElementById("sec-messages");
            msj.innerHTML = '<p class="amarillo">La película ingresada ya se encuentra almacenada</p>';
        };
    }
    else {
        let msj = document.getElementById("sec-messages");
        localStorage.setItem("Favoritos", id);
        msj.innerHTML = '<p class="verde">Película agregada con éxito!</p>';
    }
};



displayMovies(currentPage);
updatePagination();