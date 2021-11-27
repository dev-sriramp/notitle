import React, { useContext, useState,useEffect } from "react";
import { AuthContext } from "./Auth";
import { Navigate, } from "react-router-dom";
import Navbar from "./Navbar";
import { db } from "../config";
import { query,orderBy,getDocs,collection } from "firebase/firestore";


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
       console.log(res2)
    }

  function Datarender(props){
    function takenumber(num){
      return num.charAt(num.length-1)
    }
    return(
        <tr>
          <td>{props.date}</td>
          <td>{takenumber(props.workstation)}</td>
          <td>{props.model}</td>
          <td>{props.count}</td>
          <td>{props.time}</td>
          <td>{props.id}</td>
        </tr>
    )
  }

  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }

  return (
    <div>
      <Navbar home={"btn btn-light me-3"} report={"btn btn-primary me-3"}></Navbar>
      <center>
        <h1>Reports</h1>
      </center>
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
        </ul>
        <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" className="scrollspy-example">
          <div className=" table-responsive border p-3" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Workstation</th>
                  <th scope="col">model</th>
                  <th scope="col">planned count</th>
                  <th scope="col">planned time</th>
                  <th scope="col">id</th>
                </tr>
              </thead>
              <tbody>
                {info.map(( d)=>
                <Datarender
                key={d.id}
                date={d.date}
                workstation={d.workstation}
                model={d.substation}
                count={d.count}
                time={d.time}
                id={d.id}
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
