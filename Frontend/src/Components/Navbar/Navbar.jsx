import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../assets/Medical-log.png";
import { API_USER_BACKEND } from "../../Utils/utils";
import { setAuthenticated } from "../../Redux/Slice/userSlice";

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

            if (response.data.success) {
                dispatch(setAuthenticated(false));
                toast.success(response.data.message);
                navigate("/")
            } else {
                throw new Error(response.data.message || "Logout failed")
            }

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
                    className="w-[50px] h-[50px] rounded-full"
                />
            </span>

            <ul className="flex justify-center items-center gap-3">
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-yellow-500" : ""}>Home</NavLink>
                <NavLink to={"/appointment"} className={({ isActive }) => isActive ? "text-yellow-500" : ""}>Appointment</NavLink>
                <NavLink to={"/about"} className={({ isActive }) => isActive ? "text-yellow-500" : ""}>About Us</NavLink>
            </ul>

            {!isAuthenticated ? (
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => navigate("/login")}
                    disabled={isLoading}
                    aria-busy={isLoading}
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
            ) : (
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={handleLogout}
                    disabled={isLoading}
                    aria-busy={isLoading}
                >
                    {isLoading ? "Loading..." : "Logout"}
                </button>
            )}
        </div>
    );
};
