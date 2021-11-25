import React from "react";
import {Auth} from "../config";
import { signOut } from "firebase/auth";
import {Link} from "react-router-dom";

// function exl(){
//     const data =  info;
// const fileName = 'download'
// const exportType = 'xls'
// const ExportToExcel = () => {
//   exportFromJSON({ data, fileName, exportType })
// }
// }

const Navbar =  () => {
    const logOut = () =>{
        signOut(Auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      }
    //   const print = () =>{
    //     ExportToExcel();
    //   }
    return(
        <div>
            <div className="continer">
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="d-flex">
                    <Link to="/Home"><button className="btn btn-primary me-3">Home</button></Link>
                    <Link to="/Report"><button className="btn btn-light me-3" >ViewReports</button></Link>
                    <button onClick={logOut} className="btn btn-light me-3">Logout </button>
                    {/* <button onClick={print} className="btn btn-primary ">print </button> */}
                    </div>
                </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
