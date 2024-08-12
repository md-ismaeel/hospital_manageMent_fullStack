import React from "react";
import logo from "../assets/logo/health-center.png";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithubSquare,
} from "react-icons/fa";

export const Footer = () => {
  const data = [
    { link: "https://www.instagram.com/ismail_15_/", icon: <FaInstagram /> },
    { link: "https://www.linkedin.com/in/md-ismaeel/", icon: <FaLinkedin /> },
    { link: "https://x.com/impossible_br03", icon: <FaTwitter /> },
    { link: "https://github.com/md-ismaeel", icon: <FaGithubSquare /> },
  ];

  return (
    <>
      <section className="w-full border-t-2 flex flex-col md:flex-row justify-evenly items-center md:items-start py-10 px-4">
        <img
          src={logo}
          alt="img"
          className="w-[150px] h-[75px] md:w-[200px] md:h-[100px] mb-6 md:mb-0"
        />
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-xl font-semibold mb-3">Contact</h1>
          <p>Email: mdismaeelkhan345@gmail.com</p>
          <p>phone: 9949722501</p>
          <p>Monday - Friday 24x7</p>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-3">Social</h1>
          <div className="social flex text-2xl md:text-3xl gap-3 justify-center">
            {data.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${
                    i === 0
                      ? "text-pink-600 hover:bg-pink-100 focus:ring-pink-500"
                      : i === 1
                      ? "text-blue-600 hover:bg-blue-100 focus:ring-blue-500"
                      : i === 2
                      ? "text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
                      : "text-black hover:bg-gray-100 focus:ring-gray-500"
                  } 
                  inline-block p-2 rounded-full transition-all duration-300 ease-in-out transform 
                  hover:scale-110 hover:rotate-12 hover:shadow-lg
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  animate-pulse
                `}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
