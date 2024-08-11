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

    const fetchDoctors = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API_USER_BACKEND}/allDoctors`, requestOptions);
            console.log(response);
            dispatch(setDoctor(response.data.doctors));
            toast.success(response.data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message || 'An error occurred while fetching doctors!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();

        // return () => dispatch(setDoctor([]));
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-slate-100">
                <DnaLoader />
            </div>
        );
    }

    return (
        <section className="w-full h-screen overflow-hidden flex flex-col justify-start items-start rounded-l-3xl bg-slate-100 px-5">
            <h1 className="text-2xl font-bold mb-2 mt-4">Doctors List</h1>
            <ul className="doc-ul w-full h-screen flex flex-wrap justify-start items-center gap-7 overflow-y-auto mb-5 ">
                {doctor && doctor.length > 0 ? (
                    doctor.map((doc) => (
                        <li key={doc._id} className=" w-[270px] h-auto flex flex-col justify-center items-start border-2 border-gray-300 px-4 py-6 gap-1 rounded-xl bg-white">
                            <div className='w-full flex flex-col justify-center items-center mb-3'>
                                <img src={doc.docAvatar} alt={doc.firstName} className='w-[150px] h-[150px] rounded-full mb-2 object-cover' />
                                <h3 className="text-xl font-semibold text-gray-700">{`${doc.firstName} ${doc.lastName}`}</h3>
                            </div>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {doc.email}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {doc.phone}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Department:</span> {doc.docDepartment}</p>
                        </li>
                    ))
                ) : (
                    <p>No doctors found.</p>
                )}
            </ul>
        </section>
    );
};
