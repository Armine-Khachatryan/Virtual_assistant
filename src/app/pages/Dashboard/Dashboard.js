import React from "react";
import Facebook from '../../assets/images/Facebook.png';
import LinkedIn from '../../assets/images/LinkedIn.png';
import config from "../../config";
import Img1 from '../../assets/images/Img1.png';
import classes from './Dashboard.module.css';



function Dashboard(){





    return(
        <div className={classes.profileDiv}>
            <img src={Img1} alt=""/>
            <div className={classes.profileText}>
                In this part you will see your analytics. But first of all you need to connect your
                Facebook or Linkedin to our system
            </div>
            <div className={classes.profileText}>
                Connected to facebook
            </div>

            {/*<div className={classes.buttonsDiv}>*/}
            {/*    <div className={classes.btnProfile}>*/}
            {/*        <img src={Facebook} alt=""/>*/}
            {/*        <div className={classes.btnText}*/}
            {/*             onClick={()=> window.location.replace(`${config.baseUrl}auth/facebook/redirect`)}>*/}
            {/*            Connect to my Facebook</div>*/}
            {/*    </div>*/}
            {/*    <div className={classes.btnProfile}>*/}
            {/*        <img src={LinkedIn} alt=""/>*/}
            {/*        <div className={classes.btnText}>Connect to my Linkedin</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}


export default Dashboard;
