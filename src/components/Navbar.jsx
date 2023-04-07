import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'boxicons'
import { DataContext } from "../Context/DataContex/Provider";

const Navbar = () => {
  const navigate = useNavigate();
  const {cartProduct} = useContext(DataContext);
  const cants = cartProduct;
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toogleMenu = () => {
    navigate("/cart");
  }

  return (
    <div>
      <nav className="navbar">
        <span><img className="logo" src="https://cdn-icons-png.flaticon.com/512/1404/1404957.png" alt="" /></span>

        {token ? (
          <>
            <div className="cart" onClick={toogleMenu}>
              <box-icon size="lg" color="white" animation="tada" name='cart' ></box-icon>
              <span className="item__total">{cants}</span>
            </div>
            <span className="me-3">
              <Link to="/home">
                Minimarket "A la vuelta estan tus Vinos"
                <i disabled={true} className="fa-solid fa-house ms-2"></i>
              </Link>
            </span>
            <div className="opciones">
              <div>
                <Link to="/perfil">
                  <button id="perfil-button" className="btn  m-1 btn-light">Mi Perfil</button>
                </Link>
                <button id="logout-button" onClick={logout} className="btn btn-danger">
                  Salir
                </button>
              </div>
            </div>


          </>
        ) : (
          <div className="opciones">
            <div>
              <Link to="/registrarse">
                <button id="register-button" className="btn m-1 register-btn">Registrarse</button>
              </Link>
              <Link to="/">
                <button id="login-button" className="btn login-btn">Iniciar Sesión</button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
