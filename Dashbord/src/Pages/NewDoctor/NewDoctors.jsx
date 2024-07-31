import React, { useState } from "react";
import axios from "axios";
import { InputForm } from "../../Components/InputForm";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DnaLoader } from "../../Components/Loader/Loader";
import { PiUserCircleFill } from "react-icons/pi";

export const NewDoctors = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [doctorDepartment, setDoctorDepartment] = useState("");
    const [docAvatar, setDocAvatar] = useState(null);
    const [docAvatarPreview, setDocAvatarPreview] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAvatar = (e) => {
        const img = e.target.files[0];
        if (img) {
            setDocAvatar(img);
            setDocAvatarPreview(URL.createObjectURL(img));
        }
    };

    const departmentsArray = [
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    const formData = [
        {
            name: "First Name", value: firstName, type: "text", onChange: setFirstName,
        },
        { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
        { name: "Email", value: email, type: "email", onChange: setEmail },
        {
            name: "Password", value: password, type: "password", onChange: setPassword,
        },
        {
            name: "Gender", value: gender, type: "select", options: ["Male", "Female", "Other"], onChange: setGender,
        },
        {
            name: "doctorDepartment", value: doctorDepartment, type: "select", options: departmentsArray, onChange: setDoctorDepartment,
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
        setDoctorDepartment("");
        setDocAvatar(null);
        setDocAvatarPreview("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("gender", gender);
        formData.append("phone", phone);
        formData.append("dob", dob);
        formData.append("doctorDepartment", doctorDepartment);
        if (docAvatar) formData.append("docAvatar", docAvatar);

        try {
            const response = await axios.post(`${API_USER_BACKEND}/register/doctor`, formData,
                {
                    headers: {
                        // ...requestOptions.headers,
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });

            if (response.data.success === true) {
                navigate("/login");
                toast.success(response.data.message);
                resetForm();
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="newAdmin w-full h-full flex flex-col justify-start items-center bg-slate-100 rounded-l-3xl px-10 overflow-y-scroll">
            <form
                onSubmit={handleSubmit}
                className="relative w-[500px] flex flex-col justify-center items-center gap-2 py-4 border-2 rounded-3xl mt-6 mb-10"
            >
                <div className="flex flex-col justify-center items-center mt-2 mb-6">
                    <h1><PiUserCircleFill className="text-7xl text-slate-600" /></h1>
                    <h1 className="text-2xl font-semibold text-slate-500">Add New Doctor</h1>
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

                <div className="w-[400px] flex flex-col justify-start items-center gap-2 border rounded-md py-1">
                    <div className="h-[180px] w-[100%] rounded-md bg-white">
                        {docAvatarPreview ? (
                            <img
                                src={docAvatarPreview}
                                alt="doc-img"
                                className="h-[100%] w-[100%] rounded-md"
                            />
                        ) : (
                            <p className="flex text-xl justify-center items-center w-full h-full">select an image from your computer</p>
                        )}
                    </div>

                    <input
                        type="file"
                        onChange={handleAvatar}

                    />
                </div>

                <button
                    type="submit"
                    className="relative w-[400px] mt-4 flex justify-center items-center gap-2 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    disabled={loading}
                >
                    <span> Register</span>
                    <span className="absolute right-[30%]">{loading && <DnaLoader />}</span>
                </button>

                <p className="mb-4"></p>
            </form>
        </section>
    );
};