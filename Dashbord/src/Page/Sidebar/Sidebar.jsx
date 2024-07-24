import { useState } from 'react'
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaHome } from "react-icons/fa";
import { MdAddModerator } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../../Redux/Slice/userSlice';


export const Sidebar = () => {

    const { isAuthenticated } = useSelector((state) => state.UserSlice)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        setIsLoading(true)
        try {
            const response = await axios.post(`${API_USER_BACKEND}/logout`, {}, {
                withCredentials: true
            })
            toast.success(response?.data?.message)
            dispatch(setIsAuthenticated(false))
            navigate("/login")
        } catch (err) {
            console.log("Error occurred", err);
            toast.error(err.response?.data?.message || "Error Occurred while logout");
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <nav className='w-16 h-auto text-white'>

                <div className="links min-h-screen flex flex-col justify-center items-center gap-6 text-2xl">
                    <FaHome onClick={() => navigate("/")} className='cursor-pointer' />
                    <MdAddModerator onClick={() => navigate("/newAdmin")} className='cursor-pointer' />
                    <FaUserPlus onClick={() => navigate("/newDoctor")} className='cursor-pointer' />
                    <FaUserDoctor onClick={() => navigate("/doctors")} className='cursor-pointer' />
                    <RiMessage2Fill onClick={() => navigate("")} className='cursor-pointer' />
                    <MdOutlineLogout onClick={handleLogout} className='cursor-pointer' />
                </div>

            </nav>

            {/* <div
                className="wrapper"
                style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
            >
                <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
            </div> */}
        </>
    )
}
