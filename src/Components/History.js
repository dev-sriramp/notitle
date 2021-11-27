import React,{useEffect,useState} from "react";
import { ScrollView } from "@cantonjs/react-scroll-view";
import { db } from "../config";
import { collection, query, onSnapshot } from "firebase/firestore";

const History = (props) =>{

  return(

    <div className="card" >
        <div className="card-body">
            <h5 >Task id <b>{props.value.id}</b></h5><h6 className="card-subtitle text-muted">published on {props.value.date}</h6>
            <div className="continer">
                <div className="row">
                    <div className="col">
                        <p>workstartion : {props.value.workstation}</p>
                    </div>
                    <div className="col">
                        <p>model : {props.value.substation}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Planned count : {props.value.count}</p>
                    </div>
                    <div className="col">
                        <p>Total Time : {props.value.time} hrs </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
const ViewReports = () => {
  const [today,setToday] = useState();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const date = new Date();
    setToday(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());
    try{
    const q = query(collection(db, today));
    onSnapshot(q, (querySnapshot) => {
      var values = [];
  querySnapshot.forEach((doc) => {
      var data = doc.data();
      values = [...values,data]
  });
  setInfo(values);

});
}catch{}
}, [today]);
    return (
        <div>
            <div className="shadow" style={{ width: "100%", borderRadius: "12px" }}>
                <center>
                    <h2 className="fw-bold  mb-3">History</h2>
                </center>
                <div className="border pb-1">
                    <div >
                        <ScrollView style={{ height: '440px' }}>
                          {info.map((props)=>(<History key={props.id} value={props}></History>))}
                        </ScrollView>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewReports;
