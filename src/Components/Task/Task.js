import React, { useState } from "react";
import Taskinput from "./Taskinput";
import { db } from "../../config";
import { getDocs, collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Task = (props) => {

  const [formValues, setFormValues] = useState([{ date: "", workStation: "", model: "", count: "", timeTaken: "" ,modelProp:[]}])

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
    console.log(formValues)
  }

  let addFormFields = () => {
    setFormValues([...formValues, { date: "", workStation: "", model: "", count: "", timeTaken: "" ,modelProp:[]}])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
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
                      <th scope="col">Date</th>
                      <th scope="col">Workstartion</th>
                      <th scope="col">Model</th>
                      <th scope="col">Planned count</th>
                      <th scope="col">Planned time</th>
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
