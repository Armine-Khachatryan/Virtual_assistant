import React, {useState, useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route, Navigate
} from "react-router-dom";
import axios from "axios";
import config from "./app/config";
import Dashboard from "./app/pages/Dashboard/Dashboard";
import {useDispatch} from "react-redux";
import Login from "./app/pages/Login/Login";
import AfterZoomCall from "./app/pages/AfterZoomCall/AfterZoomCall";
import Registration from "./app/pages/Registration/Registration";
import EmailVerification from "./app/pages/EmailVerification/EmailVerification";
import './App.css';
import {setUserData} from "./app/features/User/UserSlice";
import Groups from "./app/pages/Groups/Groups";
import Congratulations from "./app/pages/Congratulations/Congratulations";
import MyProfile from "./app/pages/MyProfile/MyProfile";
import Schedule from "./app/pages/Schedule/Schedule";
import Settings from "./app/pages/Settings/Settings";
import AlreadySuccess from "./app/pages/AlreadySuccess/AlreadySuccess";


function App() {

    let [accessToken, setAccessToken] = useState(sessionStorage.getItem('token')  ||"");

    // const dispatch=useDispatch();

    // useEffect(() => {
    //     getAuthUserData();
    // }, []);
    //
    //
    // let getAuthUserData = async () => {
    //     let token= sessionStorage.getItem('token')
    //     try {
    //         let response = await axios.get(`${config.baseUrl}api/user`,{
    //             headers:{
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         console.log(response.data, "auth request data");
    //         dispatch(setUserData(response.data));
    //     } catch (error) {
    //         console.log(error.response, 'auth request  error response');
    //     }
    // }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login setAccessToken={setAccessToken}/>}/>
                <Route exact path="/login" element={<Login setAccessToken={setAccessToken}/>}/>
                <Route exact path="/email-verification" element={<EmailVerification/>}/>
                <Route exact path="/email/verify/already-success" element={<AlreadySuccess/>}/>
                <Route exact path="/register" element={<Registration/>}/>
                <Route exact path="/after-zoom-call" element={<AfterZoomCall/>}/>
                <Route exact path="/congratulations" element={<Congratulations/>}/>
                {accessToken ?
                    <>
                        <Route path="/my-profile" element={<MyProfile/>}>
                            <Route index path="dashboard" element={<Dashboard/>}/>
                            <Route path="groups" element={<Groups/>}/>
                            <Route path="schedule" element={<Schedule/>}/>
                            <Route path="settings" element={<Settings/>}/>
                            <Route path="*" element={<Navigate to="/my-profile/dashboard" replace/>}/>
                        </Route>
                    </> :<Route path="*" element={<Navigate to="/login" replace/>}/>
                }
                {/*<Route path="*" element={<Navigate to="/my-profile/dashboard" replace/>}/>*/}
                {/*<Route path="*" element={<Navigate to="/login" replace/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;