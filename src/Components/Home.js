import React, { useContext, useState, useEffect } from "react";
import { Navigate, } from "react-router-dom";
import { AuthContext } from "./Auth";
import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import AssignTask from "./AssignTask";
import History from "./History";
import Navbar from "./Navbar";
// import exportFromJSON from 'export-from-json'
const Home = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    Get()
  }, []);

  const Get = async () => {
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

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }
  return (
    <div className="App">
      <Navbar home={"btn btn-primary me-3"} report={"btn btn-light me-3"}>
      </Navbar>
      <div className="continer-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3 " >
              <AssignTask info={info}></AssignTask>
            </div>
            <div className="col-md-8  mt-3 ">
              <History></History>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
