import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Alert } from "../../components/Alert";
import {useAuth} from "../../context/useContext"
import { FaGoogle } from "react-icons/fa6";

export const Sing = () => {
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { registerUser, loguinWithGoogle } = useAuth();


  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  const goHome = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await registerUser(values.email, values.password);
      navigate("/Home")
    } catch (error) {
      setError(error.message);
    }
  }

  const LoguinwhitAccount =()=>{
    navigate('/Login')
  }

  //funcion para acceder con cuenta de google
  const handleGoogleSingIn = async ()=>{
    try {
      await loguinWithGoogle();
      navigate("/Home");
    } catch (error) {
      setError(error.message)
    }
  }


return (
  <div className="w-full max-w-xs m-auto">
    <div>{error && <Alert message={error} />}</div>
    <form
      onSubmit={goHome}
      className="bg-white shadow-lg rounded pt-6 mb-4 p-5"
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-fold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange}
          name="email"
          placeholder="Coloca tu email aqui"
          className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-fold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Coloca tu contrasenia aqui"
          className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-700 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor:auto; text-sm"
      >
        Create account
      </button>
    </form>
    <div className="mb-4 w-full">
      <button
        onClick={LoguinwhitAccount}
        className="bg-blue-600 hover:bg-blue-500 text-white  shadow-mf rounded border-2 border-gray-300 py-2 px-4 w-full m-1 font-bold"
      >
        Do you already have a account? Click here and login
      </button>
      <div
        onClick={handleGoogleSingIn}
        className="bg-blue-600 hover:bg-blue-500 text-white  shadow-mf rounded border-2 border-gray-300 py-2 px-4 w-full m-1 flex text-center justify-center font-bold"
      >
        Loguin with google
        <FaGoogle className="text-center m-1 text-gray-300" />
      </div>
    </div>
  </div>
);
};
