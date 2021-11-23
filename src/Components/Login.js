import React, {useContext, useState} from "react";
import {Navigate, } from "react-router-dom";
import {AuthContext} from "./Auth";
import FormButton, {FormInput, FormHeader, OtherComponents} from "./FormButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Auth} from "../config";



const Form = () => {
  const [showpasswordtype, setpasswordtype] = useState("password");
  return (<div>
    <FormInput description="Email" placeholder="Enter your email" type="email" name="email"/>
    <FormInput description="Password" placeholder="Enter your password" type={showpasswordtype} name="password"/>
    <div className="float-end mx-5">
      <input type="checkbox" onClick={(e) => {
          if (showpasswordtype === "password") {
            setpasswordtype("text");
          } else if (showpasswordtype === "text") {
            setpasswordtype("password");
          }
        }}/>Show Password</div>
    <br/>
    <FormButton title="Log in" type="submit"/>
  </div>)
};
const LogIn = () => {

  const [passwordWrong, setpasswordWrong] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
      const {email, password} = e.target.elements;
      alert(password.value);
      createUserWithEmailAndPassword(Auth,email.value,password.value)
      .then().catch(error => {
        setpasswordWrong("Check email or password");
      })
    }


  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/Home"/>;
  }
  return (<div>

    <form onSubmit={handleSubmit}>
      <div id="loginform">
        <FormHeader title="Login"/>
        <Form/>
        <p className="centerText">
        </p>
        <p className="centerTextRed">{passwordWrong}</p>
        <OtherComponents name="Sign Up" link="Signup" value="Dont have an account"/>
      </div>
    </form>
  </div>);
}
export default LogIn;
