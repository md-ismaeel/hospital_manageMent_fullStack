import React, { useState } from "react";
import axios from "axios";
import { InputForm } from "../../Components/InputForm";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DnaLoader } from "../../Components/Loader/Loader";


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
        {
            name: "First Name",
            value: firstName,
            type: "text",
            onChange: setFirstName,
        },
        { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
        { name: "Email", value: email, type: "email", onChange: setEmail },
        {
            name: "Password",
            value: password,
            type: "password",
            onChange: setPassword,
        },
        {
            name: "Gender",
            value: gender,
            type: "select",
            options: ["Male", "Female", "Other"],
            onChange: setGender,
        },
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

        const userObj = {
            firstName,
            lastName,
            email,
            password,
            gender,
            phone,
            dob,
        };
        setLoading(true);
        try {
            const response = await axios.post(
                `${API_USER_BACKEND}/register/patient`,
                userObj,
                requestOptions
            );
            const data = response.data;
            console.log(data);

            toast.success(response.data.message);

            resetForm();
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-[500px] min-h-[450px] flex flex-col justify-center items-center gap-2 mt-16 mb-10 bg-white p-8 border rounded"
            >
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
                    className="w-[400px] mt-4 flex justify-center items-center gap-2 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    disabled={loading}
                >
                    <span> Register</span>
                    <span>{loading && <DnaLoader />}</span>
                </button>

                <p>
                    Already have an account?
                    <span
                        onClick={() => navigate("/login")}
                        className="ml-2 cursor-pointer hover:text-blue-400 hover:underline"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};
