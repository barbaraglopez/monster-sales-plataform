import { useState } from 'react'
import './Sidebar.css'
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../context/useContext'
import Swal from "sweetalert2";

import { FaArrowLeftLong, FaUser } from "react-icons/fa6";
import {
    BsSearchHeart,
    BsFillHeartFill,
    BsFillMouse2Fill,
    BsArrowDownShort,
    BsCartFill,
    BsPersonXFill,
} from "react-icons/bs";
import { ImCart } from "react-icons/im";
import { CgDarkMode } from "react-icons/cg";


function Sidebar() {
    const { theme, setTheme} = useAuth()
    const [open, setOpen] = useState(true)
    const [submenuOpen, setsubmenuOpen] = useState(false);
    const navigate = useNavigate();
const [isLogout] = useState(false);

    const Menus = [
      {
        title: "Profile",
        icon: <FaUser className="dark:text-blue-300 text-white" />,
        url: "/profile",
      },
      {
        title: "Cart",
        icon: <ImCart className="dark:text-blue-300 text-white" />,
        url: "/cart",
      },
      {
        title: "Logout",
        icon: <BsPersonXFill className="dark:text-blue-300 text-white" />,
        evento: false,
      },
      {
        title: "Change theme",
        icon: <CgDarkMode className="dark:text-blue-300 text-white" />,
        evento: true,
      },
    ];

      const handleEventsSidebar = (parametro1, parametro2) => {
        if (parametro1) {
          navigate(parametro1);
        } else if (parametro2) {
          darkmode();
          } else{
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
const darkmode=()=>{
    theme == "ligth" ? setTheme("dark") : setTheme("ligth")
}

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


    return (
      <div
        className={`dark:bg-neutral-950 text-white bg-gray-700 font-bold "flex p-5 pt-8 max-lg:hidden ${
          open ? "w-72" : "w-20"
        } relative duration-400`}
      >
        <FaArrowLeftLong
          className={`bg-white text-violet-800 text-2xl p-1 rounded-full absolute top-9 -right-3 border-black cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <BsFillHeartFill
            className={` dark:text-blue-300 text-red-800 text-2xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <p
            className={`text-white text-1xl origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            Welcome!
          </p>
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-white font-semibold text-sm flex items-center gap-x-10 cursor-pointer p-3 dark:hover:bg-gray-700 hover:bg-slate-500 hover:rounded-md`}
              >
                <span
                  className="text-2xl block"
                  onClick={() => handleEventsSidebar(menu.url, menu.evento)}
                >
                  {menu.icon ? (
                    menu.icon
                  ) : (
                    <BsFillMouse2Fill className="dark:text-blue-300 text-white" />
                  )}
                </span>
                <span
                  className={`text-base font-bold ${!open && "hidden"}`}
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
                        navigate(
                          submenuItems.url,
                        )
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
        {isLogout? showAlert() : <></>}
      </div>
    );
}

export default Sidebar