import React, {useState, useEffect, useRef} from "react";
import Person from '../../assets/images/Person.png';
import SignOut from '../../assets/images/SignOut.png';
import Settings from '../../assets/images/Settings.png';
import {useSelector} from "react-redux";
import Notifications from "../Notifications/Notifications";
import GreyNotification from '../../assets/images/GreyNotification.svg';
import BlueNotification from '../../assets/images/BlueNotification.svg';
import classes from './Header.module.css';
import {useDispatch} from "react-redux";
import {setUserData} from "../../features/User/UserSlice";
import {NavLink, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../config";



function Header(props){


    // const customer = useSelector((state)=>state?.user?.data);
    // console.log(customer, 22222222)
    //  let userName = customer ? customer.email: ""
    const navigate =useNavigate();
    const [dropdownShow, setDropDownShow] = useState(false);
    const [notificationsModalIsOpen, setNotificationsModalModalIsOpen] = useState(false);
    const dispatch=useDispatch();
    const customer = useSelector((state)=>state.user.data);
    let userName = customer ? customer.full_name : '';


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

    let removeTokenHandler = async () => {
        let token= sessionStorage.getItem('token');
        try {
            let response = await axios.post(`${config.baseUrl}api/logout`,{}, {
                   headers: {
                       "Authorization": `Bearer ${token}`
                    }
                });
            console.log(response.data, "log out response");
            sessionStorage.clear();
            props.setAccessToken("");
            dispatch(setUserData(null));
            navigate('/')
        }
         catch (error) {
            console.log(error, "error message")
         }
    }

    return(
        <>
            <div className={classes.headerWhole}>
                {switchName(pathname)}
                <div className={classes.headerRight}>
                    <div onClick={openNotificationsModal}>
                        {!notificationsModalIsOpen ?   <img src={GreyNotification}  className={classes.cursor} alt=""/>
                        :  <img src={BlueNotification}  className={classes.cursor} alt=""/>}
                    </div>
                    <div className={classes.hi}>Hi, {userName}</div>
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
                            <div className={classes.signOutDiv} onClick={removeTokenHandler}>
                                <img className={classes.dropdownImg} src={SignOut} alt=""/>
                                Sign out
                            </div>
                            {/*<NavLink*/}
                            {/*    // to="/"*/}
                            {/*    onClick={removeTokenHandler}*/}
                            {/*    to="/"*/}
                            {/*    className={({isActive}) =>*/}
                            {/*        classes['nav_link' + (pathname === '/'  && isActive ?*/}
                            {/*            '_active' : '')]*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*    Sign Out*/}
                            {/*</NavLink>*/}
                        </div>
                    }
                </div>
            </div>
            <Notifications notificationsModalIsOpen={notificationsModalIsOpen}
                           closeNotificationsModal={closeNotificationsModal}/>
        </>
    )
}


export default Header;