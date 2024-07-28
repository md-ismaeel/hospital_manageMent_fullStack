import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments } from "../Redux/Slice/userSlice";
import axios from "axios";
import { API_USER_BACKEND, requestOptions } from "../Utils/utils";
import { toast } from "react-toastify";

export const AppointmentDetails = () => {
  const { appointment } = useSelector((state) => state.UserSlice);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_USER_BACKEND}/appointment/allAppointments`, requestOptions);
      console.log(response?.data);
      dispatch(setAppointments(response?.data));
      toast.success(response?.data?.message);
    } catch (err) {
      console.log("Error occurred while fetching all appointments", err);
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();

    return () => dispatch(setAppointments([]));
  }, [dispatch]);

  return (
    <>
      <section className="appointments w-full h-[300px] flex justify-center items-center bg-white rounded-md">

      </section>
    </>
  );
};
