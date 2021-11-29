import React from "react";
import { Auth } from "../../config";
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
            <div className="topnav ">
                <nav className="navbar navbar-light bg-light">
                    <div className="ms-1 ">
                        <div className="">
                        <button    className="btn btn-light me-3"> 
                       <span class="badge bg-warning text-dark" >V-Guard </span>
                        </button>
                            <Link to="/Assigntask"><button className={props.home}>
                            Assign Task</button></Link>
                            <Link to="/Report"><button className={props.report} >
                            ViewReports</button></Link>
                        </div>
                    </div>
                    <ul class="nav justify-content-center">
                    <li class="nav-item">
                       
                    </li>
                    </ul>
                    <div className="me">
                      <button type="button"   className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      Logout  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>  
                        </button>
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Confirm Logout</h5>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                <div className="col">
                            <div class="d-grid gap-2">
                            <button class="btn btn-outline-secondary"  data-bs-dismiss="modal" onClick={logOut} type="button">Yes</button>
                            </div>
                            </div>
                            <div className="col">
                            <div class="d-grid gap-2">
                            <button class="btn btn-primary" data-bs-dismiss="modal" type="button">No</button>
                            </div>
                            </div>
                                </div>
                            
                            

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
