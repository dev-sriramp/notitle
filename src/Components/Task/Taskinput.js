import React,{useState} from "react";
import { db } from "../../config";
import { getDocs,collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const reset = (e)=>{
this.Value()
}

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

  const Value = ()=>{
    setDate("");
    model("");
    setProductionUnit("");
    setSubUnit("");
    setCount("");
    setTime("");
  }
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
                <button type="button" className="btn btn-danger" onClick={(e)=>{props.DeleteButton(props.keys)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                </button> : <button type="button" disabled className="btn btn-danger" onClick={(e)=>{props.DeleteButton(props.keys)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                </button>
              }
                    </td>
                    </tr>
    )
}
export default Taskinput;
export {reset};
