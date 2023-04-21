import React from "react";
import classes from './Footer.module.css';


function Footer(){
    return(
        <div className={classes.footerWhole}>
            <div className={classes.footerText}>© 2023 Company Name. All rights reserved. </div>
        </div>
    )
}


export default Footer;
