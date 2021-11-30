import React,{useContext,useState,useEffect} from "react";
import { Auth,db } from "../../config";
import { Navigate, } from "react-router-dom";
import { AuthContext } from "../Login/Auth";
import { doc, setDoc,collection, getDocs  } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Navbar from "../Others/Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // doc.data() is never undefined for query doc snapshots
  let s = doc.data();
  res.push(s.workstation)
});
setInfo(res);
  }
  const logOut = () => {
      signOut(Auth).then(() => {
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
     try{
     await setDoc(doc(db, "workstation", "#" + counter), {
       workstation: addWorkStation,
     });
     setAddWorkStation("");
     toast.success('Workstation Added successfully');
  }
     catch{
       setAddWorkStation("");
       toast.error('Error Occurred');
     }
   }
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
      toast.success('Workstation Added successfully');
   }
      catch{
        setModel("");
        setWorkStation("");
        toast.error('Error Occurred');
      }
   }

    return(
        <div>
             <Navbar home={"btn btn-light me-3"} report={"btn btn-light me-3"} settings={"btn btn-primary me-3"} ></Navbar>
            <h2 className="p-3">Settings</h2>
            <div className="continer-sm   " style={{ width: "23rem",margin: "0 auto"}}>
                <div className="row">
                    <div className="col ">
                    <div className="card mb-3  ">
                <div className="card-body">
                <h6 className="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                </svg>  Workstation Settings</h6>
                    <div className="d-grid gap-2 mb-3">
                    <button className="btn btn-outline-primary" type="button"  data-bs-toggle="modal" data-bs-target="#Workstationwindow">Add Workstation</button>
                        <button className="btn btn-primary" type="button"  data-bs-toggle="modal" data-bs-target="#" >Edit Workstation</button>
                    </div>
                    <div className="modal fade" id="Workstationwindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="WorkstationwindowLable">Add Workstation</h5>
                        </div>
                        <div className="modal-body">
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Name</label>
                            <input required type="Name" value={addWorkStation} onChange={(e)=>{setAddWorkStation(e.target.value)}} className="form-control"placeholder="Workstation Name"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={appendChildData} data-bs-dismiss="modal">Add</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                <h6 className="mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-diff" viewBox="0 0 16 16">
                <path d="M8 5a.5.5 0 0 1 .5.5V7H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V8H6a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 8 5zm-2.5 6.5A.5.5 0 0 1 6 11h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>  Model Settings</h6>
                    <div className="d-grid gap-2 mb-3">
                    <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#Modelwindow">Add Model </button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#" >Edit Model </button>
                    </div>
                    <div className="modal fade" id="Modelwindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModelwindowLable">Add Model</h5>
                        </div>
                        <div className="modal-body">
                        <div className="mb-3">
                        <label  className="form-label">Select workstation</label>
                            <select className="form-select" value={workStation} onChange={(e)=>{setWorkStation(e.target.value)}} aria-label="Default select example">
                                <option selected>Select workstartion</option>
                                {info.sort().map((data) => (<option key={data} value={data}>{data}</option>))}
                            </select>
                        </div>

                            <div className="mb-3">
                                <label className="form-label">Model Name</label>
                                <input type="Name" value={model} onChange={(e)=>{setModel(e.target.value)}} className="form-control"placeholder="Name"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={appendModel} data-bs-dismiss="modal">Add</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h6 className="mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg> Account Settings</h6>
                <div className="d-grid gap-2">
                <button type="button"   className="btn btn-outline-secondary " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      Logout  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
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
                            <button className="btn btn-outline-secondary" onClick={logOut} data-bs-dismiss="modal" type="button">Yes</button>
                            </div>
                            </div>
                            <div className="col">
                            <div className="d-grid gap-2">
                            <button className="btn btn-primary" data-bs-dismiss="modal" type="button">No</button>
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
