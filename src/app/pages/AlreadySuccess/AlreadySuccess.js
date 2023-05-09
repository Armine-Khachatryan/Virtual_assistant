import React from "react";
import classes from './AlreadySuccess.module.css';
import Button from "../../UI/Button/Button";
import MainImg from "../../assets/images/MainImg.png";
import {useNavigate} from "react-router-dom";



function AlreadySuccess(){



    const navigate = useNavigate();


    return(
        <div className="whole">
            <div className="left">
                <div className="welcome">Welcome to </div>
                <div className="virt">Virt Assistant</div>
                <div className='sign'>You have already verified your email</div>
                <div className={classes.textStyle}>Please sign in  to continue the process</div>
                <Button width="520px" OnClick={() => navigate(`/`)}>Sign In</Button>
            </div>
            <div className="right">
                <img src={MainImg} alt=""/>
            </div>
        </div>
    )
}


export default AlreadySuccess;
