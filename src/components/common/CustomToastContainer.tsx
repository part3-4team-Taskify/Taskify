"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      newestOnTop
      closeButton={false}
      pauseOnHover={false}
      hideProgressBar={true}
      transition={Slide}
    />
  );
};

export default CustomToastContainer;
