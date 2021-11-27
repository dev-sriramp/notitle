import React,{useState} from "react";
import { db } from "../../config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


const Taskinput = (props) =>{
  const [date, setDate] = useState([]);
  const [subStation, setSubStation] = useState([]);
  const [productionUnit, setProductionUnit] = useState();
  const [subUnit, setSubUnit] = useState();
  const [count, setCount] = useState();
  const [time, setTime] = useState();
  const [sno, ] = useState(1);
  //console.log(props.value[0])

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
    //setSubStation(subStation.sort());
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
  //console.log(subStation)
    return(
        <div>
            <div className="table-responsive">
            <form onSubmit={appendChildData}>
            <table className="table">
                <thead className="table-dark">
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
                    <tr>
                    <th scope="row">{sno}</th>

                    <td>

                    <input type="date" name="date" value={date} onChange={(e) => { setDate(e.value) }} className="form-control" id="exampleFormControlInput1" placeholder="count"></input>
                    </td>
                    <td>
                    <select className="form-select" name="workStation" value={productionUnit} onChange={handleChange} aria-label="Default select example">
                            <option defaultValue={"choose any workstation"}>Select workstartion</option>
                            {props.value.map((data) => (<option key={data} value={data}>{data}</option>))}
                        </select>
                    </td>
                    <td>
                    <select className="form-select"  name="subStation" value={subUnit} onChange={(e) => { setSubUnit(e.value) }} aria-label="Default select example">
                            <option defaultValue={"choose any Substation"}>Select Model</option>
                            {subStation.map((data) => (<option key={data} value={data}>{data}</option>))}
                        </select>
                    </td>
                    <td>
                    <input type="number" name="count" className="form-control" id="exampleFormControlInput1" value={count} onChange={(e) => { setCount(e.value) }} placeholder="count"></input>

                    </td>
                    <td>
                    <input type="time" name="time" value={time} onChange={(e) => { setTime(e.value) }} className="form-control" id="exampleFormControlInput1"></input>
                    </td>
                    <td>
                    <button type="submit" className="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    </button>
                    </td>

                    </tr>
                </tbody>
                </table>
                <center>
                    <button type="button" className="btn btn-outline-secondary">
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
    )
}

export default Taskinput;
