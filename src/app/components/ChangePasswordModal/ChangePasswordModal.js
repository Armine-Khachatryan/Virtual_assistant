import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import axios from "axios";
import config from "../../config";
import ClosingIcon from '../../assets/images/ClosingIcon.png';
import useValidation from "../../hooks/useValidation";
import useInput from "../../hooks/useInput";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import EyeImage from "../../assets/images/EyeImage.png";
import ClosedEye from "../../assets/images/ClosedEye.png";
import classes from './ChangePasswordModal.module.css';




function ChangePasswordModal(props) {


    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '763px',
            width: '100%',
            top: '45%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFFFF',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
        },
        overlay: {zIndex: 1000}
    };

    const {isPassword}=useValidation();
    const [changePasswordError, setChangePasswordError] = useState(null);

    const {
        value: oldPassword,
        isValid: oldPasswordIsValid,
        hasError: oldPasswordHasError,
        valueChangeHandler: oldPasswordChangeHandler,
        inputBlurHandler: oldPasswordBlurHandler,
        togglePassword: oldPasswordShowHandler,
        passwordShown:oldPasswordShow,
        reset: resetOldPassword,
        showPassFalse: showPassFalse,
        isTouched: oldPasswordIsTouched
    } = useInput(isPassword);



    const {
        value:newPassword,
        isValid:newPasswordIsValid,
        hasError:newPasswordHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler:newPasswordBlurHandler,
        togglePassword: newPasswordShowHandler,
        passwordShown:newPasswordShow,
        reset: resetNewPassword,
        isTouched: newPasswordIsTouched
    } = useInput(isPassword);





    useEffect(() => {
        if(oldPasswordIsTouched || newPasswordIsTouched){
            setChangePasswordError("")
        }
    },[oldPasswordIsTouched,newPasswordIsTouched]);


    let formIsValid = false;
    if (oldPasswordIsValid && newPasswordIsValid) {
        formIsValid = true;
    }


    function closeAndResetChangePasswordModal (){
        props.closeChangePasswordModal();
        resetOldPassword();
        resetNewPassword();
        showPassFalse();
        setChangePasswordError("")
    }

    const postChangePassword =  () => {
        let formData = new FormData();
        formData.append("old_password", oldPassword);
        formData.append("new_password", newPassword);
          axios.post(`${config.baseUrl}api/settings/change/password`, formData, {
                headers: {
                    "Authorization": `Bearer ${props.accessToken}`
                }
            }
            ).then(() => {
              resetOldPassword();
              showPassFalse();
              resetNewPassword();
              props.closeChangePasswordModal();
              setChangePasswordError("")
        })  .catch(e => {
                setChangePasswordError("Something went wrong.")
        })
    }

    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        postChangePassword();
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }


    return(
        <>
            <Modal
                isOpen={props.changePasswordModalIsOpen}
                onRequestClose={closeAndResetChangePasswordModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="modalUpPart">
                    <div className="modalTitle">Change Password</div>
                    <div className="closingImgDiv" onClick={closeAndResetChangePasswordModal}>
                        <img src={ClosingIcon} alt=""/></div>
                </div>
                <form
                    onSubmit={submitHandler} className={classes.formWhole}
                >
                    <Input
                        label='Old Password'
                        error={changePasswordError}
                        width='520px'
                        hasError={oldPasswordHasError}
                        errorText="Password must contain one lowercase, one uppercase, one number,
                         one special character, 8 characters minimum"
                        image={oldPasswordShow ? EyeImage : ClosedEye}
                        onClick={oldPasswordShowHandler}
                        input={{
                            value: oldPassword,
                            placeholder: "Type your old password",
                            type: oldPasswordShow ? "text" : "password",
                            onChange: oldPasswordChangeHandler,
                            onBlur: oldPasswordBlurHandler,
                        }}
                    />
                    <Input
                        label='New Password'
                        error={changePasswordError}
                        width='520px'
                        hasError = {newPasswordHasError}
                        errorText="Password must contain one lowercase, one uppercase, one number,
                         one special character, 8 characters minimum"
                        image ={newPasswordShow ? EyeImage : ClosedEye}
                        onClick={newPasswordShowHandler}
                        input={{
                            value: newPassword,
                            placeholder: "Set new password",
                            type: newPasswordShow ? "text" : "password",
                            onChange: newPasswordChangeHandler,
                            onBlur: newPasswordBlurHandler,
                            onKeyPress:handleKeyPress
                        }}
                    />
                    <Button disabled={!formIsValid} width="520px"
                            marginTop="-8px"
                            type={"submit"}
                    >Save Changes</Button>
                </form>
            </Modal>
        </>
    )
}


export default ChangePasswordModal;