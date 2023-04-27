import React from "react";
import Button from "../../UI/Button/Button";
import classes from './EmailVerification.module.css';
import MainImg from "../../assets/images/MainImg.png";




function EmailVerification() {


    return(
        <div className="whole">
            <div className="left">
                <div className="welcome">Welcome to </div>
                <div className="virt">Virt Assistant</div>
                <div className='sign'>Email Verification</div>
                <div className={classes.textVerify}>We’ve sent an email to useremail@gmail.com to verify your email
                    address and activate your account. The link in the email will expire in 24 hours</div>
                <Button width="520px">Resent the link</Button>
            </div>
            <div className="right">
                <img src={MainImg} alt=""/>
            </div>
        </div>
    )
}


    export default EmailVerification;
