import React from "react";
import classes from './AfterZoomCall.module.css';
import Img1 from "../../assets/images/Img1.png";


function AfterZoomCall(){
    return(
        <div className={classes.profileDiv}>
            <img src={Img1} alt=""/>
            <div className={classes.profileText}>
                After first zoom call in this part you will see your analytics about the groups
            </div>
        </div>
    )
}


export default AfterZoomCall;




