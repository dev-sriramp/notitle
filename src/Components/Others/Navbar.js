import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Settingssvg } from '../../assets/settings.svg';

const Navbar = (props) => {
    return (
        <div>
            <div className="topnav mb-3">
                <nav className="navbar navbar">
                    <div className="ms-5 ">
                        <img src="https://www.vguard.in/waterpurifier/assets/images/logo.png" alt="" width="75" height="30"></img>
                    </div>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            
                        </li>
                    </ul>
                    <div className="me">
                    <Link to="/Assigntask"><button className={props.home} >
                                 Assign Task</button></Link>
                            <Link to="/Report"><button className={props.report} >
                                 ViewReports</button></Link>
                        <Link to="/Settings"><button className={props.settings}><Settingssvg></Settingssvg> </button></Link>

                    </div>

                </nav>
            </div>
        </div>
    )
}

export default Navbar;
