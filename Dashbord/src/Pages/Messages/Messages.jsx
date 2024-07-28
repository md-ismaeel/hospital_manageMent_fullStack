import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Slice/userSlice";
import { DnaLoader } from "../../Components/Loader/Loader";

export const Messages = () => {
    const { messages } = useSelector((state) => state.UserSlice);

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_USER_BACKEND}/allMessages`, requestOptions);
            // console.log(response.data);
            dispatch(setMessage(response.data.results));
            toast.success(response.data.message)
        } catch (err) {
            toast.error(err.response?.data?.message || "Error occurred while fetching messages");
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchMessages();
        return () => dispatch(setMessage([]));
    }, [fetchMessages, dispatch]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center rounded-l-3xl bg-slate-100">
                <DnaLoader />
            </div>
        );
    }

    return (
        <section className="messages-container w-full min-h-screen rounded-l-3xl bg-slate-100 p-4">

            {messages && messages.length > 0 ? (
                <ul className="message-list w-full flex flex-wrap justify-start items-start gap-4 overflow-y-auto">
                    {messages.map((item) => (
                        <li key={item._id} className="message-item w-[280px] h-[200px] bg-slate-300 rounded-lg shadow-md px-4 py-3 overflow-scroll">
                            <h3 className="text-md">Name:- <span className="font-semibold ml-1 text-gray-600">{`${item.firstName} ${item.lastName}`}</span></h3>
                            <p className="mt-1">Email:- <span className="text-gray-600">{item.email}</span></p>
                            <p className="mt-1">Phone:- <span className="text-gray-600">{item.phone}</span></p>
                            <p className="mt-1">Messages:- <span className="text-gray-600">{item.message}</span></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="no-messages flex justify-center mt-10 text-2xl font-semibold text-teal-500">
                    No Messages Found!
                </div>
            )}

        </section>
    );
};