import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataProvider = ({children}) => {
	const [productos, setProductos] = useState([]);
	const [customer, setCustomer] = useState({});
	const [menu, setMenu] = useState(false)
	const [carrito, setCarrito] =useState([])
	const [prod, setProd] = useState([]);
	const [total, setTotal] = useState([])
	const [cartProduct, setCartProduct] = useState([]);


	const user = JSON.parse(localStorage.getItem("user")); //trae id de usuario logueado

	const getCantProducts = async () => {
		const cantCart = await axios.get(`http://localhost:5000/cart/quantity/${user.id}`);
		setCartProduct(cantCart.data[0].cantidad);
	};

	useEffect(() => {
		getCantProducts();
	}, [cartProduct]);

	
	const getProducts = async () => {
		const producto = await fetch("http://localhost:5000/products");
		
		const data = await producto.json()

		// if(producto){
			setProductos(data)
		// }else{
		// 	setProductos([])
		// }
	  };

  useEffect(() => {

    getProducts();
		}, []);

	const addCarrito = (id) =>{
		const check = carrito.every(item =>{
			return item.id !== id
			
		})
		if(check){
			const data = productos.filter(producto =>{
				return producto.id === id
			})
			setCarrito([...carrito, ...data])
		}else{
			alert("El producto se ha añadido al carrito")
		}
	}
	useEffect(() =>{
		const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'))
		if(dataCarrito){
			setCarrito(dataCarrito)
		}
	},[])

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item) =>{
				return prev + (item.price * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	
	return (
		<DataContext.Provider value={{productos, menu, setMenu, carrito, setCarrito, addCarrito, total, setTotal, customer, setCustomer, prod, setProd, cartProduct, setCartProduct}}>
			{children}
		</DataContext.Provider>
	)
};

export default DataProvider;