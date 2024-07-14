import React, { useState } from 'react';
import axios from "axios";
import { InputForm } from '../../Components/InputForm';
import { API_USER_BACKEND, requestOptions } from '../../Utils/utils';
import { toast } from 'react-toastify';

export const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");

    const formData = [
        { name: "First Name", value: firstName, type: 'text', onChange: setFirstName },
        { name: "Last Name", value: lastName, type: 'text', onChange: setLastName },
        { name: "Email", value: email, type: 'email', onChange: setEmail },
        { name: "Password", value: password, type: 'password', onChange: setPassword },
        { name: "Gender", value: gender, type: 'text', onChange: setGender },
        { name: "Phone", value: phone, type: 'number', onChange: setPhone },
        { name: "Date of Birth", value: dob, type: 'date', onChange: setDob },
    ];

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setGender("");
        setPhone("");
        setDob("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userObj = {
            firstName, lastName, email, password, gender, phone, dob
        }
        try {
            const response = await axios.post(`${API_USER_BACKEND}/register/patient`, userObj, requestOptions);
            const data = response
            console.log(data);
            if (data) {
                toast.success(response.data.message)
            }
            resetForm()
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-[500px] h-[450px] flex flex-col justify-center items-center gap-2 mt-20 bg-white p-8 shadow-xl rounded'>
                {formData.map((item, index) => (
                    <InputForm
                        key={index}
                        placeHolder={item.name}
                        value={item.value}
                        type={item.type}
                        onChange={(e) => item.onChange(e.target.value)}
                    />
                ))}
                <button type="submit" className='w-[400px] mt-4 bg-blue-500 text-white p-2 rounded'>Register</button>
            </form>
            <div className='w-[500px]'>
                <p>already account</p>
            </div>
        </div>
    );
}
