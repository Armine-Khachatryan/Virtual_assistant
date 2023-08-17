import React, {useState, useEffect} from "react";
import classes from './Messages.module.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import IconMessages1 from "../../assets/images/IconMessages1.png";
import IconMessages2 from "../../assets/images/IconMessages2.png";
import IconMessages3 from "../../assets/images/IconMessages3.png";
import IconMessages4 from "../../assets/images/IconMessages4.png";
import Header from "../../components/Header/Header";
import axios from "axios";
import config from "../../config";
import {setUserData} from "../../features/User/UserSlice";
import {useLocation, useOutletContext} from "react-router-dom";


function Messages(){

    const [showMessagesList, setShowMessagesList]=useState(false);
    const [generatedMessages, setGeneratedMessages]=useState(null);

    const changeMessagesStyle =()=>{
        setShowMessagesList(!showMessagesList)
    }

    const {state} = useLocation();
    const groupId = state;




    useEffect(() => {
        getMessages();
    }, []);


    let getMessages = async () => {
        let token= sessionStorage.getItem('token')
        try {
            let response = await axios.get(`${config.baseUrl}api/my-profile/group-messages?groupId=${groupId}`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            setGeneratedMessages(response.data.data.messages)
        } catch (error) {
            console.log(error.response, 'auth request  error response');
        }
    }



    const renderMessages=generatedMessages?.map((item, index)=>(
            <>
                {showMessagesList ?<div className={classes.messageStyle2}>{item.message}</div>
                    : <div className={classes.messageStyle1}>{item.message}</div>}
            </>
        )
    )

    return(
                <div className={classes.messagesWhole}>
                    <div className={classes.upperPart}>
                        <div className={classes.titleDiv}>My Groups <span className={classes.bold}>/</span>
                            <span className={classes.blueTitle}>Messages Generated from ChatGPT</span>
                        </div>
                        <div className={classes.icons}>
                            <div onClick={changeMessagesStyle}>
                                {showMessagesList ? <img src={IconMessages2} className={classes.iconStyle} alt=""/>
                                : <img src={IconMessages1} className={classes.iconStyle} alt=""/>
                                }
                            </div>
                            <div onClick={changeMessagesStyle}>
                                {showMessagesList ? <img src={IconMessages3} alt=""/>
                                :<img src={IconMessages4} alt=""/>}
                            </div>
                        </div>
                    </div>
                    {showMessagesList ?
                    <div className={classes.messagesDiv}>
                        {renderMessages}
                    </div>:
                    <div className={classes.container}>
                        {renderMessages}
                    </div>}
                </div>
    )
}



export default Messages;