import React, {useContext, useState} from "react";
import {Navigate, } from "react-router-dom";
import {AuthContext} from "./Auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Auth} from "../config";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const LogIn = () => {
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [showpasswordtype, setpasswordtype] = useState("password");
  const handleSubmit = (e) => {
    e.preventDefault();
      signInWithEmailAndPassword(Auth,email,password)
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
        <div className="mb-3">
            <label>Email</label>
            <input value={email} onInput={e => setemail(e.target.value)} name="email" type="email" className="form-control"  placeholder="Enter your email"></input>
        </div>
        <div className="mb-3">
            <label>Password</label>
            <input value={password} onInput={e => setpassword(e.target.value)} name="password" type={showpasswordtype} className="form-control" placeholder="Enter your password"></input>
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
            <button className="btn btn-primary" title="Log in" type="submit" onClick={handleSubmit}>Log in</button>
        </div>

    </div>
      </div>
  </div>);
}
export default LogIn;
