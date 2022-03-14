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
  const [excelData, setexcelData] = useState([]);
  const [formValues, setFormValues] = useState([{ date: "", workStation: "", model: "", count: "", timeTaken: "", modelProp: [] }])
  const [handleclick, sethandleclick] = useState(false);

  function handleClick() {
    sethandleclick(!handleclick);
  }


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
  let publishData = async (e) => {

    e.preventDefault();
    let len = excelData.length;
    for (let i = 0; i < len; i++) {
      console.log(excelData[i]);
      let today = new Date();
      let counter = today.getTime() + "" + today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();
      try {
        await setDoc(doc(db, excelData[i].date, "#" + counter), {
          date: excelData[i].date,
          workstation: excelData[i].workstation,
          substation: excelData[i].model,
          count: excelData[i].count,
          time: excelData[i].time,
          id: "#" + counter,
          actualCount: "",
          actualTime: "",
        });
        toast.success('Task Assigned successfully');
      }
      catch {
        toast.error('Error Occurred');
      }
      await setDoc(doc(db, "total", excelData[i].date), {
        date: excelData[i].date,
      });
    }
    setexcelData([])
    handleClick();
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
    console.log(dataThreads);
    handleClick();
  }

  return (
    <div>
      <div class="container-fulid mt-1 ms-4 me-4">
        <div class="row">
          <div class="col-10">
            <h2 style={{textAlign:"left"}}>Assign Task</h2>
          </div>
          <div class="col-2" style={{textAlign:"right"}} >
            <button  type="button" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#exampleModal">
              Import
            </button>

          </div>
        </div>
      </div>


      <div class="container-fulid m-4 mt-2 " >
        <div className="card border border-light  " style={{ borderRadius: "12px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
          <div className="card-body">

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  {!handleclick ?
                    <center>
                      <div class="input-group p-3">
                        <input type="file" onChange={readUploadFile} class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                      </div>
                      <p>Choose file to import</p>  </center> : <div class="modal-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Workstation</th>
                            <th scope="col">Modal</th>
                            <th scope="col">count</th>
                            <th scope="col">time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {excelData.map(function (data, index) {
                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{data.date}</td>
                                <td>{data.workstation}</td>
                                <td>{data.model}</td>
                                <td>{data.count}</td>
                                <td>{data.time}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>}
                  {!handleclick ? null : <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onClick={handleClick}>Clear</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={publishData}>Publish</button>
                  </div>}
                </div>
              </div>
            </div>
            <div className="table-responsive" style={{ borderRadius: "12px" }}>
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
      <div>
      </div>
    </div>
  )
}
export default Task;
