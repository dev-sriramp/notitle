import React,{useContext,useState,useEffect} from "react";
import { Auth,db } from "../../config";
import { Navigate, } from "react-router-dom";
import { AuthContext } from "../Login/Auth";
import { doc, setDoc,collection, getDocs  } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Navbar from "../Others/Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WORK_STATION,WORK_STATION_MODEL } from "../../constants/constants";

import {ReactComponent as Accountsvg} from '../../assets/manage_account.svg';

toast.configure();


const Settings = () =>{

  const [addWorkStation,setAddWorkStation] = useState();
  const [workStation,setWorkStation] = useState();
  const [model,setModel] = useState();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    Get()
  }, []);
  const Get = async () => {
    const res = [];
    const querySnapshot = await getDocs(collection(db, "workstation"));
querySnapshot.forEach((doc) => {
  let s = doc.data();
  res.push(s.workstation)
});
setInfo(res);
  }
  const logOut = () => {
      signOut(Auth).then(() => {
          toast.success("Logged out successfully");
    }).catch((error) => {
      });
  }
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }
  const appendChildData = async (e) => {
    e.preventDefault();
     let today = new Date();
     let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
     if(addWorkStation in info){alert("workStation already Exists")}else{
     try{
     await setDoc(doc(db, "workstation", "#" + counter), {
       workstation: addWorkStation,
     });
     const res = info
     res.push(addWorkStation);
     setInfo(res);
     setAddWorkStation("");
     toast.success('Workstation Added successfully');
  }
     catch{
       setAddWorkStation("");
       toast.error('Error Occurred');
     }
   }}
   const appendModel = async (e) =>{
     console.log(workStation);
     console.log(model);
     e.preventDefault();
      let today = new Date();
      let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
      try{
      await setDoc(doc(db, workStation, "#" + counter), {
        workstation: workStation,
        model:model,
      });
      setModel("");
      setWorkStation("");
      toast.success('Model Added successfully');
   }
      catch{
        setModel("");
        setWorkStation("");
        toast.error('Error Occurred');
      }
   }

    return(
        <div>
             <Navbar home={"btn btn-black text-white me-3"} report={"btn btn-black text-white me-3"} settings={"btn btn-warning me-3"} ></Navbar>
            <h2 className="ps-4 pt-1"> Settings</h2>
            <div className="continer m-4" style={{ borderRadius: "12px", overflow: "scroll", height: "600px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
            <div class="row p-3 mt-5">
                <div class="col-md-4">
                <div className="card mb-3  ">
                <div className="card-body">
                <h6 className="mb-3">
                 {WORK_STATION} Settings</h6>
                    <div className="d-grid gap-2 mb-3">
                    <button className="btn btn-outline-warning" type="button"  data-bs-toggle="modal" data-bs-target="#Workstationwindow">Add {WORK_STATION}</button>
                        <button className="btn btn-dark" type="button"  data-bs-toggle="modal" data-bs-target="#" >Edit {WORK_STATION}</button>
                    </div>
                    <div className="modal fade" id="Workstationwindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="WorkstationwindowLable">Add {WORK_STATION}</h5>
                        </div>
                        <div className="modal-body">
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Name</label>
                            <input required type="Name" value={addWorkStation} onChange={(e)=>{setAddWorkStation(e.target.value)}} className="form-control"placeholder="Workstation Name"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={appendChildData} data-bs-dismiss="modal">Add</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
                <div class="col-md-4">
                <div className="card mb-3">
                <div className="card-body">
                <h6 className="mb-3">  {WORK_STATION_MODEL} Settings</h6>
                    <div className="d-grid gap-2 mb-3">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#Modelwindow">Add {WORK_STATION_MODEL} </button>
                        <button className="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#" >Edit {WORK_STATION_MODEL}l </button>
                    </div>
                    <div className="modal fade" id="Modelwindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModelwindowLable">Add {WORK_STATION_MODEL}</h5>
                        </div>
                        <div className="modal-body">
                        <div className="mb-3">
                        <label  className="form-label">Select {WORK_STATION}</label>
                            <select className="form-select" value={workStation} onChange={(e)=>{setWorkStation(e.target.value)}} aria-label="Default select example">
                                <option selected>Select workstartion</option>
                                {info.sort().map((data) => (<option key={data} value={data}>{data}</option>))}
                            </select>
                        </div>

                            <div className="mb-3">
                                <label className="form-label">{WORK_STATION_MODEL} Name</label>
                                <input type="Name" value={model} onChange={(e)=>{setModel(e.target.value)}} className="form-control"placeholder="Name"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={appendModel} data-bs-dismiss="modal">Add</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
                <div class="col-md-4">
                <div className="card mb-3">
                <div className="card-body">
                    <h6 className="mb-3"><Accountsvg></Accountsvg> Account Settings</h6>
                <div className="d-grid mb-3 gap-2">
                <button type="button"   className="btn btn-outline-warning ">
                      Change Password 
                        </button>
                <button type="button"   className="btn btn-dark " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      Logout
                        </button>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Confirm Logout</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                <div className="col">
                            <div className="d-grid gap-2">
                            <button className="btn btn-outline-warning" onClick={logOut} data-bs-dismiss="modal" type="button">Yes</button>
                            </div>
                            </div>
                            <div className="col">
                            <div className="d-grid gap-2">
                            <button className="btn btn-warning" data-bs-dismiss="modal" type="button">No</button>
                            </div>
                            </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>

                </div>
            </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Settings;
