<<<<<<< HEAD
import React, { useContext, useState,useEffect } from "react";
=======
import React, { useContext } from "react";
>>>>>>> b0aae81f7021a3f00de70fecec0178115afe52a4
import { AuthContext } from "./Auth";
import { Navigate, } from "react-router-dom";
import Navbar from "./Navbar";
import { db } from "../config";
import { query,orderBy,getDocs,collection } from "firebase/firestore";

<<<<<<< HEAD

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
=======
const ViewReports = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Navigate to="/LogIn" />;
    }
    return (
        <div>
            <Navbar home={"btn btn-light me-3"} report={"btn btn-primary me-3"}></Navbar>
            <h1>Reports</h1>
            <div className="border">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <p className="nav-link active"> Pending Task</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link">Completed Task</p>
                    </li>
                </ul>
                <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" className="scrollspy-example">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Task #id <span className="badge bg-warning text-dark">Production Started</span></h5>

                            <h6 className="card-subtitle mb-2 text-muted">published on 21 Nov 3:57 PM</h6>
                            <div className="continer">
                                <div className="row">
                                    <div className="col">
                                        <p>workstartion : 1</p>
                                    </div>
                                    <div className="col">
                                        <p>model : 2</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>Planned count : 55</p>
                                    </div>
                                    <div className="col">
                                        <p>Time left : 3hr 15min</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Task #id <span className="badge bg-secondary text-dark">Not Started</span></h5>

                            <h6 className="card-subtitle mb-2 text-muted">published on 21 Nov 5:57 PM</h6>
                            <div className="continer">
                                <div className="row">
                                    <div className="col">
                                        <p>workstartion : 1</p>
                                    </div>
                                    <div className="col">
                                        <p>model : 3</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>Planned count : 30</p>
                                    </div>
                                    <div className="col">
                                        <p>Time left : -- </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
>>>>>>> b0aae81f7021a3f00de70fecec0178115afe52a4

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
            <p className="nav-link active"> Pending Task</p>
          </li>
          <li className="nav-item">
            <p className="nav-link">Completed Task</p>
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
