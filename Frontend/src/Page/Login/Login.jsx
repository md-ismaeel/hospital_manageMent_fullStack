import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "../../Redux/Slice/userSlice";
import { InputForm } from "../../Components/InputForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";
import { DnaLoader } from "../../Components/Loader/Loader";

export const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userFormData = { email, password };

        try {
            const response = await axios.post(
                `${API_USER_BACKEND}/login`,
                userFormData,
                requestOptions
            );

            toast.success(response?.data?.message);
            dispatch(setAuthenticated(true));
            navigate("/");
            resetForm();
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Error occurred while logging in"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <section className="w-full flex justify-center items-center">
            <form
                onSubmit={handleForm}
                className="w-[500px] h-[400px] flex flex-col justify-center items-center gap-4 border mt-20 rounded-md"
            >
                <InputForm
                    type="email"
                    value={email}
                    placeHolder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                    type="password"
                    value={password}
                    placeHolder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-[400px] mt-4 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    disabled={loading}
                >
                    {loading ? <DnaLoader /> : "Login"}
                </button>

                <p>
                    New user visiting for the first time?
                    <span
                        onClick={() => navigate("/register")}
                        className="ml-2 cursor-pointer hover:text-blue-400 hover:underline"
                    >
                        Register
                    </span>
                </p>

            </form>
        </section>
    );
};
