import React, {useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route, Navigate
} from "react-router-dom";
import Dashboard from "./app/pages/Dashboard/Dashboard";
import Login from "./app/pages/Login/Login";
import AfterZoomCall from "./app/pages/AfterZoomCall/AfterZoomCall";
import Registration from "./app/pages/Registration/Registration";
import EmailVerification from "./app/pages/EmailVerification/EmailVerification";
import './App.css';
import Appointment from "./app/pages/Appointment/Appointment";
import Groups from "./app/pages/Groups/Groups";
import Messages from "./app/pages/Messages/Messages";
import Congratulations from "./app/pages/Congratulations/Congratulations";
import MyProfile from "./app/pages/MyProfile/MyProfile";
import Schedule from "./app/pages/Schedule/Schedule";
import Settings from "./app/pages/Settings/Settings";
import AlreadySuccess from "./app/pages/AlreadySuccess/AlreadySuccess";
import ManageTime from "./app/pages/ManageTime/ManageTime";
import LoginFacebook from "./app/pages/LoginFacebook/LoginFacebook";


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
                <Route exact path="/facebookLogin" element={<LoginFacebook />}/>
                <Route exact path="/email-verification" element={<EmailVerification/>}/>
                <Route exact path="/email/verify/already-success" element={<AlreadySuccess/>}/>
                <Route exact path="/register" element={<Registration/>}/>
                <Route exact path="/after-zoom-call" element={<AfterZoomCall/>}/>
                <Route exact path="/congratulations" element={<Congratulations/>}/>
                <Route path="/appointments" element={<Appointment/>}/>
                {/*<Route exact path="/appointment" element={<Appointment/>}/>*/}
                {accessToken ?
                    <>
                        <Route path="/my-profile" element={<MyProfile setAccessToken={setAccessToken}/>}>
                            <Route index path="dashboard" element={<Dashboard/>}/>
                            {/*<Route path="groups" element={<Groups/>}>*/}
                            {/*    <Route index path="messages" element={<Messages/>}/>*/}
                            {/*</Route>*/}
                            <Route path="groups" element={<Groups/>}/>
                            <Route  path="groups/messages" element={<Messages/>}/>
                            <Route path="schedule" element={<Schedule/>}/>
                            <Route path="manage_available_time" element={<ManageTime/>}/>
                            <Route path="settings" element={<Settings accessToken={accessToken}/>}/>
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