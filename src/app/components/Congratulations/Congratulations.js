import React from "react";
import Button from "../../UI/Button/Button";
import Img2 from "../../assets/images/Img2.png";
import {useNavigate} from "react-router-dom";
import classes from './Congratulations.module.css';
import MainImg from "../../assets/images/MainImg.png";




function Congratulations() {

    const navigate = useNavigate();


    return (
        <div className={"whole"}>
            <div className={"left"}>
                <div className={"welcome"}>Welcome to</div>
                <div className={"virt"}>Virt Assistant</div>
                <div className={classes.textCongratulation}>Congratulations, your account has been successfully
                    created!</div>
                <Button  width="520px">Continue</Button>
            </div>
            <div className={"right"}>
                <img src={Img2} alt=""/>
            </div>
        </div>
    )
}


export default Congratulations;