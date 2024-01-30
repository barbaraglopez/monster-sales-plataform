import { useState ,useEffect, useContext } from "react";
import { AppContext, useAuth } from '../context/useContext'
import { getAllProducts } from './services/products'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import { useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClipLoader";                                                                                            


export const Home = () => {
  const { setCard } = useContext(AppContext);

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seetError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataProducts = await getAllProducts();
        setProducts(dataProducts);
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

const seeDetail=(product)=>{
  let cardDetail = {...product};
  cardDetail.cantidad = 1
  setCard(cardDetail)
  setLoading(true)
  setTimeout(() => {
    navigate("/cards");
  }, 3000);
}

//spinner 
if(loading) return (
  <ClockLoader
    color={"#2E86C1"}
    loading={loading}
    size={100}
    className="mt-24"
  />
);                                            

  return (
    <div className="">
      <div className="flex">
        <Sidebar />
        <div className="">
          <Navbar />
          {error && <p>Error 404 not found</p>}
          {loading && (
            <ClockLoader
              color={"#2E86C1"}
              loading={loading}
              cssOverride={override}
              size={150}
            />
          )}
          <div className="grid grid-cols-4 grid-rows-1 mb-40 max-md:grid-cols-2 max-lg:grid-cols-3 max-sm:flex max-sm:flex-col max-sm:items-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 bg-blue-400 dark:border-gray-700 m-2 flex flex-col items-center max-sm:w-full                        "
              >
                <a href="#" className="">
                  <img src={product.img} className="rounded-lg h-72 mt-4" />
                </a>
                <div className="p-2">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {`Name : ${product.name}`}
                  </h5>
                </div>
                <button
                  className="nline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-3"
                  onClick={() => seeDetail(product)}
                >
                  See More ...
                </button>
              </div>
            ))}
          </div>
          {!products.length && !loading && <p>No hay productos</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};
