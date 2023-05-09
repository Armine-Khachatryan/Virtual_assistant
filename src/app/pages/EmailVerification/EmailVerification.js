import React, {useState} from "react";
import config from "../../config";
import axios from "axios";
import Button from "../../UI/Button/Button";
import classes from './EmailVerification.module.css';
import MainImg from "../../assets/images/MainImg.png";




function EmailVerification() {


    const [verifyEmailError, setVerifyEmailError]=useState(false);


    let postVerifyEmail = async () => {
        console.log("hi")
        let email=localStorage.getItem('email');
        console.log(email);
        let formData = new FormData();
        formData.append('email',email)
        try {
            let response = await axios.post(`${config.baseUrl}api/email/verify/resend`, formData);
            console.log(response.data, "response data of resending to email")
            // if(response.data.success===true){
            //     // await navigate(`/login`)
            //     await localStorage.removeItem('email');
            // }
        } catch (error) {
            setVerifyEmailError("Something went wrong");
        }
    }



    return(
        <div className="whole">
            <div className="left">
                <div className="welcome">Welcome to </div>
                <div className="virt">Virt Assistant</div>
                <div className='sign'>Email Verification</div>
                <div className={classes.textVerify}>We’ve sent an email to useremail@gmail.com to verify your email
                    address and activate your account. The link in the email will expire in 24 hours</div>
                <Button width="520px" OnClick={postVerifyEmail}>Resent the link</Button>
                {verifyEmailError && <div className={classes.error}>Click Resent the link button again</div>}
            </div>
            <div className="right">
                <img src={MainImg} alt=""/>
            </div>
        </div>
    )
}


    export default EmailVerification;
