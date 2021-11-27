import React, { useState, useEffect } from "react";
import { db } from "../config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const AssignTask = (props) => {
  const [workStation, setWorkStation] = useState([]);
  const [subStation, setSubStation] = useState([]);
  const [productionUnit, setProductionUnit] = useState();
  const [subUnit, setSubUnit] = useState();
  const [count, setCount] = useState();
  const [time, setTime] = useState();
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
  const jsonToArray = (props) => {
    const keys = Object.keys(props);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      res.push(props[keys[i]]);
    };
    return res;
  }
  const handleChange = async (event) => {

    var stationSelected = event.target.value;
    setProductionUnit(stationSelected)
    const docRef = doc(db, "workstation", stationSelected);
    const docSnap = await getDoc(docRef);
    setSubStation(jsonToArray(docSnap.data()));
  }
  const appendChildData = async (e) => {
    e.preventDefault();
    let today = new Date();
    let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
    const { date, workStation, subStation, count, time } = e.target.elements;
    try{
    await setDoc(doc(db, date.value, "#" + counter), {
      date: date.value,
      workstation: workStation.value,
      substation: subStation.value,
      count: count.value,
      time: time.value,
      id:"#" + counter,
    });
    //var s = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
   // await setDoc(doc(db,"total","total-list"),{
   //   s:s,
   // })
    toast.success('Task Assigned successfully');
    setProductionUnit("");
    setSubUnit("");
    setCount("");
    setTime("");

  }
    catch{
      toast.error('Error Occurred');
    }

      //let s = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      await setDoc(doc(db, "total", date.value), {
        date:date.value,
      });


  }
  return (
    <div className="shadow" style={{ width: "100%", borderRadius: "12px" }}>
      <center>
        <h2 className="fw-bold">Assign Task</h2>
      </center>
      <div className="p-3">
        <div><form onSubmit={appendChildData}>
          <div className="mb-4">
            <label className="mb-1">Select Date*</label>
            <input name="date" type="date" className="form-control" placeholder="select date"></input>
          </div>
          <div className="mb-4">
            <label className="mb-4">Select Workstation*</label>
            <select value={productionUnit} onChange={handleChange} name="workStation" className="form-select" aria-label="Default select example">
              <option defaultValue={"choose any workstation"}>choose any workstation </option>
              {workStation.map((data) => (<option key={data} value={data}>{data}</option>))}

            </select>
          </div>
          <div className="mb-4">
            <label>Select Substation*</label>
            <select className="form-select" value={subUnit} onChange={(e) => { setSubUnit(e.value) }} name="subStation" aria-label="Default select example">
              <option defaultValue={"choose any Substation"}>choose any model </option>
              {subStation.map((data) => (<option key={data} value={data}>{data}</option>))}
            </select>
          </div>
          <div className="mb-4">
            <div className="row">
              <div className="col">
                <label className="mb-1">Enter Count*</label>
                <input type="text" name="count" value={count} onChange={(e) => { setCount(e.value) }} className="form-control" placeholder="planned count"></input>
              </div>
              <div className="col">
                <label className="mb-1">Enter Time*</label>
                <input type="time" value={time} onChange={(e) => { setTime(e.value) }} name="time" className="form-control" placeholder="planned time"></input>
              </div>
            </div>

          </div>
          <div className="mb-2 d-grid gap-2">
            <button className="btn btn-primary" type="submit">Publish</button>
          </div>
        </form>
        </div>
      </div>

    </div>
  )
}

export default AssignTask;
