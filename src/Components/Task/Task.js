import React,{useEffect,useState} from "react";
import Taskinput from "./Taskinput";
import { db } from "../../config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Task = (props) => {
  const [formValues, setFormValues] = useState([{ name: "", email : ""}])
  useEffect(() => {
console.log(props.info)  })
  let addFormFields = () => {

        setFormValues([...formValues, { name: "", email: "" }])
      }
    let removeFormFields = (i) => {
             let newFormValues = [...formValues];
             newFormValues.splice(i, 1);
             setFormValues(newFormValues)
         }
         
  const appendChildData = async (e) => {
    e.preventDefault();
    const props = e.target.elements;
    console.log(props)
    var len = props.length-2;
    for(let i=0;i<len-1;i=i+6){
     let today = new Date();
     let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
     try{
     await setDoc(doc(db, props[i].value, "#" + counter), {
       date: props[i].value,
       workstation: props[i+1].value,
       substation: props[i+2].value,
       count: props[i+3].value,
       time: props[i+4].value,
       id:"#" + counter,
     });
     toast.success('Task Assigned successfully');
  }
     catch{
       toast.error('Error Occurred');
     }
       await setDoc(doc(db, "total", props[i].value), {
         date:props[i].value,
       });}
e.target.reset();
     }
    return(
        <div>
          <h2 className="p-1"> Assign Task</h2>
        <div>
            <div>
        <div className="card  ">
        <div className="card-body">
        <div className="table-responsive ">
        <form onSubmit={appendChildData} >
        <table className="table ">
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
        {formValues.map(( element,index) => (
        <Taskinput value={props.info.sort()} keys={index} DeleteButton={removeFormFields} ></Taskinput>
        ))}
</tbody>
        </table>
        <center>
            <button onClick={() => addFormFields()}type="button" className="btn btn-outline-secondary">
            + Add field</button>
        </center>
        <center>
        <div className=" mt-3" >
            <button className="btn btn-primary"  style={{width:"22rem"}} type="submit">Publish</button>
          </div>
        </center>
        </form>
        </div>
        </div>
        </div>
            </div>
         </div>
        </div>
    )
}
export default Task;
