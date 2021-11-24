import React,{useState,useEffect} from "react";
import {db} from "../config";
import { doc, getDoc } from "firebase/firestore";

const AssignTask = (props) =>{
  const [workStation,setWorkStation] = useState([]);
  const [subStation,setSubStation] = useState([]);
  //console.log(props.info)
  useEffect(()=>{
    const objectToArray = obj => {
   const keys = Object.keys(obj);
   const res = [];
   for(let i = 0; i < keys.length; i++){
      res.push(obj[keys[i]]);
   };
   return res;
};
try{setWorkStation(objectToArray(props.info));}catch{}
},[props.info])
const jsonToArray = (props) =>{
  const keys = Object.keys(props);
  const res = [];
  for(let i = 0; i < keys.length; i++){
     res.push(props[keys[i]]);
  };
  return res;
}
const handleChange = async(event) =>{
    var stationSelected = event.target.value;
    const docRef = doc(db, "workstation", stationSelected);
    const docSnap = await getDoc(docRef);
    setSubStation(jsonToArray(docSnap.data()));
    //console.log(subStation);
  }
    return(
        <div>
        <h1>Assign Task</h1>
        <div>
        <div className="mb-4">
            <label>Select Date*</label>
            <input type="date" className="form-control" placeholder="select date"></input>
        </div>
        <div className="mb-4">
            <label>Select Workstation*</label>
            <select onChange={handleChange} className="form-select" aria-label="Default select example">
                <option  defaultValue={"choose any workstation"}>choose any workstation </option>
                {workStation.map((data) => (<option  value={data}>{data}</option>))}

            </select>
        </div>
        <div className="mb-4">
            <label>Select model*</label>
            <select className="form-select" aria-label="Default select example">
                <option defaultValue={"choose any model"}>choose any model </option>
                {subStation.map((data) => (<option  value={data}>{data}</option>))}
            </select>
        </div>
        <div className="mb-4">
            <div className="row">
                <div className="col">
                <label>Enter Count*</label>
                 <input type="number" className="form-control" placeholder="planned count"></input>
                </div>
                <div className="col">
                <label>Enter Time*</label>
                 <input type="time" className="form-control" placeholder="planned time"></input>
                </div>
            </div>

        </div>
        <div className="mb-4 d-grid gap-2">
            <button className="btn btn-primary" type="button">Publish</button>
        </div>
        </div>
        </div>
    )
}

export default AssignTask;
