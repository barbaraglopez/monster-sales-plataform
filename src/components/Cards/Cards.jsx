import {AppContext} from '../../context/useContext'
import { useContext, useState } from "react";
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import ClockLoader from "react-spinners/ClipLoader";  
import { useEffect } from 'react';


export const Cards=()=>{
const { card, cart, setCart } = useContext(AppContext);
const navigate = useNavigate();
const [loading, setLoading] = useState(true);

 useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  } , 3000)
 }, [])

const showAlert=()=>{
  Swal.fire({
    title: "Succes",
    text: "Your product was added to your cart",
    icon: "success",
    timer: "4000",
    position: "center",
    iconColor: "#148F77",
    confirmButtonColor: "#148F77",
  });
}

const navigateTo = (param) => {
  navigate(param)
};

const buyProduct = (product) => {
  let stagingProduct = { ...product };
  stagingProduct.cantidad = 1;
  let match = cart.find((cartProduct) => cartProduct.id === product.id);
  if (match) {
    match.cantidad += 1;
  } else {
    setCart([...cart, stagingProduct]);
  }
  showAlert()
}; 

    return (
      <div className="cardsContainer mb-40">
        <Navbar />
        <div className="max-w-full m-3 flex items-center flex-col p-3">
          <div className="bg-blue-300 dark:bg-slate-600 shadow-2xl rounded pt-6  p-3 flex flex-col items-center w-auto">
            <img src={card.img} className="rounded-lg h-72 shadow-lg" />
            <h1 className="font-semibold block text-gray-700 dark:text-white m-2">
              Name : {card.name}
            </h1>
            <p className="font-semibold block text-gray-700 font-fold m-2 dark:text-white">
              Personality : {card.descripcion}
            </p>
            <p className="font-semibold block text-gray-700 font-fold m-2 dark:text-white">
              Service price : ${card.precio}
            </p>
            <button
              className="bg-black hover:bg-slate-700 border-black hover:border-slate-500 text-white dark:bg-blue-200 dark:text-slate-900 dark:hover:bg-white dark:hover:text-black p-2 m-2 rounded focus:shadow-outline text-sm font-bold"
              onClick={() => buyProduct(card)}
            >
              Add cart
            </button>
          </div>
          <button
            className="bg-blue-400 hover:bg-blue-200 hover:text-black border hover:border-blue-500 text-white p-2 m-2 rounded focus:shadow-outline text-sm font-bold"
            onClick={() => navigateTo("/home")}
          >
            Back home
          </button>
        </div>
        <Footer />
      </div>
    );
}
