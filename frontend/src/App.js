import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Index from "./components/Index";
import Signup from "./components/Signup";
import Edit from "./components/Edit";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default App;
