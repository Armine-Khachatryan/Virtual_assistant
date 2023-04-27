import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from './MyProfile.module.css';
import Footer from "../../components/Footer/Footer";



function MyProfile() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [activeSideBar, setActiveSideBar]=useState("dashboard");

    useEffect(() => {
         navigate('dashboard')
    }, [])


    const setRouting =(data)=>{
        setActiveSideBar(data);
        navigate(`./${data}`)
    }




    return (
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
    )
}

export default MyProfile;