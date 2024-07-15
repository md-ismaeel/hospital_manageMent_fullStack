import { useState } from "react";
import { InputForm } from "../InputForm";
import { toast } from "react-toastify";
import axios from "axios";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";

export const Message = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const formData = [
        { name: "First Name", value: firstName, type: "text", onChange: setFirstName, },
        { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
        { name: "Email", value: email, type: "email", onChange: setEmail },
        { name: "Phone", value: phone, type: "number", onChange: setPhone },
    ];

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userFormData = { firstName, lastName, email, phone, message };
        try {
            const response = await axios.post(
                `${API_USER_BACKEND}/sendMessage`,
                userFormData,
                requestOptions
            );
            toast.success(response?.data?.message);
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error occurred while sending message");
        }
    };

    return (
        <>
            <section className="w-full h-auto flex flex-col justify-center items-center mt-20">
                <h2 className="mb-6 text-2xl font-semibold">Send Us A Message</h2>

                <form
                    onSubmit={handleSubmit}
                    className="w-11/12 min-h-[200px] flex flex-wrap justify-center items-center bg-white border rounded gap-4 py-10 mb-10"
                >
                    {formData.map((item, index) => (
                        <InputForm
                            key={index}
                            placeHolder={item.name}
                            value={item.value}
                            type={item.type}
                            onChange={(e) => item.onChange(e.target.value)}
                        />
                    ))}

                    <textarea
                        type="text"
                        name="Enter message"
                        placeholder="Enter message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-[820px] h-[150px] border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <button
                        type="submit"
                        // className="w-[350px] h-[50px] mt-4 bg-blue-500 text-white p-2 rounded"
                        className="w-[350px] h-[50px] mt-4 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </>
    );
};






