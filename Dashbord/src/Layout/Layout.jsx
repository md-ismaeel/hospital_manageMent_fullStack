import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Pages/Sidebar/Sidebar";
import { Footer } from "../Components/Footer";

export const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.UserSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated && (
        <>
          <section className="bg-blue-600 h-screen flex justify-center items-center">
            <Sidebar />
            <Outlet />
          </section>
          <Footer />
        </>
      )}
    </>
  );
};
