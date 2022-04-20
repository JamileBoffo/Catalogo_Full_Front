const baseURL = "http://localhost:3000/movies";

//READ
async function findAllMovies() {
  const response = await fetch(`${baseURL}/find-movies`);

  const movies = await response.json();

  movies.forEach(function (movie) {
    document.getElementById("movieList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="MovieListaItem" id="MovieListaItem_${movie.id}">
        <div>
          <img class="MovieListaItem__img" src="${movie.img}" alt="${movie.titulo}" />
            <div class="MovieListaItem__titulo">${movie.titulo}</div>
            <div class="MovieListaItem__ano">${movie.ano}</div>
            <div class="MovieListaItem__sinopse">${movie.sinopse}</div>
            
            <div class="MovieListaItem__acoes Acoes">
              <button class="Acoes__editar btn" onclick="abrirModal(${movie.id})">Editar</button> 
              <button class="Acoes__apagar btn" onclick="abrirModalDelete(${movie.id})">Apagar</button>  
            </div>
        </div>
        
      </div>
    `
    );
  });
}

async function findByIdMovie() {
  const id = document.querySelector("#idMovie").value;

  const response = await fetch(`${baseURL}/movie/${id}`);
  const movie = await response.json();

  const movieEscolhidoDiv = document.querySelector("#movieEscolhido");

  movieEscolhidoDiv.innerHTML = `
  <div class="MovieCardItem" id="MovieListaItem_${movie.id}">
    <div>
      <img class="MovieCardItem__img" src="${movie.img}" alt="${movie.titulo}" />
      <div class="MovieCardItem__titulo">${movie.titulo}</div>
      <div class="MovieCardItem__ano">R$ ${movie.ano}</div>
      <div class="MovieCardItem__sinopse">${movie.sinopse}</div>

      <div class="MovieListaItem__acoes Acoes">
      <button class="Acoes__editar btn" onclick="abrirModal(${movie.id})">Editar</button> 
      <button class="Acoes__apagar btn" onclick="abrirModalDelete(${movie.id})">Apagar</button>   
      </div>
    </div>
    
  </div>`;
}

findAllMovies();

//CREATE
async function abrirModal(id = null) {
  if (id != null) {
    
    document.querySelector("#title-header-modal").innerText =
      "Atualizar um Filme";

    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseURL}/movie/${id}`);
    const movie = await response.json();

    document.querySelector("#titulo").value = movie.titulo;
    document.querySelector("#ano").value = movie.ano;
    document.querySelector("#sinopse").value = movie.sinopse;
    document.querySelector("#img").value = movie.img;
    document.querySelector("#id").value = movie.id;
  } else {
    document.querySelector("#title-header-modal").innerText =
      "Cadastrar um Filme";

    document.querySelector("#button-form-modal").innerText = "Cadastrar";
  }
  document.querySelector("#overlay").style.display = "flex";
}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#titulo").value = "";
  document.querySelector("#ano").value = 0;
  document.querySelector("#sinopse").value = "";
  document.querySelector("#img").value = "";
}

//UPDATE

async function createMovie() {
  const id = document.querySelector("#id").value;
  const titulo = document.querySelector("#titulo").value;
  const ano = document.querySelector("#ano").value;
  const sinopse = document.querySelector("#sinopse").value;
  const img = document.querySelector("#img").value;

  const movie = {
    id,
    titulo,
    ano,
    sinopse,
    img,
  };

  const modoEdicaoAtivado = id > 0;

  const endpoint = baseURL + (modoEdicaoAtivado ? `/update/${id}` : "/create");

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(movie),
  });

  const novoMovie = await response.json();

  const html = `
  <div class="MovieListaItem" id="MovieListaItem_${novoMovie.id}">
    <div>
      <div class="MovieListaItem__titulo">${novoMovie.titulo}</div>
      <div class="MovieListaItem__ano">R$ ${novoMovie.ano}</div>
      <div class="MovieListaItem__sinopse">${novoMovie.sinopse}</div>
      <div class="MovieListaItem__acoes Acoes">
        <button class="Acoes__editar btn" onclick="abrirModal(${movie.id})">Editar</button> 
        <button class="Acoes__apagar btn" onclick="abrirModalDelete(${movie.id})">Apagar</button>  
      </div>
    </div>
    <img class="MovieListaItem__img" src="${novoMovie.img}" alt="${novoMovie.titulo}"/>
  </div>`;

  if (modoEdicaoAtivado) {
    document.querySelector(`MovieListaItem_${id}`).outerHTML = html;
  } else {
    document.querySelector("#movieList").insertAdjacentHTML("beforeend", html);
  }

  fecharModal();
}

//DELETE
function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnSim = document.querySelector(".btn_delete_yes");

  btnSim.addEventListener("click", function () {
    deleteMovie(id);
  });
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

async function deleteMovie(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  const result = await response.json();
  alert(result.message);
  fecharModalDelete();

  document.location.reload(true);
}
