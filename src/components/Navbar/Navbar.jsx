import { useState , useEffect} from "react";
import {FaPhoneVolume} from "react-icons/fa6";
import { GiGhost} from "react-icons/gi";
import {useAuth , AppContext} from '../../context/useContext'
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  BsArrowDownShort,
} from "react-icons/bs";
import Swal from "sweetalert2";

import "./Navbar.css";
import { useContext } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLogout] = useState(false);

  const Menus = [
    {
      title: "Profile",
      url: "/profile",
    },
    {
      title: "Cart",
      url: "/cart",
    },
    {
      title: "Logout",
      evento: false,
    },
    {
      title: "Change theme",
      evento: true,
    },
  ];

  const handleEventsSidebar = (parametro1, parametro2) => {
    if (parametro1) {
      navigate(parametro1);
    } else if (parametro2) {
      darkmode();
    } else {
      handleLogout();
    }
  };

  //funcion para cerrar sesion

  const handleLogout = () => {
    const showAlert = () => {
      Swal.fire({
        title: "Warning",
        text: "Are you sure you want to logout?",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#C0392B",
        confirmButtonText: "Yes",
        confirmButtonColor: "#239B56",
        iconColor: "#000000",
      }).then((response) => {
        if (response.isConfirmed) {
          Swal.fire("Succes", "your session closed", "success");
          navigate("/");
        } else if (response.isDenied) {
          Swal.fire("Info", "Ok, you still online", "info");
        } else {
          Swal.fire("Info", "Error", "something unexpected happened", "info");
        }
      });
    };

    showAlert();
  };

  //funcion para darkmode
  const darkmode = () => {
    theme == "ligth" ? setTheme("dark") : setTheme("ligth");
  };

  return (
    <div className="">
      <nav class=" border-gray-200 dark:bg-black w-screen max-lg:flex max-lg:justify-between bg-gray-700 text-white">
        <div class="flex flex-wrap justify-between items-center mx-9 max-w-screen-xl p-4 max-lg:flex-col max-lg:items-start dark:bg-black">
          <a href="#" class="flex items-center dark:bg-black">
            <GiGhost className="text-blue-300 text-3xl mr-2 dark:bg-black" />
            <span class="dar:bg-black self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Monster service
            </span>
          </a>
          <div class="flex items-center dark:bg-black">
            <a
              href="tel:543624712603"
              class="dark:bg-black mr-2 text-sm  dark:text-white bg-gray-700 hover:underline flex items-center"
            >
              Call us and hire our services! (54) 3624712603
              <FaPhoneVolume className="mx-1 text-blue-300 bg-gray-700" />
            </a>
          </div>
        </div>
        <div
          className="text-white hidden max-lg:inline-block p-3 m-5 mr-10"
          onClick={() => setOpen(!open)}
        >
          <AiOutlineMenu className="text-4xl border p-1 cursor-pointer hover:text-blue-300 hover:border-blue-300" />
        </div>
      </nav>
      <nav class="dark:bg-gray-700 bg-slate-400">
        <div class="max-w-screen-xl px-4 py-3 mx-auto dark:bg-gray-700 bg-slate-400">
          <div class="flex items-center dark:bg-gray-700">
            <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm dark:bg-gray-700">
              <li className="dark:bg-gray-700">
                <a
                  href="http://go-60de6c82-be11-98e1-4d6c-c65a234eee95.disney.io/monstersinc/index.html"
                  class="dark:bg-gray-700 text-black dark:text-white hover:underline font-bold"
                >
                  Company
                </a>
              </li>
              <li className="dark:bg-gray-700">
                <a
                  href="http://go-60de6c82-be11-98e1-4d6c-c65a234eee95.disney.io/monstersinc/characters.html#/0"
                  class="dark:bg-gray-700 text-black dark:text-white hover:underline font-bold"
                >
                  Team
                </a>
              </li>
              <li className="dark:bg-gray-700">
                <a
                  href="https://www.linkedin.com/in/barbara-lopez-it"
                  class="dark:bg-gray-700 text-black dark:text-white hover:underline font-bold"
                >
                  SEO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul className={`${!open && "hidden"}`}>
        {Menus.map((menu, index) => (
          <>
            <li
              key={index}
              className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 dark:bg-black bg-gray-700 hover:bg-slate-500 dark:hover:bg-gray-700`}
            >
              <span
                className="text-2xl block"
                onClick={() => handleEventsSidebar(menu.url, menu.evento)}
              ></span>
              <span
                className={`text-base font-medium flex-1 ${!open && "hidden"}`}
                onClick={() => handleEventsSidebar(menu.url, menu.evento)}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsArrowDownShort
                  className={`text-2xl bg-white rounded-full text-black  ${
                    submenuOpen && "rotate-180"
                  }`}
                  onClick={() => setsubmenuOpen(!submenuOpen)}
                />
              )}
            </li>
            {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItems.map((submenuItems, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleEventsSidebar(submenuItems.url, submenuItems.evento)
                    }
                    className={`text-gray-300 text-sm hover:bg-gray-700 flex items-center gap-x-4 cursor-pointer p-2 px-5`}
                  >
                    {submenuItems.title}
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
      {isLogout ? showAlert() : <></>}
    </div>
  );
};

export default Navbar;
