import React, { useState } from "react";
import logo from "../../assets/Medical-log.png";
import { DnaLoader } from "../../Components/Loader/Loader";
import { Hero } from "../../Components/Hero/Hero";
import signin from "../../assets/signin.png";
import imageOfVector from "../../assets/Vector.png";
import { toast } from "react-toastify";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import axios from "axios";
import { InputForm } from "../../Components/InputForm";

export const Appointment = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
      name: "First Name",
      value: firstName,
      type: "text",
      onChange: setFirstName,
    },
    { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
    { name: "Email", value: email, type: "email", onChange: setEmail },
    {
      name: "Select gender",
      value: gender,
      type: "select",
      options: ["Male", "Female", "Other"],
      onChange: setGender,
    },
    { name: "Phone", value: phone, type: "number", onChange: setPhone },
    { name: "Date of Birth", value: dob, type: "date", onChange: setDob },
    {
      name: "appointment Date",
      value: appointmentDate,
      type: "date",
      onChange: setAppointmentDate,
    },
    {
      name: " Select department",
      value: department,
      type: "select",
      options: departmentsArray,
      onChange: setDepartment,
    },
    {
      name: "doctor FirstName",
      value: doctorFirstName,
      type: "text",
      onChange: setDoctorFirstName,
    },
    {
      name: "doctor LastName",
      value: doctorLastName,
      type: "text",
      onChange: setDoctorLastName,
    },
  ];

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
    setPhone("");
    setDob("");
    setAppointmentDate("")
    setDepartment("")
    setDoctorFirstName("")
    setDoctorLastName("")
    setAddress("")
  };

  const bookAppointment = async () => {
    setIsLoading(true);
    const userDataForm = { firstName, lastName, email, dob };

    try {
      const response = await axios(
        `${API_USER_BACKEND}/`,
        userDataForm,
        requestOptions
      );
      toast.success(response?.data?.message);
      resetForm();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Error occurred while booking appointments"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero
        title={"Schedule Your Appointment | At Healthcare Medical"}
        imageUrl={signin}
        imageUrlVector={imageOfVector}
      />

      <section className="w-full h-auto flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-semibold text-slate-500">Appointments</h1>

        <form
          onSubmit={bookAppointment}
          className="w-11/12 h-auto flex flex-wrap justify-center items-center gap-5 mt-6 border py-10 rounded-xl"
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
          <textarea
            type="text"
            name="Address..!!"
            placeholder="Enter message"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-[820px] h-[150px] border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-[350px] mt-4 flex justify-center items-center gap-2 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            disabled={isLoading}
          >
            <span> Book Appointment</span>
            <span>{isLoading && <DnaLoader />}</span>
          </button>
        </form>
        <p className="w-11/12 flex justify-end items-center mb-20">
          Have you Visited before?
          <span>
            <input type="checkbox" value={hasVisited} onChange={() => setHasVisited(true)} />
          </span>
        </p>
      </section>
    </>
  );
};
