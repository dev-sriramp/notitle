import React, {useContext, useState} from "react";
import {Navigate, } from "react-router-dom";
import {AuthContext} from "./Auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Auth} from "../config";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const LogIn = () => {
  const [showpasswordtype, setpasswordtype] = useState("password");
  const handleSubmit = (e) => {
    e.preventDefault();
    const {email,password} = e.target.elements;
      signInWithEmailAndPassword(Auth,email.value,password.value)
      .then().catch(error => {
        toast.error("Check email or password");
      })
    }


  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/Home"/>;
  }
  return (<div>

      <div className="continer-sm position-absolute top-50 start-50 translate-middle">
      <div  style={{width: "22rem"}}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label>Email</label>
            <input name="email" type="email" className="form-control"  placeholder="Enter your email"></input>
        </div>
        <div className="mb-3">
            <label>Password</label>
            <input name="password" type={showpasswordtype} className="form-control" placeholder="Enter your password"></input>
        </div>
        <div className=" mb-1">
        <input type="checkbox" onClick={(e) => {
          if (showpasswordtype === "password") {
            setpasswordtype("text");
          } else if (showpasswordtype === "text") {
            setpasswordtype("password");
          }
        }}/>Show Password</div>
        <div className="mb-4 d-grid gap-2">
            <button className="btn btn-primary" title="Log in" type="submit">Log in</button>
        </div>
</form>
    </div>
      </div>
  </div>);
}
export default LogIn;
