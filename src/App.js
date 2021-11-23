import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route
} from "react-router-dom";

import './App.css';
import {
  AuthProvider
} from "./Components/Auth";
import Home from "./Components/Home";
import LogIn from "./Components/Login";

const App = () => {
  return ( <AuthProvider >
    <Router >
    <Routes >
    <Route exact path = "/" element={<Navigate to="/Home" />} />
     <Route exact path = "/Home" element={<Home />} />
     <Route exact path = "/Login" element={<LogIn />} />
    </Routes >
    </Router>
    </AuthProvider>
  );
}

export default App;
