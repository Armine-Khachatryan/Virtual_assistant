import React from "react";
import Modal from 'react-modal';
import ClosingIcon from '../../assets/images/ClosingIcon.png';
import classes from './ResetPasswordModal.module.css';
import useValidation from "../../hooks/useValidation";
import useInput from "../../hooks/useInput";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";


function ResetPasswordModal(props){

    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '763px',
            width: '100%',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            background:'#FFFFFF',
            boxShadow:'0px 8px 16px rgba(0, 0, 0, 0.15)',
            borderRadius:'12px',
        },
        overlay: {zIndex: 1000}
    };


    const {isEmail} = useValidation();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        // isTouched: emailIsTouched
    } = useInput(isEmail);


    let emailMessage = null;
    if (!email) {
        emailMessage = "Email is required";
    } else if (!emailIsValid) {
        emailMessage = "Invalid email";
    }

    let formIsValid = false;
    if (emailIsValid){
        formIsValid = true;
    }

    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        resetEmail();
    }

    const openAndClose=()=>{
        props.openNewPasswordModal();
        props.closeResetPasswordModal()
    }

    const closeAndResetPasswordModal=()=>{
        props.closeResetPasswordModal();
        resetEmail()
    }


    return(
        <>
            <Modal
                isOpen={props.resetPasswordModalIsOpen}
                onRequestClose={closeAndResetPasswordModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="modalUpPart">
                    <div className="modalTitle">Reset your password</div>
                    <div className="closingImgDiv" onClick={closeAndResetPasswordModal}><img src={ClosingIcon} alt=""/></div>
                </div>
                <div className={classes.modalText}>Lost your password? Please enter your email address. You will
                    receive a link to create a new password via email.
                </div>
                <form onSubmit={submitHandler}>
                    <Input
                        label='Email'
                        width='713px'
                        // error={signInError}
                        hasError={emailHasError}
                        errorText={emailMessage}
                        input={{
                            value: email,
                            placeholder: "Type your email",
                            type: "email",
                            onChange: emailChangeHandler,
                            onBlur: emailBlurHandler
                        }}
                    />
                    <Button disabled={!formIsValid} width="713px"
                            marginTop="-8px"
                            type={"Reset Password"}>Sign In</Button>
                </form>
                <div className={classes.resetLink} onClick={openAndClose}>Resent the link</div>
            </Modal>
            </>

    )
}


export default ResetPasswordModal;
