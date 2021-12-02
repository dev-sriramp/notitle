import React, { useContext, useState,useEffect } from "react";
import { AuthContext } from "../Login/Auth";
import { Navigate, } from "react-router-dom";
import Navbar from "../Others/Navbar";
import { db } from "../../config";
import { query,orderBy,getDocs,collection,} from "firebase/firestore";
import {ReactComponent as Downloadsvg} from '../../assets/download.svg';
import {ReactComponent as Resetsvg} from '../../assets/restart.svg';
import exportFromJSON from 'export-from-json'
var DateInfo;
var WorkStationInfo;
var WorkStationModelInfo;

const ViewReports = () => {
  const { currentUser } = useContext(AuthContext);
  const [info,setInfo] =  useState([]);
  const [info1,setInfo1] =  useState([]);
  const [workStation, setWorkStation] = useState([]);
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
       setInfo1(res2);
       const ws = [];
       const querySnapshot = await getDocs(collection(db, "workstation"));
   querySnapshot.forEach((doc) => {
     let s = doc.data();
     ws.push(s.workstation)
   });
   setWorkStation(ws);
    }
const ExportToExcel = () => {
  let today = new Date();
  let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
const data =  info1;
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

  const searcher = () =>{
      var data = info;
      if(DateInfo){
          const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
              item[key].includes(DateInfo));
          });
          data = filteredData;
      }
      if(WorkStationInfo ){
          const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
              item[key].includes(WorkStationInfo));
          });
          data = filteredData;
      }
      if(WorkStationModelInfo){
          const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
              item[key].includes(WorkStationModelInfo));
          });
          data = filteredData;
      }
      setInfo1(data);
   }
   const DateSort = (e) =>{
    DateInfo = e.target.value;
    searcher()
   }
   const WorkStationSort = (e) =>{
    WorkStationInfo = e.target.value
    searcher();
   }
   const WorkStationModelSort = (e) =>{
    WorkStationModelInfo = e.target.value
    searcher();
   }
const Reset = () =>{
  DateInfo = "";
  WorkStationInfo = "";
  WorkStationModelInfo = "";
  setInfo1(info)
}
  return (
    <div>
      <Navbar home={"btn btn-light me-3"} report={"btn btn-primary me-3"} settings={"btn btn-light me-3"} ></Navbar>
      <h2 className="ps-1 pt-1"> Reports</h2>
      <p className="ps-1 text-muted">You can filter the reports and download it.</p>
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
          <li class="nav-item">
        <p className="btn btn-white" onClick={()=>{Reset()}}> <Resetsvg></Resetsvg> Reset</p>
        </li>
        <li class="nav-item">
        <p className="btn btn-white" onClick={()=>{ExportToExcel()}}><Downloadsvg></Downloadsvg> Download Report</p>
        </li>
          </ul>  
        <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" className="scrollspy-example border border-white">
          <div className=" border border-white table-responsive border p-3" >
            <table className="table ">
              <thead  className="table">
                <tr>
                <th scope="col">
                <label className="form-label">id</label>
                  <input type="number" className="form-control"></input>
                  </th>
                  <th scope="col">
                  <label className="form-label">Date</label>
                  <input type="date" value={DateInfo} onChange={e=>DateSort(e)} className="form-control"></input>
                  </th>
                  <th scope="col">
                  <label className="form-label">Workstation</label>
                    <select className="form-select" value={WorkStationInfo} onChange={(e)=>WorkStationSort(e)} aria-label="Default select example">
                      <option value="" selected>All</option>
                      {workStation.map((data) => (<option key={data} value={data}>{data}</option>))}
                    </select></th>
                  <th scope="col">
                  <label className="form-label">Model</label>
                    <select className="form-select" value={WorkStationModelInfo} onChange={(e)=>WorkStationModelSort(e)} aria-label="Default select example">
                    <option value="" selected>All</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                    <option value="verylarge">verylarge</option>
                  </select>
                  </th>
                  <th scope="col">planned count</th>
                  <th scope="col">planned time</th>

                </tr>
              </thead>
              <tbody>
                {info1.map((d)=>(
                  <Datarender
                  key={d.id}
                  id={d.id}
                  date={d.date}
                  workstation={d.workstation}
                  model={d.substation}
                  count={d.count}
                  time={d.time}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewReports;
