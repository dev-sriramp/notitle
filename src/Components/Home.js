import React, {useContext,useState , useEffect} from "react";
import {Navigate, } from "react-router-dom";
import {AuthContext} from "./Auth";
import {Auth,db} from "../config";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import exportFromJSON from 'export-from-json'
//import Manage from "./Manage"
import AssignTask from "./AssignTask";
import ViewReports from "./ViewReports";



const logOut = () =>{
  signOut(Auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}
const Home = () =>{



  const [info, setInfo] = useState([]);
  useEffect(() => {
    Get()


 },[]);
 const data =  info;
const fileName = 'download'
const exportType = 'xls'
const ExportToExcel = () => {
  exportFromJSON({ data, fileName, exportType })
}


  const Get =  async () =>{
    const docRef = doc(db, "workstation", "workstation");
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
setInfo(docSnap.data())
    // querySnapshot.forEach((doc) => {
    //
    //   var data = doc.data();
    //
    //   setInfo(arr => [
    //           ...arr,
    //           data,
    //         ]);
    // });
  }
  const print = () =>{
    ExportToExcel();
  }
  const {currentUser} = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn"/>;
  }
  return(
    <div className="App">
      <div className="continer">
      <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <div className="d-flex">
            <button onClick={logOut} className="btn btn-primary me-3">Logout </button>
            <button onClick={print} className="btn btn-primary ">print </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="continer-fluid">
      <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3 " >
              <AssignTask info={info}></AssignTask>
            </div>
            <div className="col-md-1">

            </div>
            <div className="col-md-7  mt-3 ">
              <ViewReports></ViewReports>
            </div>
          </div>
        </div>
      </div>




      {/* {
        info.map((data)=>(<><h1>{data.unit +" "+ data.value}</h1><Manage  key = {"book.id"} data={data} /></>))
      } */}

    </div>
  );
};
export default Home;
