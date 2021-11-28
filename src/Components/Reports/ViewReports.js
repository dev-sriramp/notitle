import React, { useContext, useState,useEffect } from "react";
import { AuthContext } from "../Login/Auth";
import { Navigate, } from "react-router-dom";
import Navbar from "../Others/Navbar";
import { db } from "../../config";
import { query,orderBy,getDocs,collection } from "firebase/firestore";
import exportFromJSON from 'export-from-json'


const ViewReports = () => {
  const { currentUser } = useContext(AuthContext);
  //const [values,setValues] = useState([]);
  const [info,setInfo] =  useState([]);
//  const [first,setFirst] =  useState(true);

  // const getdata = async () => {
  //
  // }

  useEffect(() => {
    Get()
  }, []);
    const Get = async () => {
      const docRef = collection(db, "total");
      const q = query(docRef,orderBy("date","asc"));
      const docSnap = await getDocs(q);
      const res=[];
      docSnap.docChanges().forEach((element)=>{
          var data= element.doc.data();
          res.push(data)
      })
       const res1 = [];
       for (let i = 0; i < res.length; i++) {
         res1.push(res[i].date.trim());
       };
       //setValues(res1);
       const res2=[];
       for (let i = 0; i < res1.length; i++) {
         const element = res1[i];
         const docref = collection(db,element);
         const docsnap = await getDocs(docref);
         docsnap.docChanges().forEach((element)=>{
           var data= element.doc.data();
           res2.push(data)
         })
       }
       setInfo(res2.reverse());
       //console.log(res2)
    }

const ExportToExcel = () => {
  let today = new Date();
  let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
const data =  info;
const fileName = counter;
const exportType = 'xls'
  exportFromJSON({ data, fileName, exportType })
}

  function Datarender(props){
    function takenumber(num){
      return num.charAt(num.length-1)
    }
    return(
        <tr>
          <td>{props.id}</td>
          <td>{props.date}</td>
          <td>{takenumber(props.workstation)}</td>
          <td>{props.model}</td>
          <td>{props.count}</td>
          <td>{props.time}</td>
        </tr>
    )
  }

  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }

  return (
    <div>
      <Navbar home={"btn btn-light me-3"} report={"btn btn-primary me-3"}></Navbar>
      <h2 className="p-3"> Reports</h2>
      <div className="">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <p className="nav-link active">All Task</p>
          </li>
          <li className="nav-item">
            <p className="nav-link"> Pending</p>
          </li>
          <li className="nav-item">
            <p className="nav-link"> Completed</p>
          </li>
            <button className="btn pull-right btn-success" onClick={()=>{ExportToExcel()}}> Print Report</button>
        </ul>
        <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" className="scrollspy-example border border-white">
          <div className=" border border-white table-responsive border p-3" >
            <table className="table ">
              <thead  className="table">
                <tr>
                <th scope="col">
                <label class="form-label">id</label>
                  <input type="number" class="form-control"></input>
                </th>
                  <th scope="col">
                  <label class="form-label">Date</label>
                  <input type="date" class="form-control"></input>
                  </th>
                  <th scope="col">
                  <label class="form-label">Workstation</label>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>All</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select></th>
                  <th scope="col">
                  <label class="form-label">Model</label>
                    <select class="form-select" aria-label="Default select example">
                    <option selected>All</option>
                    <option value="1">small</option>
                    <option value="2">medium</option>
                    <option value="3">large</option>
                  </select>
                  </th>
                  <th scope="col">planned count</th>
                  <th scope="col">planned time</th>
                  
                </tr>
              </thead>
              <tbody>
                {info.map(( d)=>
                <Datarender
                key={d.id}
                id={d.id}
                date={d.date}
                workstation={d.workstation}
                model={d.substation}
                count={d.count}
                time={d.time}
                
                />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewReports;
