import React, {useState, useEffect} from "react";
import classes from './Messages.module.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import IconMessages1 from "../../assets/images/IconMessages1.png";
import IconMessages2 from "../../assets/images/IconMessages2.png";
import IconMessages3 from "../../assets/images/IconMessages3.png";
import IconMessages4 from "../../assets/images/IconMessages4.png";
import Header from "../../components/Header/Header";


function Messages(){

    const [showMessagesList, setShowMessagesList]=useState(false);

    const changeMessagesStyle =()=>{
        setShowMessagesList(!showMessagesList)
    }

    const messages=[
        {
        message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been " +
            "the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type " +
            "and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap " +
            "into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the " +
            "release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing " +
            "software like Aldus PageMaker including versions of Lorem Ipsum."
    },
        {
            message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been " +
                "the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
                " and scrambled it to make a type specimen book. It has survived not only five centuries, but also the " +
                "leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s" +
                " with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
                "publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
                "\n" +
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been " +
                "the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
                " and scrambled it to make a type specimen book. It has survived not only five centuries, but also the" +
                " leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s" +
                " with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
                "publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the " +
                "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
                " and scrambled it to make a type specimen book. It has survived not only five centuries, but also the " +
                "leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s " +
                "with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop" +
                " publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been" +
                " the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of " +
                "type and scrambled it to make a type specimen book. It has survived not only five centuries, but also" +
                " the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
                "1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" +
                " desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
                "\n" +
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been" +
                " the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of " +
                "type and scrambled it to make a type specimen book. It has survived not only five centuries, but also" +
                " the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
                "1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" +
                " desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the " +
                "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type" +
                " and scrambled it to make a type specimen book. It has survived not only five centuries, but also the " +
                "leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s " +
                "with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop" +
                " publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
    ]

    const renderMessages=messages.map((item, index)=>(
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