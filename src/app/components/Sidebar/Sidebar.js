import React from "react";
import ActiveDashboardIcon from '../../assets/images/ActiveDashboardIcon.png';
import ActiveGroupIcon from '../../assets/images/ActiveGroupIcon.png';
import ActiveScheduleIcon from '../../assets/images/ActiveScheduleIcon.png';
import ScheduleIcon from '../../assets/images/ScheduleIcon.png';
import AppointmentIcon from '../../assets/images/AppointmentIcon.png';
import ActiveAppointmentIcon from '../../assets/images/ActiveAppointmentIcon.png';
import GroupIcon from '../../assets/images/GroupIcon.png';
import DashboardIcon from '../../assets/images/DashboardIcon.png'
import classes from './Sidebar.module.css';




function Sidebar(props){

    const setActive=(data)=>{
    console.log(data)
    props.onSetRouting(data)
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
        },
        {
            icon:AppointmentIcon,
            activeIcon: ActiveAppointmentIcon,
            name:"manage_available_time"
        }
    ]

    function changeName(value){
        console.log(value)
        if(value.includes("_")){
           let  val=value.replaceAll("_", " ");
           console.log(val, "val")
           return val.charAt(0).toUpperCase()+val.slice(1)
        }
        else{
            return(value.charAt(0).toUpperCase()+value.slice(1))
        }
    }

    // {props.activeSideBar ==="groups/messages" && item.name ==="groups" ? <img src={ActiveGroupIcon} alt=""/> :
    //     <img src={GroupIcon} alt=""/>}

    const renderSideBarData=sideBarData.map((item, index)=>
        <div className={classes.sidebarDiv} key={index}  onClick={()=>setActive(item.name)}>
            {/*{props.activeSideBar ==="groups/messages" && item.name ==="groups" ? <img src={ActiveGroupIcon} alt=""/> :*/}
            {/*    <img src={GroupIcon} alt=""/>}*/}
            {props.activeSideBar.includes(item.name) ?  <img src={item.activeIcon} alt=""/>:
            <img src={item.icon} alt=""/>}
            <div className={props.activeSideBar.includes(item.name) ? classes.sidebarActiveName: classes.sideBarName}>
                {changeName(item.name)}</div>
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