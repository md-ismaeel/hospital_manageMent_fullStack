// import React, { useState } from "react";
// import logo from "../../assets/Medical-log.png";
// import { DnaLoader } from "../../Components/Loader/Loader";
// import { Hero } from "../../Components/Hero/Hero";
// import signin from "../../assets/signin.png";
// import imageOfVector from "../../assets/Vector.png";
// import { toast } from "react-toastify";
// import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
// import axios from "axios";
// import { InputForm } from "../../Components/InputForm";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const Appointment = () => {
//   const { isAuthenticated } = useSelector((state) => state.userSlice);
//   const [doctors, setDoctors] = useState([])
//   const navigate = useNavigate()

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [department, setDepartment] = useState("");
//   const [doctorFirstName, setDoctorFirstName] = useState("");
//   const [doctorLastName, setDoctorLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [uid, setUid] = useState("")
//   const [hasVisited, setHasVisited] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);


//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get(`${API_USER_BACKEND}/allDoctors`, requestOptions);
//       console.log(response);
//       if (response.data.success) {
//         setDoctors(response.data.doctors);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response.data.message || 'An error occurred while fetching doctors!');
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchDoctors()
//     }

//     return () => setDoctors([])
//   }, [isAuthenticated])




//   const departmentsArray = [
//     "Pediatrics",
//     "Orthopedics",
//     "Cardiology",
//     "Neurology",
//     "Oncology",
//     "Radiology",
//     "Physical Therapy",
//     "Dermatology",
//     "ENT",
//   ];

//   const formData = [
//     {
//       name: "First Name", value: firstName, type: "text", onChange: setFirstName,
//     },
//     { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
//     { name: "Email", value: email, type: "email", onChange: setEmail },
//     {
//       name: "Select gender", value: gender, type: "select", options: ["M", "F", "T", "O"], onChange: setGender,
//     },
//     { name: "Phone", value: phone, type: "number", onChange: setPhone },
//     { name: "Date of Birth", value: dob, type: "date", onChange: setDob },
//     {
//       name: "appointment Date", value: appointmentDate, type: "date", onChange: setAppointmentDate,
//     },
//     {
//       name: " Select department", value: department, type: "select", options: departmentsArray, onChange: setDepartment,
//     },
//     // {
//     //   name: "doctor name", value: doctorFirstName, type: "text", onChange: setDoctorFirstName,
//     // },
//     {
//       name: "uid", value: uid, type: "text", onChange: setUid,
//     },
//   ];

//   const resetForm = () => {
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setGender("");
//     setPhone("");
//     setDob("");
//     setAppointmentDate("");
//     setDepartment("");
//     setDoctorFirstName("");
//     setDoctorLastName("");
//     setAddress("");
//   };

//   const bookAppointment = async (e) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       toast.error("Please log in to book an appointment");
//       navigate("/login");
//       return;
//     }

//     setIsLoading(true);
//     const userDataForm = { firstName, lastName, email, dob, phone, gender, appointmentDate, department, doctorFirstName, doctorLastName, address, hasVisited };

