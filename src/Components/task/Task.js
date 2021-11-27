import React,{useEffect,useState} from "react";
import Taskinput from "./Taskinput";

const Task = (props) => {
  const [workStation, setWorkStation] = useState([]);
  useEffect(() => {
    const objectToArray = obj => {
      const keys = Object.keys(obj);
      const res = [];
      for (let i = 0; i < keys.length; i++) {
        res.push(obj[keys[i]]);
      };
      return res;
    };
    try { setWorkStation(objectToArray(props.info)); } catch { }
  }, [props.info])
    return(
        <div>
        <div>
            <div>
            <h2>Assign Task</h2>
        <div className="card ">
        <div className="card-body">
        <Taskinput value={workStation.sort()}></Taskinput>
        
        </div>
        </div>


            </div>
           .
         </div>
        </div>
    )

}

export default Task;
