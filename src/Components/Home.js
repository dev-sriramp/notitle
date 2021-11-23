import React, {useContext, } from "react";
import {Navigate, } from "react-router-dom";
import {AuthContext} from "./Auth";
import {Auth} from "../config";
import { signOut } from "firebase/auth";


const logOut = () =>{
  signOut(Auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}
const Home = () =>{
  const {currentUser} = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn"/>;
  }
  return(
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={logOut} >hello </button>
      </header>
    </div>
  );
};
export default Home;
