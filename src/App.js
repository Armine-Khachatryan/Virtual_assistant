import React from "react";
import {
    BrowserRouter,
    Routes,
    Route, Navigate
} from "react-router-dom";
import Dashboard from "./app/pages/Dashboard/Dashboard";
import Login from "./app/pages/Login/Login";
import Registration from "./app/pages/Registration/Registration";
import EmailVerification from "./app/pages/EmailVerification/EmailVerification";
import './App.css';
import Groups from "./app/pages/Groups/Groups";
import Congratulations from "./app/components/Congratulations/Congratulations";
import AfterZoomCall from "./app/pages/AfterZoomCall/AfterZoomCall";
import MyProfile from "./app/pages/MyProfile/MyProfile";
import Schedule from "./app/pages/Schedule/Schedule";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Registration/>}/>
                <Route exact path="/email-verification" element={<EmailVerification/>}/>
                <Route exact path="/congratulations" element={<Congratulations/>}/>
                {/*<Route exact path="/after-zoom-call" element={<AfterZoomCall/>}/>*/}
                <Route path="/" element={<MyProfile/>}>
                    <Route index path="dashboard" element={<Dashboard/>}/>
                    <Route path="groups" element={<Groups/>}/>
                    <Route path="schedule" element={<Schedule/>}/>
                    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;