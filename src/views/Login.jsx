import { React, useState, useContext } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../Context/DataContex/Provider";


const RegistroForm = () => {

//  -------------------------------------------------------------- 

  const { setCustomer } = useContext(DataContext);
  const navigate = useNavigate();


const [customer, setCustomerLocal] = useState({ email: '', password: ''});

  const handleSetCustomer = ({ target: { value, name } }) => {
    const field = {};
    
    field[name] = value;
    setCustomerLocal({ ...customer, ...field });
  };

//  -------------------------------------------------------------- 
  const iniciarSesion = async () => {
    // const urlServer = "http://localhost:5000";
    const urlServer = "https://ecommercewinebackend-production.up.railway.app";
    const endpoint = "/";
    const { email, password } = customer;
    
    try {
      if (!email || !password) return alert("Email y password obligatorias");
      const { data: token } = await axios.post(urlServer + endpoint, customer);
        Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Usuario y contraseña correcta ',
        showConfirmButton: false,
        timer: 2000
      })
      localStorage.setItem("token", token);
      localStorage.setItem("id_customer",customer.id);
      setCustomer(customer)
      navigate("/perfil");
    } catch ({ response: { data: message } }) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Datos incorrectos',
        showConfirmButton: false,
        timer: 2000
      })
    }
  };

//  -------------------------------------------------------------- 


  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Email address</label>
        <input
          value={customer.email}
          onChange={handleSetCustomer}
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Password</label>
        <input
          value={customer.password}
          onChange={handleSetCustomer}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <button id="btn" onClick={iniciarSesion} className="btn btn-light mt-3">
        Iniciar Sesión
      </button>
    </div>
  );
}


export default RegistroForm
