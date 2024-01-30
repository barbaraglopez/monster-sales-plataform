import {useState, useContext} from 'react'
import {useAuth, AppContext} from '../../context/useContext'
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from '../Navbar/Navbar';
import {FaUserCircle} from "react-icons/fa";


const Profile =()=> {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigateTo = (param) => {
    navigate(param);
  };

  return (
    <div>
      <Navbar />
      <div className="inset-0 top-20 flex flex-col text-center items-center pt-6 mb-10">
        <div className="bg-blue-400 dark:bg-slate-700 flex items-center flex-col text-center text-white font-bold shadow-xl rounded pt-6 mb-3 mt-4 p-5 w-80 ">
          <FaUserCircle className="mr-2 text-xl" />
          <p className="p-2">Welcome {user.displayName}!</p>
          <p>Welcome {user.email}</p>
          <div className="p-2">
            <p> User creation date :</p>
            <p>{user.metadata.creationTime}</p>
            <p> Last time online:</p>
            <p>{user.metadata.lastSignInTime}</p>
            <p>Registered mail:</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <div className="bg-blue-400 dark:bg-slate-700 font-bold text-white flex items-center flex-col text-center shadow-xl rounded pt-6 mb-3 mt-4 p-5 w-80 ">
            Do you have products in the cart?
            <button
              onClick={() => navigateTo("/cart")}
              className="rounded p-2 text-sm hover:text-white bg-slate-200 hover:bg-blue-700 text-black font-bold mt-2 shadow-lg"
            >
              See my products
            </button>
          </div>
          <div className="flex items-center flex-col text-center rounded pt-6 mb-3 mt-4 p-5 w-80">
            <button
              onClick={() => navigateTo("/home")}
              className="rounded p-2 text-sm text-white bg-gray-700 hover:bg-blue-700 font-bold px-6 shadow-lg mb-20 "
            >
              Back home
            </button>
          </div>
        </div>
      </div>
      <Footer className="mt-10" />
    </div>
  );
}

export default Profile