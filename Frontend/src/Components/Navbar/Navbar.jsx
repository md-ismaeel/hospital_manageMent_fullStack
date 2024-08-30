import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logo from "./../../assets/logo/health-center.png";
import { API_USER_BACKEND } from "../../Utils/utils";
import { setIsAuthenticated, setUser } from "../../Redux/Slice/userSlice";
import { TailSpinLoader } from "../Loader/Loader";
import { CiMenuBurger } from "react-icons/ci";
import { VscChromeClose } from "react-icons/vsc";
import axios from "axios";
import "../Navbar/Navbar.css";

export const Navbar = () => {
    const { isAuthenticated } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_USER_BACKEND}/logout`, {}, {
                withCredentials: true
            });
            dispatch(setIsAuthenticated(false));
            dispatch(setUser({}));
            localStorage.clear();
            toast.success(response.data.message);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed");
        } finally {
            setIsLoading(false);
        }
    };

    const getActiveClass = ({ isActive }) => (isActive ? "text-yellow-500" : "");

    const handleMenuToggle = () => setShowMenu(!showMenu);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && showMenu) setShowMenu(false);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showMenu]);

    return (
        <div className="main-container w-full h-[60px] fixed flex justify-between items-center px-10 bg-slate-50 z-50 font-medium border-b">
            <span onClick={() => navigate("/")} className="cursor-pointer">
                <img src={logo} alt="logo" className="w-[70px] h-[50px]" />
            </span>

            <ul className="ul-pages flex justify-center items-center gap-6">
                <NavLink to="/" className={getActiveClass}>Home</NavLink>
                <NavLink to="/appointment" className={getActiveClass}>Appointment</NavLink>
                <NavLink to="/about" className={getActiveClass}>About Us</NavLink>
                <NavLink to="https://hospital-manage-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer" className={getActiveClass}>Admin</NavLink>
            </ul>

            <div className="login-btn">
                {!isAuthenticated ? (
                    <button
                        type="button"
                        className="relative text-white flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-700"
                        onClick={() => navigate("/login")}
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        <span>Login</span>
                        {isLoading && <span className="absolute top-2 right-2"><TailSpinLoader /></span>}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="text-white flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-700"
                        onClick={handleLogout}
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        <span>Logout</span>
                        {isLoading && <span className="absolute top-2 right-2"><TailSpinLoader /></span>}
                    </button>
                )}
            </div>

            {/* Small screen menu */}
            <div className="small-screen w-full">
                <div className="w-full flex justify-end items-center">
                    <button
                        className="icon relative text-2xl"
                        onClick={handleMenuToggle}
                        aria-label={showMenu ? "Close Menu" : "Open Menu"}
                    >
                        {showMenu ? <VscChromeClose /> : <CiMenuBurger />}
                    </button>
                </div>
                {showMenu && <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleMenuToggle}
                    aria-hidden="true"
                >
                </div>}

                <div className={`w-[50%] h-screen fixed top-0 right-0 z-50 py-10 px-6 transition-all duration-500 ease-in-out transform ${showMenu ? "translate-x-0 opacity-100 bg-white" : "translate-x-full"
                    }`}
                >
                    <span onClick={handleMenuToggle} className="absolute top-0 right-0 text-2xl text-red-500 p-4">
                        <VscChromeClose />
                    </span>
                    <ul className="flex flex-col justify-center items-start gap-6">
                        <NavLink to="/" className={getActiveClass} onClick={handleMenuToggle}>Home</NavLink>
                        <NavLink to="/appointment" className={getActiveClass} onClick={handleMenuToggle}>Appointment</NavLink>
                        <NavLink to="/about" className={getActiveClass} onClick={handleMenuToggle}>About Us</NavLink>
                        <NavLink to="https://hospital-manage-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer" className={getActiveClass} onClick={handleMenuToggle}>Admin</NavLink>
                    </ul>

                    <div className="mt-5">
                        {!isAuthenticated ? (
                            <button
                                type="button"
                                className="relative text-white flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-700"
                                onClick={() => {
                                    navigate("/login");
                                    handleMenuToggle();
                                }}
                                disabled={isLoading}
                                aria-busy={isLoading}
                            >
                                <span>Login</span>
                                {isLoading && <span className="absolute top-2 right-2"><TailSpinLoader /></span>}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="text-white flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-700"
                                onClick={() => {
                                    handleLogout();
                                    handleMenuToggle();
                                }}
                                disabled={isLoading}
                                aria-busy={isLoading}
                            >
                                <span>Logout</span>
                                {isLoading && <span className="absolute top-2 right-2"><TailSpinLoader /></span>}
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
