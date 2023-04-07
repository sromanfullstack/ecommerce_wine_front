import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { DataContext } from "../Context/DataContex/Provider";

export default function Cart() {
  const [menu, setMenu] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [prod,setProd] = useState([]);
  const [total, setTotal] = useState([]);
  const { setCartProduct } = useContext(DataContext);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user != null) {
      getCartproducts();
      
    } else {
      console.log("no existe local storage");
    }
  }, []);

  const getCartproducts = async () => {
    // const response = await axios.get(`http://localhost:5000/cart/${user.id}`);
    const response = await axios.get(`https://ecommercewinebackend-production.up.railway.app/cart/${user.id}`);
    setCarrito(response.data);
    getTotCart(user.id);
  };

  const getTotCart = async () => {
    // const response = await axios.get(`http://localhost:5000/cart/total/${user.id}`);
    const response = await axios.get(`https://ecommercewinebackend-production.up.railway.app/cart/total/${user.id}`);
    setTotal(response.data);
  };

  const getProduct = async (id) => {
    // const response = await axios.get(`http://localhost:5000/cart/product/${id}`);
    const response = await axios.get(`https://ecommercewinebackend-production.up.railway.app/cart/product/${id}`);
    setProd(response.data);
  };
  const tooglefalse = () => {
    setMenu(false);
  };

  const increase = async (id) => {
    
    const response = await axios.get(
      // `http://localhost:5000/cart/increaseCart/${id}/${user.id}`
      `https://ecommercewinebackend-production.up.railway.app/cart/increaseCart/${id}/${user.id}`
    );
   
    if (response.status === 200) {
      getCartproducts();
      // const cantCart = await axios.get(`http://localhost:5000/cart/quantity/${user.id}`);
      const cantCart = await axios.get(`https://ecommercewinebackend-production.up.railway.app/cart/quantity/${user.id}`);
      setCartProduct(cantCart.data[0].cantidad);
    }
  };

  const reduce = async (id) => {
    await getProduct(id);
    console.log("cantidad",prod);
    if (prod && prod[0] && prod[0].amount_cart > 0) {
      const response = await axios.get(
        // `http://localhost:5000/cart/reduce/${id}/${user.id}`
        `https://ecommercewinebackend-production.up.railway.app/cart/reduce/${id}/${user.id}`
      );
      if (response.status === 200) {
        // const cantCart = await axios.get(`http://localhost:5000/cart/quantity/${user.id}`);
        const cantCart = await axios.get(`https://ecommercewinebackend-production.up.railway.app/cart/quantity/${user.id}`);
        setCartProduct(cantCart.data[0].cantidad);
        getCartproducts();
      }
    }
  };
  
  const removeProduct = async (id) => {
    const response = await axios.delete(
      // `http://localhost:5000/cart/remove/${id}`
      `https://ecommercewinebackend-production.up.railway.app/cart/remove/${id}`
    );
    if (response.status === 200) {
      getCartproducts();
    }
  };

  const show1 = menu ? "carritos show" : "carrito";
  const show2 = menu ? "carrito show" : "carrito";

  return (
    <div className={show1}>
      <div className={show2}>
        <div onClick={tooglefalse} className="carrito__close">
          <box-icon name="x"></box-icon>
        </div>
        <h2>Su Carrito</h2>
        <div className="carrito__center">
          {carrito.length === 0 ? (
            <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
              Carrito Vacio
            </h2>
          ) : (
            <>
              <div className="container-card">
                {carrito.map((producto) => (
                  <Card key={producto.product_id} style={{ width: "15rem" }}>
                    <Card.Img variant="top" src={producto.product_imageurl} />
                    <Card.Body>
                      <Card.Title>{producto.product_name}</Card.Title>
                      <Card.Text>{producto.description}</Card.Text>
                      <Card.Text>${producto.product_price}</Card.Text>
                    </Card.Body>

                    <div>
                      <box-icon
                        onClick={() => increase(producto.product_id)}
                        name="up-arrow"
                        type="solid"
                      />
                      <p className="cantidad">{producto.amount_cart}</p>
                      <box-icon
                        onClick={() => reduce(producto.product_id)}
                        name="down-arrow"
                        type="solid"
                      />
                    </div>
                    <div
                      onClick={() => removeProduct(producto.id_cart)}
                      className="remove__item"
                    >
                      <box-icon name="trash" />
                    </div>

                  </Card>
                ))}
                
              </div>
              
            </>
          )}
        </div>

        <div className="carrito__footer">
        {total.map((tots) => (
          <h3>Total: {tots.total}</h3>
        ))}
          <button className="btn">Payment</button>
        </div>
      </div>
    </div>
  );
}