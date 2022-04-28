import './Navbar.css';
import sacola from '../assets/icon/sacola.svg';
import logo from '../assets/icon/logo.svg';

export function Navbar() {
  <div className="Header">
    <div className="row">
      <div className="Header__logo Logo">
        <img src={logo} width="40px" className="Sacola__icone" alt="sacola" />
        <img src="./assets/icon/InMove.jpg" alt="titulo" />
      </div>
      <div className="Header__opcoes Opcoes">
        <div className="Opcoes__sacola Sacola">
          <img
            src={sacola}
            width="40px"
            className="Sacola__icone"
            alt="Sacola de compras"
          />
        </div>
      </div>
    </div>
  </div>
}
