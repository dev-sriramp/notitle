import React, { useState } from "react";
import Taskinput from "./Taskinput";
import { db } from "../../config";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import { DATE, WORK_STATION, WORK_STATION_MODEL, TOTAL_COUNT, TOTAL_TIME } from "../../constants/constants";
import 'react-toastify/dist/ReactToastify.css';
import * as xlsx from "xlsx";
toast.configure()

const Task = (props) => {
  const [excelData,setexcelData] = useState();
  const [formValues, setFormValues] = useState([{ date: "", workStation: "", model: "", count: "", timeTaken: "", modelProp: [] }])

  let handleChange = async (i, e) => {
    const res = [];

    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;

    if (e.target.name === "workStation") {
      var s = e.target.value;
      const querySnapshot = await getDocs(collection(db, s));
      querySnapshot.forEach((doc) => {
        let s = doc.data();
        res.push(s.model)

      });
      newFormValues[i]["modelProp"] = res;
    }
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { date: "", workStation: "", model: "", count: "", timeTaken: "", modelProp: [] }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let len = formValues.length;
    for (let i = 0; i < len; i++) {
      console.log(formValues[i]);

      let today = new Date();
      let counter = today.getTime() + "" + today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();
      try {
        await setDoc(doc(db, formValues[i].date, "#" + counter), {
          date: formValues[i].date,
          workstation: formValues[i].workStation,
          substation: formValues[i].model,
          count: formValues[i].count,
          time: formValues[i].timeTaken,
          id: "#" + counter,
          actualCount: "",
          actualTime: "",
        });
        toast.success('Task Assigned successfully');
      }
      catch {
        toast.error('Error Occurred');
      }
      await setDoc(doc(db, "total", formValues[i].date), {
        date: formValues[i].date,
      });
    }
    setFormValues([{ date: "", workStation: "", model: "", count: "", timeTaken: "", modelProp: [] }])
  }
  //used to convert excel data to json
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        SortJson(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  function SortJson(json) {
    const dataThreads = json.map((data) => {
      return {
        date: data.date,
        workstation: data.workstation,
        substation: data.substation,
        count: data.count,
        time: data.time,
        model: "small"
      };
    })
    setexcelData(dataThreads);
  }

  return (
    <div>
      <h2 className="pt-1 ps-1"> Assign Task</h2>
      <p className="ps-1 text-muted">You can add multiple fields and publish them in  single click.</p>
      <div>
        <div className="card border ">
          <div className="card-body">
            <div className="table-responsive ">
              <form onSubmit={handleSubmit}>
                <table className="table table-bordered ">
                  <thead className="table table-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">{DATE}</th>
                      <th scope="col">{WORK_STATION}</th>
                      <th scope="col">{WORK_STATION_MODEL}</th>
                      <th scope="col">{TOTAL_COUNT}</th>
                      <th scope="col">{TOTAL_TIME}</th>
                      <th scope="col"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formValues.map((element, index) => (
                      <Taskinput key={index} index={index} element={element} handleChange={handleChange} info={props.info} removeFormFields={removeFormFields} />
                    ))}
                  </tbody>
                </table>
                <div className="button-section">
                  <center>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => addFormFields()}>+ Add field</button>
                    <div className=" mt-3" ><button className="btn btn-primary" style={{ width: "22rem" }} type="submit">Publish</button>
                    </div></center></div></form>
            </div >
          </div>
        </div >
      </div>
    </div>
  )
}
export default Task;
