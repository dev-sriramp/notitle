import React,{useContext} from "react";
import {AuthContext} from "./Auth";
import {Navigate, } from "react-router-dom";
import Navbar from "./Navbar";

const  ViewReports = ()=>{
  const {currentUser} = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn"/>;
  }
    return(
        <div>
          <Navbar  home={"btn btn-light me-3"} report={"btn btn-primary me-3"}></Navbar>
            <center>
            <h1>Reports</h1>
            </center>
            <div className="">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <p className="nav-link active"> Pending Task</p>
            </li>
            <li className="nav-item">
                <p className="nav-link">Completed Task</p>
            </li>
            </ul>
            <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0"  className="scrollspy-example">
            <div className=" table-responsive border p-3" >
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Workstation</th>
                <th scope="col">model</th>
                <th scope="col">planned count</th>
                <th scope="col">planned time</th>
                <th scope="col">status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>25-11-2021</td>
                <td>1</td>
                <td>large</td>
                <td>75</td>
                <td>3hr</td>
                <td><span className="badge bg-warning text-dark">Production Started</span></td>
                </tr>
                <tr>
                <td>25-11-2021</td>
                <td>1</td>
                <td>small</td>
                <td>200</td>
                <td>2hr</td>
                <td><span className="badge bg-secondary text-dark">Not Started</span></td>
                </tr>
                <tr>
                <td>25-11-2021</td>
                <td>3</td>
                <td>large</td>
                <td>100</td>
                <td>3hr</td>
                <td><span className="badge bg-secondary text-dark">Not Started</span></td>
                </tr>
            </tbody>
            </table>
            </div>
            </div>

            </div>

        </div>
    )
}

export default ViewReports;
