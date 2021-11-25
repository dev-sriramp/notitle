import React from "react";
import Navbar from "./Navbar";

const  ViewReports = ()=>{
    return(
        <div>
          <Navbar  home={"btn btn-light me-3"} report={"btn btn-primary me-3"}></Navbar>
            <h1>Reports</h1>
            <div className="border">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <p className="nav-link active"> Pending Task</p>
            </li>
            <li className="nav-item">
                <p className="nav-link">Completed Task</p>
            </li>
            </ul>
            <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0"  className="scrollspy-example">
            <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Task #id <span className="badge bg-warning text-dark">Production Started</span></h5>

                <h6 className="card-subtitle mb-2 text-muted">published on 21 Nov 3:57 PM</h6>
                <div className="continer">
                <div className="row">
                    <div className="col">
                        <p>workstartion : 1</p>
                    </div>
                    <div className="col">
                        <p>model : 2</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Planned count : 55</p>
                    </div>
                    <div className="col">
                        <p>Time left : 3hr 15min</p>
                    </div>

                </div>
                </div>

            </div>
            </div>
            <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Task #id <span className="badge bg-secondary text-dark">Not Started</span></h5>

                <h6 className="card-subtitle mb-2 text-muted">published on 21 Nov 5:57 PM</h6>
                <div className="continer">
                <div className="row">
                    <div className="col">
                        <p>workstartion : 1</p>
                    </div>
                    <div className="col">
                        <p>model : 3</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Planned count : 30</p>
                    </div>
                    <div className="col">
                        <p>Time left : -- </p>
                    </div>

                </div>
                </div>

            </div>
            </div>
            </div>

            </div>

        </div>
    )
}

export default ViewReports;
