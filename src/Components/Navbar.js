import React from "react";
import { Auth } from "../config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

// function exl(){
//     const data =  info;
// const fileName = 'download'
// const exportType = 'xls'
// const ExportToExcel = () => {
//   exportFromJSON({ data, fileName, exportType })
// }
// }

const Navbar = (props) => {
    const logOut = () => {
        signOut(Auth).then(() => {
        }).catch((error) => {
        });
    }
    //   const print = () =>{
    //     ExportToExcel();
    //   }
    return (
        <div>
            <div className="topnav">
                <nav className="navbar navbar-light bg-light">
                    <div className="ms-1 ">
                        <div className="">
                            <Link to="/Home"><button className={props.home}>Home</button></Link>
                            <Link to="/Report"><button className={props.report} >ViewReports</button></Link>
                        </div>
                    </div>
                    <div className="me">
                        <button onClick={logOut} className="btn btn-light me-3">Logout </button>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
