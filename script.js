const baseURL = "http://localhost:3000/movies";
const msgAlert = document.querySelector('.msg-alert');

//READ
async function findAllMovies() {
  const response = await fetch(`${baseURL}/find-movies`);

  const movies = await response.json();

  movies.forEach(function (movie) {
    document.getElementById("movieList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="MovieListaItem" id="MovieListaItem_${movie._id}">
        <div>
          <img class="MovieListaItem__img" src="${movie.img}" alt="${movie.titulo}" />
            <div class="MovieListaItem__titulo">${movie.titulo}</div>
            <div class="MovieListaItem__ano">${movie.ano}</div>
            <div class="MovieListaItem__sinopse">${movie.sinopse}</div>
            
            <div class="MovieListaItem__acoes Acoes">
              <button class="Acoes__editar btn" onclick="abrirModal('${movie._id}')">Editar</button> 
              <button class="Acoes__apagar btn" onclick="abrirModalDelete('${movie._id}')">Apagar</button>  
            </div>
        </div>
        
      </div>
    `
    );
  });
}

findAllMovies();

async function findByIdMovie() {
  const id = document.querySelector("#idMovie").value;

  if(id == "") {
    localStorage.setItem('message', "Digite um ID para pesquisar!");
    localStorage.setItem('type', 'danger');
    showMessageAlert();
    return;
  }


  document.querySelector('.movieLista').style.display = 'none';

  const response = await fetch(`${baseURL}/movie/${id}`);

  const movie = await response.json();

  if (movie.message != undefined) {
    localStorage.setItem('message', movie.message);
    localStorage.setItem('type', 'danger');
    showMessageAlert();
    return;
  }
  document.querySelector('.list-all').style.display = 'block'; 
  document.querySelector('.movieLista').style.display = 'none';
  const movieEscolhidoDiv = document.querySelector("#movieEscolhido");

  movieEscolhidoDiv.innerHTML = `
  <div class="MovieCardItem" id="MovieListaItem_${movie._id}">
    <div>
      <img class="MovieCardItem__img" src="${movie.img}" alt="${movie.titulo}" />
      <div class="MovieCardItem__titulo">${movie.titulo}</div>
      <div class="MovieCardItem__ano">${movie.ano}</div>
      <div class="MovieCardItem__sinopse">${movie.sinopse}</div>

      <div class="MovieListaItem__acoes Acoes">
      <button class="Acoes__editar btn" onclick="abrirModal('${movie._id}')">Editar</button> 
      <button class="Acoes__apagar btn" onclick="abrirModalDelete('${movie._id}')">Apagar</button>   
      </div>
    </div>
    
  </div>`;
}

//CREATE
async function abrirModal(id = "") {
  if (id != "") {
    
    document.querySelector("#title-header-modal").innerText =
      "Atualizar um Filme";

    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseURL}/movie/${id}`);
    const movie = await response.json();

    document.querySelector("#titulo").value = movie.titulo;
    document.querySelector("#ano").value = movie.ano;
    document.querySelector("#sinopse").value = movie.sinopse;
    document.querySelector("#img").value = movie.img;
    document.querySelector("#id").value = movie._id;
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

async function submitMovie() {
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

  const modoEdicaoAtivado = id != "";

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

  if(novoMovie.message != undefined) {
    localStorage.setItem('message', novoMovie.message);
    localStorage.setItem('type', 'danger');
    showMessageAlert();
    return;
  }

  if(modoEdicaoAtivado) {
    localStorage.setItem('message', 'Filme atualizado com sucesso!');
    localStorage.setItem('type', 'success');
  } else{
    localStorage.setItem('message', 'Filme criado com sucesso!');
    localStorage.setItem('type', 'success');
  }

  document.location.reload(true);
  
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
  
  localStorage.setItem('message', result.message);
  localStorage.setItem('type', 'success');

  document.location.reload(true);

  fecharModalDelete();
}

function showMessageAlert () {
  msgAlert.innerText = localStorage.getItem('message');
  msgAlert.classList.add(localStorage.getItem('type'));
  closeMessageAlert();
}



function closeMessageAlert () {
  setTimeout(function() {
    msgAlert.innerText = "";
    msgAlert.classList.remove(localStorage.getItem('type'));
    localStorage.clear();
  }, 3000);
}

showMessageAlert();
