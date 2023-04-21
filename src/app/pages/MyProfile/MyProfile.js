import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from './MyProfile.module.css';
import Footer from "../../components/Footer/Footer";



function MyProfile() {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
         navigate('/dashboard')
    }, [])

    return (
        <div className={classes.profileWhole}>
            <Sidebar/>
            <div className={classes.profileRight}>
                <Header/>
                {pathname === '/dashboard' ? <div className="insideDivDashboard"> <Outlet/></div>:
                <div className="insideDiv">
                    <Outlet/>
                </div>}
                {pathname !== '/dashboard' && <Footer/>}
            </div>
        </div>
    )
}

export default MyProfile;