import './MovieLista.css';
import { movies } from '../../mocks/movies';
import { useState } from 'react';
import { MovieListaItem } from '../MovieListaItem/MovieListaItem';

export function MovieLista() {
  const [movieSelecionado, setMovieSelecionado] = useState({});

  const adicionarItem = (movieIndex) => {
    const movie = { [movieIndex]: Number(movieSelecionado[movieIndex] || 0) + 1 };
    setMovieSelecionado({...movieSelecionado, ...movie});
  }

  const removerItem = (movieIndex) => {
    const movie = { [movieIndex]: Number(movieSelecionado[movieIndex] || 0) - 1 };
    setMovieSelecionado({...movieSelecionado, ...movie});
  }

  return (
    <div className="MovieLista">
      {movies.map((movie, index) => (
        <MovieListaItem key={`MovieListaItem-${index}`}/>
      ))}
    </div>
  );
}
