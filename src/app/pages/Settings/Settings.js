import React, {useState} from "react";
import classes from './Settings.module.css';
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";


function Settings() {


    const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] = useState(false);

    function openChangePasswordModal() {
        setChangePasswordModalIsOpen(true)
    }

    function closeChangePasswordModal() {
        setChangePasswordModalIsOpen(false)
    }



    return(
        <>
            <div className={classes.settingsWhole}>
                <div className={classes.settingsUpPart}>
                    <div className={classes.settingsTitle}>Profile Details</div>
                    <div className={classes.settingsButton}>Edit Profile</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Full Name</div>
                    <div className={classes.settingsData}>Name Surname</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Email</div>
                    <div className={classes.settingsData}>useremail@gmail.com</div>
                    <div className={classes.greenDiv}>Verified</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Facebook Account</div>
                    <div className={classes.settingsData}>Account Name</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Password</div>
                    <div className={classes.linkBtn} onClick={openChangePasswordModal}>Change Password</div>
                </div>
            </div>
            <ChangePasswordModal changePasswordModalIsOpen={changePasswordModalIsOpen}
                                 closeChangePasswordModal={closeChangePasswordModal}/>
        </>

    )
}


export default Settings;