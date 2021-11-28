import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Auth";
import Home from "./Components/Home";
import LogIn from "./Components/Login";
import ViewReports from "./Components/ViewReports"
import NotFound from "./Components/NotFound"

const App = () => {
  return (<AuthProvider >
    <Router >
      <Routes >
        <Route exact path="/" element={<Navigate to="/Login" />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Login" element={<LogIn />} />
        <Route exact path="/Report" element={<ViewReports />} />
        <Route path="/*" element={<NotFound />} />
      </Routes >
    </Router>
  </AuthProvider>
  );
}

export default App;
