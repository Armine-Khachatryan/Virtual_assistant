import React, {useState, useEffect, useRef} from "react";
import Person from '../../assets/images/Person.png';
import SignOut from '../../assets/images/SignOut.png';
import Settings from '../../assets/images/Settings.png';
import Notifications from '../../assets/images/Notifications.png';
import classes from './Header.module.css';
import {NavLink, useLocation} from "react-router-dom";



function Header(props){

    const [dropdownShow, setDropDownShow] = useState(false);
    const [notificationsModalIsOpen, setNotificationsModalModalIsOpen] = useState(false);

    function openNotificationsModal() {
        setNotificationsModalModalIsOpen(true)
    }

    function closeNotificationsModal() {
        setNotificationsModalModalIsOpen(false)
    }

    let closeHeaderDropDawnRef = useRef(null);
    let closeHeaderDropDawnContentRef = useRef(null);
    const {pathname} = useLocation();

    const handleClickDropdown = () => {
        setDropDownShow(!dropdownShow)
    }

    const handleClickOutSide = (e) => {
        let closeDropDawnRef = closeHeaderDropDawnRef;
        let contentRef = closeHeaderDropDawnContentRef;
        if (contentRef.current && !contentRef.current.contains(e.target)
            && !closeDropDawnRef.current.contains(e.target)) {
            setDropDownShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutSide, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide, true)
        }
    }, []);


    const switchName = (parameter) => {
        // return <div className={classes.headerLeft}>{pathname.split('/').at(-1)}</div>
        switch (parameter) {
            case '/my-profile/dashboard':
                return <div className={classes.headerLeft}>Dashboard</div>
            case '/my-profile/groups':
                return <div className={classes.headerLeft}>Groups</div>
            case '/my-profile/schedule':
                return <div className={classes.headerLeft}>Schedule</div>
            case '/my-profile/settings':
                return <div className={classes.headerLeft}>Settings</div>
            default:
                return <div className={classes.headerLeft}/>
        }
    };

    const clickAndNavigate=()=>{
        setDropDownShow(false)
        props.onSetRouting("settings")
    }



    return(
        <>
            <div className={classes.headerWhole}>
                {switchName(pathname)}
                <div className={classes.headerRight}>
                    <div onClick={openNotificationsModal}>
                        <img src={Notifications} alt=""/>
                    </div>
                    <div className={classes.hi}>Hi, Admin</div>
                    <div style={{cursor:"pointer"}} onClick={handleClickDropdown} ref={closeHeaderDropDawnRef}>
                        <img src={Person} alt=""/>
                    </div>
                    {
                        dropdownShow &&
                        <div
                            className="d-flex fd-column header_dropDown_content f-400"
                            ref={closeHeaderDropDawnContentRef}>
                            <NavLink
                                to="settings"
                                onClick={clickAndNavigate}
                                className={({isActive}) =>
                                    classes['nav_link' + (pathname === '/groups'  && isActive ?
                                        '_active' : '')]
                                }
                            >
                                <img className={classes.dropdownImg} src={Settings} alt=""/> Settings
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={({isActive}) =>
                                    classes['nav_link' + (pathname === '/login'  && isActive ?
                                        '_active' : '')]
                                }
                            >
                                <img className={classes.dropdownImg} src={SignOut} alt=""/>   Sign Out
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
            {/*<Notifications notificationsModalIsOpen={notificationsModalIsOpen}*/}
            {/*               closeNotificationsModal={closeNotificationsModal}/>*/}
        </>
    )
}


export default Header;