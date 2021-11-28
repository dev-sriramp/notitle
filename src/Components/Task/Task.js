import React,{useEffect,useState} from "react";
import Taskinput from "./Taskinput";
import { db } from "../../config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()


const Task = (props) => {

  const [workStation, setWorkStation] = useState([]);
  const [formValues, setFormValues] = useState([{ name: "", email : ""}])
  //const [field, setField] = useState(1);
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
    var str = 5;
    for(let i=0;i<len-1;i=i+str){
      if(i>0){
        str=6
      }
      console.log(props[i].value)
      console.log(props[i+1].value)
      console.log(props[i+2].value)
      console.log(props[i+3].value)
      console.log(props[i+4].value)


     let today = new Date();
     let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
  //   const { date, workStation, subStation, count, time } = e.target.elements;
     try{
     await setDoc(doc(db, props[i].value, "#" + counter), {
       date: props[i].value,
       workstation: props[i+1].value,
       substation: props[i+2].value,
       count: props[i+3].value,
       time: props[i+4].value,
       id:"#" + counter,
     });
 //     var s = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
 // await setDoc(doc(db,"total","total-list"),{
 //     s:s,
 // })
     toast.success('Task Assigned successfully');

  }
     catch{
       toast.error('Error Occurred');
     }

       //let s = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
       await setDoc(doc(db, "total", props[i].value), {
         date:props[i].value,
       });
}

  }
    return(
        <div>
          <h2 className="p-1"> Assign Task</h2>
        <div>
            <div>
        <div className="card  ">
        <div className="card-body">
        <div className="table-responsive ">
        <table className="table ">
            <thead className="table">
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
            </table>
            </div>
        <form onSubmit={appendChildData}>

        {formValues.map(( element,index) => (
          <div key={index}>
        <Taskinput value={workStation.sort()} keys={index} DeleteButton={removeFormFields} ></Taskinput>
        </div>
))}
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
           .
         </div>
        </div>
    )

}

export default Task;
