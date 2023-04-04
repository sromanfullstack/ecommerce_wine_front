import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { DataContext } from "../Context/DataContex/Provider";
import axios from "axios";


export default function Home() {
  const { productos,setCartProduct } = useContext(DataContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const increase = async (id) => {
    
    const response = await axios.get(
      `http://localhost:5000/cart/increase/${id}/${user.id}`
    );
    
    if (response.status === 200) {
      const cantCart = await axios.get(`http://localhost:5000/cart/quantity/${user.id}`);
      setCartProduct(cantCart.data[0].cantidad);
    }
  };
  return (
    <>
      <div className="container-card">
        {productos &&
          productos.map((p) => (
            <Card key={p.id} style={{ width: "15rem" }}>
              <Card.Img variant="top" src={p.imageurl} />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>{p.description}</Card.Text>
                <Card.Text>${p.price}</Card.Text>
                <Button 
                onClick={() => increase(p.id)}
                variant="primary">Add Cart</Button>
              </Card.Body>
            </Card>
          ))}
      </div>
      <footer>
        <img src="https://www.creativefabrica.com/wp-content/uploads/2020/09/04/Monogram-SV-Logo-V2-Graphics-5287147-1-1-580x386.jpg" alt="Logo de la empresa"></img>
      </footer>
    </>
  );
}
