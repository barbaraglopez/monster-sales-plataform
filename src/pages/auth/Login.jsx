import { useState } from "react";
import { useAuth } from "../../context/useContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "../../components/Alert";


export const Login = () => {
   const [error, setError] = useState(false);
   const navigate = useNavigate();
  const { loguinUser } = useAuth();

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

  const loguin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loguinUser(values.email, values.password);
      navigate("/Home");
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="w-full max-w-xs m-auto">
      <div>{error && <Alert message={error} />}</div>
      <form
        onSubmit={loguin}
        className="bg-white shadow-lg rounded pt-6 mb-4 p-5"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-fold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Coloca tu email aqui"
            onChange={handleChange}
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-fold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="Coloca tu contrasenia aqui"
            onChange={handleChange}
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button className="bg-gray-700 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor:auto; text-sm">
          Login
        </button>
      </form>
      <Link
        to={"/"}
        className="bg-blue-500 hover:bg-blue-400 text-white p-2 m-2 rounded focus:shadow-outline text-sm font-bold"
      >
        Don't have an account yet ? Sign up
      </Link>
    </div>
  );
};
