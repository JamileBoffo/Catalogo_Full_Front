import './MovieListaItem.css';

export function MovieListaItem() {


  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="MovieListaItem__badge">{movieSelecionado[index]}</span>
    );

  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button className="Acoes__remover" onClick={() => removerItem(index)}>
        Remover
      </button>
    );

  return (
    <div className="MovieListaItem" key={`MovieListaItem-${index}`}>
      {badgeCounter(movieSelecionado[index], index)}
      <img className="MovieListaItem__img" src={movie.img} alt={movie.titulo} />
      <div>
        <div className="MovieListaItem__titulo">{movie.titulo}</div>
        <div className="MovieListaItem__ano">{movie.ano}</div>
        <div className="MovieListaItem__sinopse">{movie.sinopse}</div>
        <div className="MovieListaItem__acoes Acoes">
          <button
            className={`Acoes__adicionar ${
              !movieSelecionado[index] && 'acoes__adicionar--preencher'
            }`}
            onClick={() => adicionarItem(index)}
          >
            Adicionar
          </button>
          {removeButton(movieSelecionado[index], index)}
        </div>
      </div>
    </div>
  );
}
