import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Settingssvg} from '../../assets/settings.svg';
import {ReactComponent as Tasksvg} from '../../assets/add_task.svg';
import {ReactComponent as Repotssvg} from '../../assets/repots.svg';

const Navbar = (props) => {
    return (
        <div>
            <div className="topnav ">
                <nav className="navbar navbar-light bg-light">
                    <div className="ms-1 ">
                        <div className="">
                        <button    className="btn btn-light me-3">
                       <span className="badge bg-warning text-dark" >V-Guard </span>
                        </button>
                        </div>
                    </div>
                    <ul className="nav justify-content-center">
                    <li className="nav-item">
                    <Link to="/Assigntask"><button className={props.home}>
                            <Tasksvg></Tasksvg> Assign Task</button></Link>
                            <Link to="/Report"><button className={props.report} >
                            <Repotssvg></Repotssvg> ViewReports</button></Link>
                    </li>
                    </ul>
                    <div className="me">
                    
                    <Link to="/Settings"><button className={props.settings}><Settingssvg></Settingssvg> </button></Link>

                        </div>

                </nav>
            </div>
        </div>
    )
}

export default Navbar;
