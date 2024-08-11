import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { API_USER_BACKEND, requestOptions } from "../Utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { setAppointments } from "../Redux/Slice/userSlice";
import { format } from 'date-fns';

export const AppointmentDetails = () => {
  const { isAuthenticated, appointments } = useSelector((state) => state.UserSlice);
  console.log("appointments", appointments);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_USER_BACKEND}/appointment/allAppointments`, requestOptions);
      dispatch(setAppointments(response.data.results));
    } catch (err) {
      console.error("Error occurred while fetching appointments:", err);
      toast.error("Failed to fetch appointments.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [isAuthenticated, navigate, dispatch]);

  const handleUpdateStatus = async (appointmentId, status) => {
    const formData = { status };
    try {
      const { data } = await axios.put(`${API_USER_BACKEND}/appointment/edit/${appointmentId}`, formData, requestOptions);

      const updatedAppointments = appointments.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, status }
          : appointment
      );

      dispatch(setAppointments(updatedAppointments));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return 'Invalid Date';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return format(date, 'yyyy-MM-dd HH:mm');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date';
    }
  };

  return (
    <section className="w-full bg-gray-100">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h5 className="text-2xl font-bold p-4 border-b">Appointments</h5>
        <div className="overflow-auto h-[280px]">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Patient</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Visited</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(appointments) && appointments.length > 0
                ? appointments.map((appointment) => (
                  <tr key={appointment._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td className="px-4 py-2">{formatDate(appointment.appointmentDate)}</td>
                    <td className="px-4 py-2">{`${appointment.doctor.doctorFirstName} ${appointment.doctor.doctorLastName}`}</td>
                    <td className="px-4 py-2">{appointment.department}</td>
                    <td className="px-4 py-2">
                      <select
                        className={`p-1 rounded w-full ${appointment.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : appointment.status === "Accepted"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                          }`}
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="bg-yellow-200 text-yellow-800">
                          Pending
                        </option>
                        <option value="Accepted" className="bg-green-200 text-green-800">
                          Accepted
                        </option>
                        <option value="Rejected" className="bg-red-200 text-red-800">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="text-green-500 text-xl inline" />
                      ) : (
                        <AiFillCloseCircle className="text-red-500 text-xl inline" />
                      )}
                    </td>
                  </tr>
                ))
                : <tr><td colSpan="6" className="px-4 py-2 text-center">No Appointments Found!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};