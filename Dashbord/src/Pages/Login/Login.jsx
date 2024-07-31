import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../Redux/Slice/userSlice";
import { InputForm } from "../../Components/InputForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";
import { DnaLoader } from "../../Components/Loader/Loader";
import { PiUserCircleFill } from "react-icons/pi";


export const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.UserSlice);
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
            const response = await axios.post(`${API_USER_BACKEND}/login`, userFormData, requestOptions);
            dispatch(setIsAuthenticated(true));
            toast.success(response.data.message);
            navigate("/");
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error occurred while logging in");
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
        <section className="w-full min-h-screen flex flex-col justify-center items-center">
            <div className="text-2xl font-semibold">Welcome to HealthCare Center</div>
            <form
                onSubmit={handleForm}
                className="w-[450px] min-h-[100px] flex flex-col justify-center items-center gap-4 border-2  py-4 rounded-3xl mt-4"
            >
                <div className="flex flex-col justify-center items-center mt-2 mb-2">
                    <h1 ><PiUserCircleFill className="text-7xl text-slate-600" /></h1>
                    <h1 className="text-2xl font-semibold text-slate-500">Login</h1>
                </div>

                <p className="text-md text-slate-600">only admin can Login</p>
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
                    className="relative w-[400px] mt-4 text-md flex justify-center items-center gap-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                    disabled={loading}
                >
                    <span className="">Login</span>
                    <span className="absolute right-[35%]">{loading && <DnaLoader />}</span>
                </button>

                <p className="mb-1">
                    {isAuthenticated && (
                        <>
                            Don't have an account?
                            <span
                                onClick={() => navigate("/register")}
                                className="ml-2 cursor-pointer hover:text-blue-400 hover:underline"
                            >
                                Register
                            </span>
                        </>
                    )}
                </p>

            </form>
        </section>
    );
};
