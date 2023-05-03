import React, {useState} from "react";
import classes from './Settings.module.css';
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import Input from "../../UI/Input/Input";
import AddNewAccountModal from "../../components/AddNewAccountModal/AddNewAccountModal";


function Settings() {

    const [showProfileEdits, setShowProfileEdits]=useState(false);
    const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] = useState(false);
    const [addNewAccountModalIsOpen, setAddNewAccountModalIsOpen] = useState(false);


    function openChangePasswordModal() {
        setChangePasswordModalIsOpen(true)
    }

    function closeChangePasswordModal() {
        setChangePasswordModalIsOpen(false)
    }

    function openAddNewAccountModal() {
        setAddNewAccountModalIsOpen(true)
    }

    function closeAddNewAccountModal() {
        setAddNewAccountModalIsOpen(false)
    }


    const [values, setValues] = useState({
        fullName: 'Name Surname',
        email: 'useremail@gmail.com',
        facebookAccount:"Account link/details"
    });

    const [errors, setErrors] = useState({
        fullName: null,
        email: null,
        facebookAccount:null
    });

    const handleChange = ({target:{name, value}})=>{
        setValues({
            ...values,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: null
        });
    };

    const handleSubmit = (e) => {
        const {fullName, facebookAccount} = values;
        let valid = true;
        let fullNameMessage = null;
        let facebookAccountMessage = null;


        if (!fullName) {
            fullNameMessage = "Full Name is required";
            valid = false
        }

        if (!facebookAccount) {
            facebookAccountMessage = "Facebook Account is required";
            valid = false
        }

        setErrors({
            fullName: fullNameMessage,
            facebookAccount : facebookAccountMessage
        });
        if (valid) {
            console.log("dflkdjlfkjdljf")
            setShowProfileEdits(prevState => !prevState)
        }
    }

        return(
        <>
            <div className={classes.settingsWhole}>
                <div className={classes.settingsUpPart}>
                    <div className={classes.settingsTitle}>Profile Details</div>
                    <div className={classes.settingsButton}
                         onClick={handleSubmit}>
                        {!showProfileEdits? "Edit Profile" : "Save"}</div>
                </div>
                {!showProfileEdits ? <>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Full Name</div>
                    <div className={classes.settingsData}>{values.fullName}</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Email</div>
                    <div className={classes.settingsData}>useremail@gmail.com</div>
                    <div className={classes.greenDiv}>Verified</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Facebook Account</div>
                    <div className={classes.settingsData}>{values.facebookAccount}</div>
                </div>
                <div className={classes.settingsPart}>
                    <div className={classes.settingsName}>Password</div>
                    <div className={classes.linkBtn} onClick={openChangePasswordModal}>Change Password</div>
                </div>
                    </>
                    :
                    <>
                        <div className={classes.labelAndInput}>
                            <label htmlFor="fullName" className={classes.labelDiv}>Full Name</label>
                                <input className={classes.inputDiv}
                                       id={'fullName'}
                                       name="fullName"
                                       // placeholder="Enter Your password"
                                       value={values.fullName}
                                       onChange={handleChange}
                                       required/>
                            <div className={classes.textDanger}>
                                {errors.fullName}
                            </div>
                        </div>
                        <div className={classes.labelAndInput}>
                            <label htmlFor="email" className={classes.labelDiv}>Email</label>
                            <input className={classes.inputDiv}
                                   style={{backgroundColor:"#F0F1F2"}}
                                   id={'email'}
                                   name="fullName"
                                // placeholder="Enter Your password"
                                   value={values.email}
                                   // onChange={handleChange}
                                   required
                                   readOnly/>
                            <div className={classes.textDanger}>
                                {/*{errors.password}*/}
                            </div>
                        </div>
                        <div className={classes.labelAndInput}>
                            <label htmlFor="facebookAccount" className={classes.labelDiv}>Facebook Account</label>
                            <input className={classes.inputDiv}
                                   id={'facebookAccount'}
                                   name="facebookAccount"
                                // placeholder="Enter Your password"
                                   value={values.facebookAccount}
                                   onChange={handleChange}
                                   required
                            />
                            <div className={classes.textDanger}>
                                {errors.facebookAccount}
                            </div>
                        </div>
                        <div className={classes.settingsButton} onClick={openAddNewAccountModal}>Add new profile</div>
                        <div className={classes.settingsEditPart}>
                            <div className={classes.settingsEditName}>Password</div>
                            <div className={classes.linkBtn} onClick={openChangePasswordModal}>Change Password</div>
                        </div>
                    </>}
            </div>
            <ChangePasswordModal changePasswordModalIsOpen={changePasswordModalIsOpen}
                                 closeChangePasswordModal={closeChangePasswordModal}/>
            <AddNewAccountModal addNewAccountModalIsOpen={addNewAccountModalIsOpen}
                                closeAddNewAccountModal={closeAddNewAccountModal}/>
        </>
    )
}


export default Settings;