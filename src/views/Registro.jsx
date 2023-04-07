// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2'
// import axios from "axios";

// export default function RegistroForm() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState({
//     email: '',
//     password: '',
//     name: '',
//     phone: '',
//   });

//   const handleChange = ({ target }) => {
//     const { name, value } = target;
//     setCustomer({ ...customer, [name]: value });
//   };

//   const registrarCustomer = async () => {
//     // const urlServer = "http://localhost:5000";
//     const urlServer = "https://ecommercewinebackend-production.up.railway.app";
//     const endpoint = "/customers";
//     try {
//       await axios.post(urlServer + endpoint, customer);
//       Swal.fire({
//         position: 'top-center',
//         icon: 'success',
//         title: 'Cliente registrado exitosamente',
//         showConfirmButton: false,
//         timer: 2000
//       })
//       navigate("/");
//     } catch (error) {
//       Swal.fire({
//         position: 'top-center',
//         icon: 'error',
//         title: 'Datos incorrectos, vuelve a intentar',
//         showConfirmButton: false,
//         timer: 2000
//       })
//       console.log(error);
//     }
//   };

//   return (
//     <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
//       <h1>Registrar nuevo Cliente</h1>
//       <hr />
//       <div className="form-group mt-1 ">
//         <label>Email address</label>
//         <input
//           value={customer.email}
//           onChange={handleChange}
//           type="email"
//           name="email"
//           className="form-control"
//           placeholder="Enter email"
//         />
//       </div>
//       <div className="form-group mt-1 ">
//         <label>Password</label>
//         <input
//           value={customer.password}
//           onChange={handleChange}
//           type="password"
//           name="password"
//           className="form-control"
//           placeholder="Password"
//         />
//       </div>
//       <div className="form-group mt-1 ">
//         <label>Full Name</label>
//         <input
//           value={customer.name}
//           onChange={handleChange}
//           type="name"
//           name="name"
//           className="form-control"
//           placeholder="name"
//         />
//       </div>

//       <div className="form-group mt-1 ">
//         <label>Phone</label>
//         <input
//           value={customer.phone}
//           onChange={handleChange}
//           type="phone"
//           name="phone"
//           className="form-control"
//           placeholder="phone"
//         />
//       </div>

//       <button onClick={registrarCustomer} className="btn btn-light mt-3">
//         Registrarme
//       </button>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";

export default function RegistroForm() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});

  const handleSetCustomer = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setCustomer({ ...customer, ...field });
  };

  const registrarCustomer = async () => {
    // const urlServer = "http://localhost:5000";
    const urlServer = "https://ecommercewinebackend-production.up.railway.app";
    const endpoint = "/customers";
    try {
      await axios.post(urlServer + endpoint, customer);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Cliente registrado exitosamente',
        showConfirmButton: false,
        timer: 2000
      })
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Datos incorrectos, vuelve a intentar',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(error);
    }
  };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Registrar nuevo Cliente</h1>
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
      <div className="form-group mt-1 ">
        <label>Full Name</label>
        <input
          value={customer.name}
          onChange={handleSetCustomer}
          type="name"
          name="name"
          className="form-control"
          placeholder="name"
        />
      </div>

      <div className="form-group mt-1 ">
        <label>Phone</label>
        <input
          value={customer.phone}
          onChange={handleSetCustomer}
          type="phone"
          name="phone"
          className="form-control"
          placeholder="phone"
        />
      </div>

      <button onClick={registrarCustomer} className="btn btn-light mt-3">
        Registrarme
      </button>
    </div>
  );
}
