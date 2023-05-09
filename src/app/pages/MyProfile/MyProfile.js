import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from './MyProfile.module.css';
import Footer from "../../components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import config from "../../config";
import {setUserData} from "../../features/User/UserSlice";



function MyProfile() {

    const customer = useSelector((state)=>state.user.data);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [activeSideBar, setActiveSideBar]=useState("dashboard");
    const dispatch=useDispatch();

    useEffect(() => {
         navigate('dashboard')
    }, [])


    const setRouting =(data)=>{
        setActiveSideBar(data);
        navigate(`./${data}`)
    }


    useEffect(() => {
        getAuthUserData();
    }, []);


    let getAuthUserData = async () => {
        let token= sessionStorage.getItem('token')
        try {
            let response = await axios.get(`${config.baseUrl}api/user`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data, "auth request data");
            dispatch(setUserData(response.data));
        } catch (error) {
            console.log(error.response, 'auth request  error response');
        }
    }

    return (
        <>
            {customer ?  <>
                    <div className={classes.profileWhole}>
                        <Sidebar onSetRouting={setRouting} activeSideBar={activeSideBar}/>
                        <div className={classes.profileRight}>
                            <Header onSetRouting={setRouting}/>
                            {pathname === '/my-profile/dashboard' ? <div className="insideDivDashboard"> <Outlet/></div>:
                                <div className="insideDiv">
                                    <Outlet/>
                                </div>}
                            {pathname !== '/my-profile/dashboard' && <Footer/>}
                        </div>
                    </div>
                </>
                :<div><h1>...Loading</h1></div>}
        </>
    )
}

export default MyProfile;