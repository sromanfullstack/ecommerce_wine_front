import { useState, useEffect } from "react";
import axios from "axios";

export default function Perfil() {

  const [customerLocal, setCustomerLocal] = useState({});
  const getCustomerData = async () => {
    const urlServer = "http://localhost:5000";
    const endpoint = "/customers";
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      setCustomerLocal(data)
      localStorage.setItem("user",JSON.stringify(data))
    } catch ({ response: { data: message } }) {
      alert(message + " 🙁");
      console.log(message);
    }
  };

  useEffect(() => {
    getCustomerData();
  },[]);

  return (
    <div className="py-5">
      <h1>
        Bienvenido <span className="fw-bold">Sr(a). {customerLocal.name}</span>
      </h1>
      <h3>
        <br/>
        <br/>

        Sus datos de Contacto son:
        <br/>
        <br/>
        <div>E-mail 📧  :{customerLocal.email}</div>
        <div>Telefono 📲: {customerLocal.phone}</div>
        
      </h3>
    </div>
  );
}
