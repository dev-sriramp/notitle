import React, { useContext, useState, useEffect } from "react";
import { Navigate, } from "react-router-dom";
import { AuthContext } from "../Login/Auth";
import { db } from "../../config";
import { getDocs,collection } from "firebase/firestore";
import Navbar from "../Others/Navbar";
import Task from "./Task";

const Assigntask = () => {
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
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }
  return (
    <div className="App">
      <Navbar home={"btn btn-primary me-3"} report={"btn btn-light me-3"} settings={"btn btn-light me-3"} ></Navbar>
      <div className="continer-fluid">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-md-4 mt-3 " >
              <AssignTask info={info}></AssignTask>
            </div> */}
            <div className="col-md-12  mt-3 ">
            <Task info={info}></Task>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Assigntask;
