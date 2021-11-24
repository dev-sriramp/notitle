import React from "react";

function ViewReports(){
    return(
        <div>
            <h1>Reports</h1>
            <div className="border">
            <ul class="nav nav-tabs">
            <li class="nav-item">
                <p className="nav-link active"> Pending Task</p>
            </li>
            <li class="nav-item">
                <p className="nav-link">Completed Task</p>
            </li>
            </ul>
            <div class="card" >
            <div class="card-body">
                <h5 class="card-title">Task #id <span class="badge bg-warning text-dark">Production Started</span></h5>
                
                <h6 class="card-subtitle mb-2 text-muted">published on 21 Nov 3:57 PM</h6>
                <div className="continer">
                    <h6>Details :</h6>
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
            <div class="card" >
            <div class="card-body">
                <h5 class="card-title">Task #id <span class="badge bg-secondary text-dark">Not Started</span></h5>
                
                <h6 class="card-subtitle mb-2 text-muted">published on 21 Nov 5:57 PM</h6>
                <div className="continer">
                    <h6>Details :</h6>
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
    )
}

export default ViewReports;