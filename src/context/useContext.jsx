import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { auth} from "../firebase/config";
import { getAllProducts } from "../pages/services/products";

export const AppContext = createContext();

//funcion corta para exportar el context
export const useAuth = () => {
  const context = useContext(AppContext);
  return context;
};

//Funcion para mantener la funcion abierta
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //funcion para dark mood
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") !== "dark" ? "ligth" : "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    const removeOldTheme = theme === "dark"? "ligth" : "dark"

    root.classList.remove(removeOldTheme)
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsuscribe();
  }, []);

  //funcion para registarme por primera vez
  const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = createUserWithEmailAndPassword(auth, email, password);
      if (error) {
        reject(new Error("se produjo un error"));
      } else {
        resolve(user);
      }
    });
  };

  // funcion para loguearme con usuario registrado
  const loguinUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = signInWithEmailAndPassword(auth, email, password);
      if (error) {
        reject(new Error("se produjo un error"));
      } else {
        resolve(user);
      }
    });
  };

  //funcion para cerrar sesion
  const logOut = () => signOut(auth)

  //funcion para loguearme con cuenta de google
  const loguinWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  //Funcion para mostrar mis productos
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seetError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataProducts = await getAllProducts();
        setData(dataProducts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        seetError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  //Funcion para mi carrito de compras
  const [cart, setCart] = useState([]);
  const [card, setCard] = useState([]);
  const [total, setTotal] = useState();

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        logOut,
        loguinUser,
        registerUser,
        setCard,
        card,
        user,
        data,
        cart,
        setCart,
        total,
        setTotal,
        loguinWithGoogle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
