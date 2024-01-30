import { createOrder } from '../../pages/services/order'
import { useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../../context/useContext"
import {useNavigate} from "react-router-dom";
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Swal from "sweetalert2";

export const Checkout = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate();
  const [message] = useState('');

    const { cart} = useContext(AppContext);
    console.log(cart)

    const [values, setValues] = useState({
        name: "",
        email: "",
        direccion: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.direccion]: e.target.value,
        });
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        const newOrder =  {
        Cliente : values,
        Productos:cart,
        Total:1
        }
  
        try {
            const order = await createOrder(newOrder)
            showAlert();
        } catch (error) {
            setErr(true)
            console.log('hubo un error',error)
        }
    };

    const navigateTo = (param) => {
      navigate(param);
    };

    const showAlert = () => {
      Swal.fire({
        title: "Succes",
        text: "Your order was sent successfully!",
        icon: "success",
        timer: "4000",
        position: "center",
        iconColor: "#148F77",
        confirmButtonColor: "#148F77",
      });
    };


    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col text-center text-black items-center rounded pt-6 mb-4 font-semibold">
          <h2 className="text-xl p-3">
            Finalize your order by entering your data: 
          </h2>

          <form
            onSubmit={onSubmit}
            className="flex flex-col text-center bg-blue-500 dark:bg-slate-700 shadow-lg rounded pt-6 mb-10 p-5"
          >
            <label className="block text-slate-200 text-md font-fold mb-2 mt-2">
              Name and lastname :
            </label>
            <input
              className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Coloca tu nombre aqui"
            />
            <label className="block text-slate-200 text-md font-fold mb-2 mt-2">
              Mail :
            </label>
            <input
              className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Coloca tu email aqui"
            />
            <label className="block text-slate-200 text-md font-fold mb-2 mt-2">
              Address :
            </label>
            <input
              className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
              type="text"
              name="direccion"
              value={values.direccion}
              onChange={handleChange}
              placeholder="Coloca tu direccion aqui"
            />
            <button
              className="bg-blue-400 hover:text-black border hover:border-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor:auto; text-sm mt-2"
              type="submit"
            >
              Finish your order !
            </button>
            {err == true ? <p>{message}</p> : <p></p>}
            <button
              onClick={() => navigateTo("/home")}
              className="bg-blue-400 hover:text-black border hover:border-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor:auto; text-sm mt-2"
            >
              Back to home
            </button>
          </form>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
}
