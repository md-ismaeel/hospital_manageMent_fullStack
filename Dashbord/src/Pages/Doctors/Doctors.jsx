import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctor } from "../../Redux/Slice/userSlice";
import axios from 'axios';
import { API_USER_BACKEND, requestOptions } from '../../Utils/utils';
import { DnaLoader } from '../../Components/Loader/Loader';
import { toast } from 'react-toastify';

export const Doctors = () => {
    const { doctor } = useSelector((state) => state.UserSlice);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const fetchDoctors = async () => {
        setLoading(true);
        // setError(null); // Reset error state before fetching

        try {
            const response = await axios.get(`${API_USER_BACKEND}/allDoctors`, requestOptions);
            console.log(response);
            dispatch(setDoctor(response.data.doctors));
            toast.success(response.data.message)

        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message || 'An error occurred while fetching doctors!')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();

        return () => dispatch(setDoctor([]));
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center rounded-l-3xl bg-slate-100">
                <DnaLoader />
            </div>
        );
    }

    return (
        <section className="w-full min-h-screen flex flex-col justify-start items-start rounded-l-3xl bg-slate-100 px-5">
            <h1 className="text-2xl font-bold mb-4 mt-3">Doctors List</h1>
            <ul className="w-full flex flex-wrap justify-start items-center gap-3">
                {doctor.length > 0 ? (
                    doctor.map((doc) => (
                        <li key={doc._id} className="w-[270px] h-[300px] border-2 px-3 py-1 rounded-xl shadow">
                            <img src={doc.docAvatar} alt={doc.firstName} className='w-full h-[150px] rounded-md mt-1 mb-2' />
                            <h3 className="text-md">Name:- <span className="font-semibold ml-1 text-gray-600">{`${doc.firstName} ${doc.lastName}`}</span></h3>
                            <p className="mt-1">Email:- <span className="text-gray-600">{doc.email}</span></p>
                            <p className="mt-1">Phone:- <span className="text-gray-600">{doc.phone}</span></p>
                            <p className="mt-1">Department:- <span className="text-gray-600">{doc.docDepartment}</span></p>
                        </li>
                    ))
                ) : (
                    <p>No doctors found.</p>
                )}
            </ul>
        </section>
    );
};