//     try {
//       const response = await axios.post(`${API_USER_BACKEND}/appointment/create`, userDataForm, requestOptions);
//       // console.log(response);
//       if (response.data.success) {
//         toast.success(response.data.message);
//         resetForm();
//       }
//     } catch (err) {
//       // console.log(err.response);
//       toast.error(err.response.data.message || "Error while booking appointments");
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   return (
//     <>
//       <Hero title={"Schedule Your Appointment | At Healthcare Medical"} imageUrl={signin} imageUrlVector={imageOfVector} />

//       <section className="w-full h-auto flex flex-col justify-center items-center mt-10">
//         <h1 className="text-2xl font-semibold text-slate-500">Appointments</h1>

//         <form
//           onSubmit={bookAppointment}
//           className="w-11/12 h-auto flex flex-wrap justify-center items-center gap-5 mt-6 border py-10 rounded-xl"
//         >
//           {formData.map((item, index) => (
//             <InputForm
//               key={index}
//               placeHolder={item.name}
//               value={item.value}
//               type={item.type}
//               options={item.options}
//               onChange={(e) => item.onChange(e.target.value)}
//             />
//           ))}

//           <select
//             className="w-[400px] h-[50px] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             value={`${doctorFirstName} ${doctorLastName}`}
//             onChange={(e) => {
//               const [firstName, lastName] = e.target.value.split(" ");
//               setDoctorFirstName(firstName);
//               setDoctorLastName(lastName);
//             }}
//           >
//             <option value="">Enter doctor name</option>
//             {doctors.filter((doctor) => doctor.docDepartment === department).map((doc, index) => (
//               <option key={index} value={`${doc.doctorFirstName} ${doc.doctorLastName}`}>
//                 {`${doc.doctorFirstName} ${doc.doctorLastName}`}
//               </option>
//             ))}
//           </select>

//           <textarea
//             type="text"
//             name="Address..!!"
//             placeholder="Enter you address!!"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-[820px] h-[150px] border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           />

//           <button
//             type="submit"
//             className="relative w-[350px] mt-4 flex justify-center items-center gap-2 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
//             disabled={isLoading}
//           >
//             <span>Book an Appointment</span>
//             <span className="absolute right-[12%]">
//               {isLoading && <DnaLoader />}
//             </span>
//           </button>
//         </form>

//         <p className="w-11/12 flex justify-end items-center mb-20">
//           Have you Visited before?
//           <span>
//             <input
//               type="checkbox"
//               value={hasVisited}
//               onChange={() => setHasVisited(true)}
//             />
//           </span>
//         </p>

//       </section>
//     </>
//   );
// };


import React, { useState, useEffect } from "react";
import logo from "../../assets/Medical-log.png";
import { DnaLoader } from "../../Components/Loader/Loader";
import { Hero } from "../../Components/Hero/Hero";
import signin from "../../assets/signin.png";
import imageOfVector from "../../assets/Vector.png";
import { toast } from "react-toastify";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import axios from "axios";
import { InputForm } from "../../Components/InputForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Appointment = () => {
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [uid, setUid] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_USER_BACKEND}/allDoctors`, requestOptions);
      if (response.data.success) {
        setDoctors(response.data.doctors);
      }
    } catch (err) {
      toast.error(err.response.data.message || 'An error occurred while fetching doctors!');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDoctors();
    }

    return () => setDoctors([]);
  }, [isAuthenticated]);

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
    { name: "First Name", value: firstName, type: "text", onChange: setFirstName },
    { name: "Last Name", value: lastName, type: "text", onChange: setLastName },
    { name: "Email", value: email, type: "email", onChange: setEmail },
    { name: "Select Gender", value: gender, type: "select", options: ["M", "F", "T", "O"], onChange: setGender },
    { name: "Phone", value: phone, type: "number", onChange: setPhone },
    { name: "Date of Birth", value: dob, type: "date", onChange: setDob },
    { name: "Appointment Date", value: appointmentDate, type: "date", onChange: setAppointmentDate },
    { name: "Select Department", value: department, type: "select", options: departmentsArray, onChange: setDepartment },
    { name: "UID", value: uid, type: "text", onChange: setUid },
  ];

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
    setPhone("");
    setDob("");
    setAppointmentDate("");
    setDepartment("");
    setDoctorFirstName("");
    setDoctorLastName("");
    setAddress("");
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login first to book appointment");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    const userDataForm = { firstName, lastName, email, dob, phone, gender, appointmentDate, department, doctorFirstName, doctorLastName, address, hasVisited };

    try {
      const response = await axios.post(`${API_USER_BACKEND}/appointment/create`, userDataForm, requestOptions);
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      }
    } catch (err) {
      toast.error(err.response.data.message || "Error while booking appointments");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero title="Schedule Your Appointment | At Healthcare Medical" imageUrl={signin} imageUrlVector={imageOfVector} />

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

          <select
            className="w-[400px] h-[50px] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
          >
            <option value="">Enter doctor name</option>
            {doctors.filter((doctor) => doctor.docDepartment === department).map((doc, index) => (
              <option key={index} value={`${doc.firstName} ${doc.lastName}`}>
                {`${doc.firstName} ${doc.lastName}`}
              </option>
            ))}
          </select>

          <textarea
            type="text"
            placeholder="Enter your address!!"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-[820px] h-[150px] border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="relative w-[350px] mt-4 flex justify-center items-center gap-2 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            disabled={isLoading}
          >
            <span>Book an Appointment</span>
            {isLoading && (
              <span className="absolute right-[12%]">
                <DnaLoader />
              </span>
            )}
          </button>
        </form>

        <p className="w-11/12 flex justify-end items-center mb-20">
          Have you visited before?
          <span>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={() => setHasVisited(!hasVisited)}
            />
          </span>
        </p>
      </section>
    </>
  );
};

