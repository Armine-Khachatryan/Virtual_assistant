import React, {useState} from "react";
import ActiveDashboardIcon from '../../assets/images/ActiveDashboardIcon.png';
import ActiveGroupIcon from '../../assets/images/ActiveGroupIcon.png';
import ActiveScheduleIcon from '../../assets/images/ActiveScheduleIcon.png';
import ScheduleIcon from '../../assets/images/ScheduleIcon.png';
import GroupIcon from '../../assets/images/GroupIcon.png';
import DashboardIcon from '../../assets/images/DashboardIcon.png'
import classes from './Sidebar.module.css';
import {useNavigate} from "react-router-dom";



function Sidebar(){

    const navigate=useNavigate();


const [activeSideBar, setActiveSideBar]=useState("dashboard");

const setActive=(data)=>{
    setActiveSideBar(data);
    console.log(data);
    navigate(`/${data}`)
}


    const sideBarData=[
        {
            icon:DashboardIcon,
            activeIcon:ActiveDashboardIcon,
            name:"dashboard"
        },
        {
            icon:GroupIcon,
            activeIcon:ActiveGroupIcon,
            name:"groups"
        },
        {
            icon:ScheduleIcon,
            activeIcon: ActiveScheduleIcon,
            name:"schedule"
        }
    ]


    const renderSideBarData=sideBarData.map((item, index)=>
        <div className={classes.sidebarDiv} key={index}  onClick={()=>setActive(item.name)}>
            {activeSideBar===item.name ?    <img src={item.activeIcon} alt=""/>:
            <img src={item.icon} alt=""/>}
            <div className={activeSideBar ===item.name ? classes.sidebarActiveName: classes.sideBarName}>
                {item.name.charAt(0).toUpperCase()+item.name.slice(1)}</div>
        </div>
    )

    return(
        <div className={classes.sideBarWhole}>
            <div className={classes.logo}>Product Logo</div>
            {renderSideBarData}
        </div>
    )
}


export default Sidebar;