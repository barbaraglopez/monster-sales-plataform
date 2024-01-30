import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa6";;

const Footer = () => {

    return (
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 mt-auto bg-gray-700 border-t border-gray-200 shadow-xl md:flex md:items-center md:justify-between md:p-6 dark:bg-black dark:border-gray-600">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between max-sm:flex max-sm:flex-col max-sm:items-center max-lg:flex-col dark:bg-black">
          <span class="text-sm sm:text-center text-white dark:text-gray-400 dark:bg-black">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline dark:bg-black">
              Barbara Lopez™
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
            <li className="dark:bg-black">
              <a
                href="https://www.linkedin.com/in/barbara-lopez-it"
                class="mr-4 hover:underline md:mr-6 flex items-center dark:bg-black"
              >
                Linkedin
                <FaLinkedin className="mx-1 text-blue-300 text-xl dark:bg-black" />
              </a>
            </li>
            <li className="dark:bg-black">
              <a
                href="https://github.com/barbaraglopez"
                class="mr-4 hover:underline md:mr-6 flex items-center dark:bg-black"
              >
                Github
                <FaGithub className="mx-1 text-blue-300 text-xl dark:bg-black" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
};

export default Footer;
