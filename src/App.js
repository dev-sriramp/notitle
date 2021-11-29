import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Login/Auth";
import Assigntask from "./Components/Task/asignTask";
import LogIn from "./Components/Login/Login";
import ViewReports from "./Components/Reports/ViewReports"
import NotFound from "./Components/Others/NotFound"

const App = () => {
  return (<AuthProvider >
    <Router >
      <Routes >
        <Route exact path="/" element={<Navigate to="/Login" />} />
        <Route exact path="/Assigntask" element={<Assigntask />} />
        <Route exact path="/Login" element={<LogIn />} />
        <Route exact path="/Report" element={<ViewReports />} />
        <Route path="/*" element={<NotFound />} />
      </Routes >
    </Router>
  </AuthProvider>
  );
}

export default App;
