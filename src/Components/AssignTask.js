import React,{useState,useEffect} from "react";
import {db} from "../config";
import { doc, getDoc, setDoc  } from "firebase/firestore";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
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
  const appendChildData = async(e) =>{
    e.preventDefault();
    const {date,workStation,subStation,count,time} = e.target.elements;
    //console.log(date.value,workStation.value,subStation.value,count.value,time.value);
    await setDoc(doc(db, date.value, workStation.value+subStation.value), {
  date:date.value,
  workstation:workStation.value,
  substation:subStation.value,
  count:count.value,
  time:time.value,
});toast.success('Task Assigned successfully');
  }
    return(
        <div>
        <h1>Assign Task</h1>
        <div><form onSubmit={appendChildData}>
        <div className="mb-4">
            <label>Select Date*</label>
            <input name="date" type="date" className="form-control" placeholder="select date"></input>
        </div>
        <div className="mb-4">
            <label>Select Workstation*</label>
            <select onChange={handleChange} name="workStation" className="form-select" aria-label="Default select example">
                <option  defaultValue={"choose any workstation"}>choose any workstation </option>
                {workStation.map((data) => (<option  value={data}>{data}</option>))}

            </select>
        </div>
        <div className="mb-4">
            <label>Select Substation*</label>
            <select className="form-select" name="subStation" aria-label="Default select example">
                <option defaultValue={"choose any Substation"}>choose any model </option>
                {subStation.map((data) => (<option  value={data}>{data}</option>))}
            </select>
        </div>
        <div className="mb-4">
            <div className="row">
                <div className="col">
                <label>Enter Count*</label>
                 <input type="number" name="count" className="form-control" placeholder="planned count"></input>
                </div>
                <div className="col">
                <label>Enter Time*</label>
                 <input type="time" name="time" className="form-control" placeholder="planned time"></input>
                </div>
            </div>

        </div>
        <div className="mb-4 d-grid gap-2">
            <button className="btn btn-primary" type="submit">Publish</button>
        </div>
        </form>
        </div>
        </div>
    )
}

export default AssignTask;
