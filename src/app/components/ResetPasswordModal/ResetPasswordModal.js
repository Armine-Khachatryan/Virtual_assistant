import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import axios from "axios";
import config from "../../config";
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
    const [resetPasswordError, setResetPasswordError]= useState(null);

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isTouched: emailIsTouched
    } = useInput(isEmail);

    useEffect(() => {
        if(emailIsTouched){
            setResetPasswordError("")
        }
    },[emailIsTouched]);


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

    const closeAndResetPasswordModal=()=>{
        props.closeResetPasswordModal();
        resetEmail();
        setResetPasswordError("")
    }


    const postResetPassword = async (email) => {
        let formData = new FormData();
        formData.append('email', email)
        try {
            let response = await axios.post(`${config.baseUrl}api/forgot/password`, formData);
            if(response.data.success===true){
                props.closeResetPasswordModal();
                props.openResetCodeModal();
                props.onHandleSave(email);
                resetEmail();
                setResetPasswordError("")
            }
        } catch (error) {
            console.log(error, "forgetPasswordModalError")
            setResetPasswordError("Something went wrong");
        }
    }


    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        postResetPassword(email);
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
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
                            onBlur: emailBlurHandler,
                            onKeyPress:handleKeyPress
                        }}
                    />
                    <Button disabled={!formIsValid} width="713px"
                            marginTop="-8px"
                            type={"submit"}
                            // type={"Reset Password"}
                    >Reset Password</Button>
                    {resetPasswordError && <div className={classes.resetPasswordError}>{resetPasswordError}</div>}
                </form>
            </Modal>
            </>

    )
}


export default ResetPasswordModal;
