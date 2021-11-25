import React from "react";
import { ScrollView } from "@cantonjs/react-scroll-view";

const  ViewReports = () =>{
    return(
        <div>
            <div className="shadow" style={{width: "100%" , borderRadius:"12px"}}>
            <center>
            <h2 className="fw-bold  mb-3">History</h2>
            </center>

            <div className="border pb-1">
            <div >
            <ScrollView style={{ height: '425px' }}>
            <div className="card" >
            <div className="card-body">
                <h5 >Task <h6 className="card-subtitle text-muted">published on 21 Nov 3:57 PM</h6></h5>

                
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
            <h5 >Task <h6 className="card-subtitle text-muted">published on 21 Nov 3:57 PM</h6></h5>
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
            <div className="card" >
            <div className="card-body">
            <h5 >Task <h6 className="card-subtitle text-muted">published on 21 Nov 3:57 PM</h6></h5>
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
            </ScrollView>

            </div>

            </div>
            </div>


        </div>
    )
}

export default ViewReports;
