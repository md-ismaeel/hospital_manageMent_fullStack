import { useEffect } from "react";
import adminImage from "../../assets/doctors/doc.png";
import { AppointmentDetails } from "../../Components/AppointmentDetails";
import axios from "axios";
import { setAdmin } from "../../Redux/Slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify";

export const Home = () => {
    const { admin, isAuthenticated, messages } = useSelector((state) => state.UserSlice);
    const dispatch = useDispatch()

    const messageCount = messages.reduce((total, message) =>
        total + (message.item?.length || 0), 0);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API_USER_BACKEND}/profile`, requestOptions);
            // console.log("profile", response.data);
            dispatch(setAdmin(response.data.userData))
        } catch (err) {
            toast.error(err.response?.data?.message || "Error profile not found!!");
        }
    };

    useEffect(() => {
        fetchProfile();

        return () => dispatch(setAdmin({}));
    }, []);

    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-start gap-6 bg-slate-100 rounded-l-3xl px-10">
            <div className="w-full flex justify-between items-center gap-5">
                <div className="h-[200px] w-[55%] flex bg-blue-200 rounded-md">
                    <div className="w-[33%]">
                        <img
                            src={adminImage}
                            alt={admin?.firstName}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="w-[65%] flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold mb-2">
                            Hello,
                            <span className="text-orange-500 ml-4">{`${admin?.firstName || "user"
                                } ${admin?.lastName || "name"}`}</span>
                        </h1>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
                            nam molestias. Eaque molestiae ipsam commodi neque. Assumenda
                            repellendus necessitatibus itaque.
                        </p>
                    </div>
                </div>

                <div className="h-[200px] w-[45%] flex justify-between items-center">
                    <div className="w-[49%] h-[100%] bg-blue-400 rounded-md flex flex-col justify-center items-center gap-2">
                        <h1 className="text-lg font-semibold text-white">
                            Total Appointments
                        </h1>
                        <h1 className="text-2xl font-semibold text-white">{messageCount}</h1>
                    </div>
                    <div className="w-[49%] h-[100%] bg-slate-200 rounded-md flex flex-col justify-center items-center gap-2">
                        <h1 className="text-lg font-semibold text-teal-500">
                            Registered Doctors
                        </h1>
                        <h1 className="text-2xl font-semibold text-teal-500">{"100"}</h1>
                    </div>
                </div>
            </div>

            {/* <AppointmentDetails /> */}
        </section>
    );
};
