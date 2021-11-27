import React from "react";
import Taskinput from "./Taskinput";

const Task = () => {
    return(
        <div>
        <div>
            <div>
            <h2>Assign Task</h2>
        <div class="card ">
        <div class="card-body">
        <Taskinput></Taskinput>
        <center>   
            <button type="button" class="btn btn-outline-secondary">
            + Add field</button>
        </center>
        </div>
        </div>
        <center>
        <div className=" mt-3" >
            <button className="btn btn-primary"  style={{width:"22rem"}} type="submit">Publish</button>
          </div>
        </center>
        
            </div>
           . 
         </div>
        </div>
    )

}

export default Task;