import React from "react";
import Lottie from 'lottie-react-web'
import animation from "../assets/notFound.json"
import Navbar from "./Navbar"

const NotFound = () =>{
  return(
    <>
    <Navbar home={"btn btn-light me-3"} report={"btn btn-light me-3"}></Navbar>
  <Lottie
      options={{
        animationData: animation
      }}
    /></>)
}
export default NotFound;
