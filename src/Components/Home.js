import React, {useContext,useState , useEffect} from "react";
import {Navigate, } from "react-router-dom";
import {AuthContext} from "./Auth";
import {Auth,db} from "../config";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import exportFromJSON from 'export-from-json'
import Manage from "./Manage"



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
    const querySnapshot =  await getDocs(collection(db, "UNIT"));
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      setInfo(arr => [
              ...arr,
              data,
            ]);
    });
  }
  const print = () =>{
    console.log(info);
    ExportToExcel();
  }
  const {currentUser} = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn"/>;
  }
  return(
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={logOut} className="button btn-primary">Logout </button>
        <button onClick={print} className="button btn-primary">print </button>

      </header>
      {
        info.map((data)=>(<><h1>{data.unit +" "+ data.value}</h1><Manage  key = {"book.id"} data={data} /></>))
      }

    </div>
  );
};
export default Home;
