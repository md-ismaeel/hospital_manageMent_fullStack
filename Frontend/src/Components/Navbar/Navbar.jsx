import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "./../../assets/logo/med-logo.png";
import { API_USER_BACKEND } from "../../Utils/utils";
import { setAuthenticated } from "../../Redux/Slice/userSlice";
import { TailSpinLoader } from "../Loader/Loader";

export const Navbar = () => {
    const { isAuthenticated } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_USER_BACKEND}/logout`, {}, {
                withCredentials: true
            });
            dispatch(setAuthenticated(false));
            toast.success(response.data.message);
            navigate("/")

        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-full h-[60px] fixed flex justify-between items-center px-20 bg-slate-50 z-50 font-medium border-b">
            <span onClick={() => navigate("/")} className="cursor-pointer">
                <img
                    src={logo}
                    alt="logo"
                    className="w-[70px] h-[70px]"
                />
            </span>

            <ul className="flex justify-center items-center gap-6">
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-yellow-500" : ""}>Home</NavLink>
                <NavLink to={"/appointment"} className={({ isActive }) => isActive ? "text-yellow-500" : ""}>Appointment</NavLink>
                <NavLink to={"/about"} className={({ isActive }) => isActive ? "text-yellow-500" : ""}>About Us</NavLink>
            </ul>

            {!isAuthenticated ? (
                <button
                    type="button"
                    className="relative text-white flex justify-center items-center gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-700"
                    onClick={() => navigate("/login")}
                    disabled={isLoading}
                    aria-busy={isLoading}
                >
                    <span>Login</span>
                    <span className="absolute top-2 right-2">{isLoading && <TailSpinLoader />}</span>
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
                    <span className="absolute top-2 right-2">{isLoading && <TailSpinLoader />}</span>
                </button>
            )}

        </div>
    );
};
