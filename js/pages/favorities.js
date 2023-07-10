const API_KEY = '7065bc28cfacd8886e291178a580ce61';

document.addEventListener('DOMContentLoaded', mostrarPeliculasFavoritas);

// Función para mostrar las películas favoritas
async function mostrarPeliculasFavoritas() {
  const favoritesList = document.getElementById('favorites-list');
  const template = document.getElementById('contenedorPeliculasFavoritas');
  const mensajeNoHayPeliculas = document.getElementById('mensaje-no-hay-peliculas');
  // Obtener las películas favoritas almacenadas en localStorage
  let favoritos = localStorage.getItem('Favoritos');
  if (!favoritos || favoritos.length === 2) { // Cambia la condición a "favoritos.length === 2"
    mensajeNoHayPeliculas.style.display = 'block'; // Mostrar mensaje
    return;
  }

  favoritos = JSON.parse(favoritos);
  mensajeNoHayPeliculas.style.display = 'none';
  // favoritesList.innerHTML = ''; // Limpiar la lista de películas favoritas

  // Recorrer las películas favoritas
  for (let i = 0; i < favoritos.length; i++) {
    const codigoPelicula = favoritos[i];

    try {
      // Consultar el detalle de la película desde la API
      const response = await fetch(`https://api.themoviedb.org/3/movie/${codigoPelicula}?api_key=${API_KEY}&language=es-MX`);
      if (!response.ok) {
        throw new Error('Error en la consulta a la API.');
      }

      const pelicula = await response.json();

      // Crear una copia de la plantilla de tarjeta de película
      const movieCard = template.content.cloneNode(true);

      // Rellenar los datos de la tarjeta de película con la información obtenida
      const contenedorPeliculasFavoritasElement = movieCard.querySelector('.contenedorPeliculasFavoritas');
      contenedorPeliculasFavoritasElement.id = pelicula.id;
      const posterElement = movieCard.querySelector('.poster');
      const tituloElement = movieCard.querySelector('.titulo');
      const codigoElement = movieCard.querySelector('.codigo');
      const tituloOriginalElement = movieCard.querySelector('.titulo-original');
      const idiomaOriginalElement = movieCard.querySelector('.idioma-original');
      const resumenElement = movieCard.querySelector('.resumen');
      const removeButton = movieCard.querySelector('.remove-favorite-button');
      posterElement.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
      tituloElement.textContent = pelicula.title;
      codigoElement.textContent = pelicula.id;
      tituloOriginalElement.textContent = pelicula.original_title;
      idiomaOriginalElement.textContent = pelicula.original_language;
      resumenElement.textContent = pelicula.overview;

      // Agregar el evento click al botón de "Quitar de favoritos"
      removeButton.addEventListener('click', () => {
        quitarPeliculaDeFavoritos(codigoPelicula);
        document.getElementById(codigoPelicula).remove(); 
      });

      // Agregar la tarjeta de película a la lista de favoritos
      favoritesList.appendChild(movieCard);
    } catch (error) {
      mostrarMensajeError('Se produjo un error al cargar la información de las películas.');
      console.error(error);
    }
  }
}

// Función para quitar una película de la lista de favoritos
function quitarPeliculaDeFavoritos(codigoPelicula) {
  let favoritos = localStorage.getItem('Favoritos');
  if (!favoritos) {
    return;
  }

  favoritos = JSON.parse(favoritos);

  const index = favoritos.indexOf(codigoPelicula);
  if (index !== -1) {
    favoritos.splice(index, 1);
    localStorage.setItem('Favoritos', JSON.stringify(favoritos));
    mostrarMensajeExito('Película eliminada de favoritos.');
  }
}

function mostrarMensajeInfo(mensaje) {
  const messages = document.getElementById('sec-cine-result');
  messages.innerHTML = '<p class="peliculaExistente">' + mensaje + '</p>';
}

function mostrarMensajeExito(mensaje) {
  const messages = document.getElementById('sec-cine-result');
  messages.innerHTML = '<p class="verde">' + mensaje + '</p>';
}

function mostrarMensajeError(mensaje) {
  const messages = document.getElementById('sec-cine-result');
  messages.innerHTML = '<p class="peliculaInexistente">' + mensaje + '</p>';
}