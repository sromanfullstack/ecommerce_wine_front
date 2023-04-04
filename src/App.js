import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Registro from "./views/Registro";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Cart from "./views/Cart";
import Provider from "./Context/DataContex/Provider";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrarse" element={<Registro />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
