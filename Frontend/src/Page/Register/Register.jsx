import React, { useState } from "react";
import axios from "axios";
import { InputForm } from "../../Components/InputForm";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DnaLoader } from "../../Components/Loader/Loader";
import userLogo from "../../assets/logo/user-icon.webp"
import { PiUserCircleFill } from "react-icons/pi";


export const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formData = [
        { name: "First Name", value: firstName, type: "text", onChange: setFirstName, },
        { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
        { name: "Email", value: email, type: "email", onChange: setEmail },
        { name: "Password", value: password, type: "password", onChange: setPassword, },
        { name: "Gender", value: gender, type: "select", options: ["M", "F", "T", "O"], onChange: setGender, },
        { name: "Phone", value: phone, type: "number", onChange: setPhone },
        { name: "Date of Birth", value: dob, type: "date", onChange: setDob },
    ];

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setGender("");
        setPhone("");
        setDob("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userObj = { firstName, lastName, email, password, gender, phone, dob };
        setLoading(true);
        try {
            const response = await axios.post(`${API_USER_BACKEND}/register/patient`, userObj, requestOptions);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
                resetForm();
                navigate("/login");
            } else {
                // Handle case where success is false but no error was thrown
                toast.error(response.data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="login-form relative w-[500px] min-h-[450px] flex flex-col justify-center items-center gap-2 mt-20 mb-10 py-4 border-2 rounded-3xl"
            >
                <div className="flex flex-col justify-center items-center mt-2 mb-6">
                    <h1 ><PiUserCircleFill className="text-7xl" /></h1>
                    {/* <img src={userLogo} alt="logo" className="text-2xl h-[65px] w-[110px]" /> */}
                    <h1 className="text-2xl font-semibold text-slate-500">Registration Form</h1>
                </div>

                {formData.map((item, index) => (
                    <InputForm
                        key={index}
                        placeHolder={item.name}
                        value={item.value}
                        type={item.type}
                        options={item.options}
                        onChange={(e) => item.onChange(e.target.value)}
                    />
                ))}

                <button
                    type="submit"
                    className="btn-login relative w-[400px] mt-4 flex justify-center items-center gap-2 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    disabled={loading}
                >
                    <span> Register</span>
                    <span className="absolute right-[30%]">{loading && <DnaLoader />}</span>
                </button>

                <p className="mb-4">
                    Already have an account?
                    <span
                        onClick={() => navigate("/login")}
                        className="ml-2 cursor-pointer hover:text-blue-400 hover:underline"
                    >
                        Login Now!
                    </span>
                </p>
            </form>
        </div>
    );
};
