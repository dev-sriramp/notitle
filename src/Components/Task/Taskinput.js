import React,{useState} from "react";
import { db } from "../../config";
import { getDocs,collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ReactComponent as Deletesvg} from '../../assets/delete.svg';
toast.configure()

const Taskinput = (props) =>{
  const [date, setDate] = useState([]);
  const [model, setModel] = useState([]);
  const [productionUnit, setProductionUnit] = useState();
  const [subUnit, setSubUnit] = useState();
  const [count, setCount] = useState();
  const [time, setTime] = useState();

  const handleChange = async (e) => {
    const res = [];
    var s = e.target.value;
    setProductionUnit(s);
    const querySnapshot = await getDocs(collection(db, s));
querySnapshot.forEach((doc) => {
  let s = doc.data();
  res.push(s.model)
});
setModel(res)
  }

  // const Value = ()=>{
  //   setDate("");
  //   model("");
  //   setProductionUnit("");
  //   setSubUnit("");
  //   setCount("");
  //   setTime("");
  // }
    return(
                    <tr>
                    <th scope="row">{props.keys+1}</th>
                    <td>
                    <input type="date" required name="date" value={date} onChange={(e) => { setDate(e.value) }} className="form-control" id="exampleFormControlInput1" placeholder="count"></input>
                    </td>
                    <td>
                    <select required className="form-select" name="workStation" value={productionUnit} onChange={(e)=>{handleChange(e)}} aria-label="Default select example">
                            <option disabled selected>Select workstartion</option>
                            {props.value.map((data) => (<option key={data} value={data}>{data}</option>))}
                        </select>
                    </td>
                    <td>
                    <select required className="form-select"  name="model" value={subUnit} onChange={(e) => { setSubUnit(e.value) }} aria-label="Default select example">
                            <option disabled >Select Model</option>
                            {model.map((data) => (<option key={data} value={data}>{data}</option>))}
                        </select>
                    </td>
                    <td>
                    <input required type="number" name="count" className="form-control" id="exampleFormControlInput1" value={count} onChange={(e) => { setCount(e.value) }} placeholder="count"></input>
                    </td>
                    <td>
                    <input required type="time" name="time" value={time} onChange={(e) => { setTime(e.value) }} className="form-control" id="exampleFormControlInput1"></input>
                    </td>
                    <td>
                    {
                props.keys?
                <button type="button" className="btn btn-white" onClick={(e)=>{props.DeleteButton(props.keys)}}>
                <Deletesvg></Deletesvg>
                </button> : <button type="button" disabled className="btn btn-White" onClick={(e)=>{props.DeleteButton(props.keys)}}>
                <Deletesvg></Deletesvg>
                </button>
              }
                    </td>
                    </tr>
    )
}
export default Taskinput;
