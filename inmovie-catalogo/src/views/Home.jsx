import './Home.css';
import { MovieLista } from '../components/MovieLista/MovieLista';
import { Navbar } from '../components/Navbar/Navbar'

export function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="Home__container">
        <MovieLista />
      </div>
    </div>
  );
}
