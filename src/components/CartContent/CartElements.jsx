import { useContext, useState } from "react";
import { AppContext } from "../../context/useContext";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


export const CartElements = () => {
    const navigate = useNavigate();
    const { cart , setCart  } = useContext(AppContext)

    //funcion eliminar compra
    const deleteProduct = (product)=>{
      setCart([]);
    }

    const handleEmptyCart =()=>{
      const showAlert = () => {
        Swal.fire({
          title: "Warning",
          text: "Do you wanna empty your cart",
          icon: "question",
          showDenyButton: true,
          denyButtonText: "No",
          denyButtonColor: "#C0392B",
          confirmButtonText: "Yes",
          confirmButtonColor: "#239B56",
          iconColor: "#000000",
        }).then((response) => {
          if (response.isConfirmed) {
            deleteProduct();
            Swal.fire("Succes", "Your cart is empty");
          } else if (response.isDenied) {
            Swal.fire("Info", "Nothing change!", "info");
          } else {
            Swal.fire("Info", "Error", "something unexpected happened", "info");
          }
        });
      };

      showAlert()
    }


    const handleCheckout =()=>{
            const showAlert = () => {
              Swal.fire({
                title: "Warning",
                text: "Do you wanna finish your order",
                icon: "question",
                showDenyButton: true,
                denyButtonText: "No",
                denyButtonColor: "#C0392B",
                confirmButtonText: "Yes",
                confirmButtonColor: "#239B56",
                iconColor: "#000000",
              }).then((response) => {
                if (response.isConfirmed) {
                  navigate('/checkout');
                  Swal.fire(
                    "Succes",
                    "Complete your information and finalize the order"
                  );
                } else if (response.isDenied) {
                  Swal.fire("Info", "Nothing change!", "info");
                } else {
                  Swal.fire(
                    "Info",
                    "Error",
                    "something unexpected happened",
                    "info"
                  );
                }
              });
            };

            showAlert();
    }


    return (
      <div
        className={`inset-0 top-20 flex flex-col text-center  text-black items-center rounded pt-6 mb-4`}
      >
        <h2 className="p-2 text-xl font-semibold">Your order : </h2>
        <div className="shadow-xl rounded pt-6 mb-3 mt-4 p-5 w-80 bg-blue-500 dark:bg-slate-700">
          {cart.map((product) => (
            <div
              key={product.id}
              className="block text-gray-700 text-sm font-fold mb-2"
            >
              <h3 className="block text-white font-bold text-sm font-fold mb-2 name">
                {product.name}
              </h3>
              <p className="precio block text-white font-bold text-sm font-fold mb-2">
                Price : $ {product.precio}
              </p>
              <p className="block text-white font-bold text-sm font-fold mb-2">
                Amount : {product.cantidad}
              </p>
              <p className="block text-white font-bold text-sm font-fold mb-2">
                Total to pay ${product.precio * product.cantidad}
              </p>
            </div>
          ))}
          {!cart.length && (
            <p className="text-white font-bold">No hay pedido!</p>
          )}
          <button
            onClick={() => navigate("/home")}
            className={`rounded p-2 text-sm text-white bg-slate-700 dark:bg-blue-500 hover:bg-blue-700 font-bold mt-3 shadow-lg`}
          >
            Back home
          </button>
        </div>
        <div className="flex flex-col items-center p-6">
          <button
            className={`bg-red-300 border border-red-400 text-red-700 hover:bg-red-700 hover:text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline cursor:auto; text-sm mt-2 mx-2 px-7`}
            onClick={() => handleEmptyCart()}
          >
            Empty cart
          </button>
          <button
            onClick={() => handleCheckout()}
            className="bg-green-300 border border-green-400 text-green-700 hover:bg-green-700 hover:text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline cursor:auto; text-sm mt-2 px-8"
          >
            Checkout
          </button>
        </div>
      </div>
    );

}

