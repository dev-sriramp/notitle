import React from "react";

function AssignTask(){
    return(
        <div>
        <h1>Assign Task</h1>
        <div>
        <div class="mb-4">
            <label>Select Date*</label>
            <input type="date" class="form-control" placeholder="select date"></input>
        </div>
        <div class="mb-4">
            <label>Select Workstation*</label>
            <select class="form-select" aria-label="Default select example">
                <option selected>choose any workstation </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="mb-4">
            <label>Select model*</label>
            <select class="form-select" aria-label="Default select example">
                <option selected>choose any model </option>
                <option value="1">modelOne</option>
                <option value="2">modelTwo</option>
                <option value="3">modelThree</option>
            </select>
        </div>
        <div class="mb-4">
            <div className="row">
                <div className="col">
                <label>Enter Count*</label>
                 <input type="number" class="form-control" placeholder="planned count"></input>
                </div>
                <div className="col">
                <label>Enter Time*</label>
                 <input type="time" class="form-control" placeholder="planned time"></input>
                </div>
            </div>
            
        </div>
        <div class="mb-4 d-grid gap-2">
            <button class="btn btn-primary" type="button">Publish</button>
        </div>
        </div>
        </div>
    )
}

export default AssignTask;