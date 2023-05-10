import React, {useEffect, useState} from "react";
import ReactCodeInput from "react-code-input";
import Modal from 'react-modal';
import axios from "axios";
import config from "../../config";
import classes from './ResetCodeModal.module.css';
// import {Input} from "reactstrap";
// import useInput from "../../hooks/useInput";
// import useValidation from "../../hooks/useValidation";


function ResetCodeModal(props) {
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
            background: '#FFFFFF',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
        },
        overlay: {zIndex: 1000}
    };
    const [resetCodeError, setResetCodeError] = useState(null);
    const [resendAgainCodeMessage, setResendAgainCodeMessage] = useState(null);
    const [inputValue, setInputValue] = useState("")

    let resendCode = () => {
        let formData = new FormData();
        formData.append('email', props.emailValue)
        axios.post(`${config.baseUrl}api/forgot/password`, formData)
            .then(() => {
                setResendAgainCodeMessage("Please check your email.");
                setResetCodeError("");
            })
            .catch(e => {
                console.log(e, "forgetPasswordModalError")
                setResendAgainCodeMessage("Something went wrong.")
            })
    }
    console.log(inputValue)


    let postResetCodePassword = async () => {
        let formData = new FormData();
        formData.append('email', props.emailValue)
        formData.append('pin', inputValue)
        try {
            let response = await axios.post(`${config.baseUrl}api/verify/pin`, formData);
            if (response.data.success === true) {
                props.onSetCodeInputValue(response.data.data)
                props.closeResetCodeModal();
                props.openNewPasswordModal();
                setResendAgainCodeMessage("");
                setResetCodeError("");
            }
        } catch (error) {
            setResendAgainCodeMessage("");
            setResetCodeError("Something went wrong");
        }
    }

    function closeAndResetResetCodeModal() {
        props.closeResetCodeModal();
        setInputValue("")
        setResetCodeError(" ")
        setResendAgainCodeMessage("");
    }


    return (
        <Modal
            isOpen={props.resetCodeModalIsOpen}
            onRequestClose={closeAndResetResetCodeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className={classes.modalVerifyCode}>
                <div className={classes.verifyTitle}>Verify Email</div>
                <div className={classes.subTitle}>Enter the 6-digit code we are have sent via email.</div>
                <div className={classes.centre}>
                    <ReactCodeInput type='text' fields={6} value={inputValue} onChange={e => setInputValue(e)}/>
                </div>
                <div className={classes.codeAndSend}>Didn't receive any code?
                    <span className={classes.sendAgain}
                          onClick={resendCode}
                    >Send again</span></div>
                <button className={classes.verifyBtn} onClick={postResetCodePassword}>Next</button>
                {resetCodeError && <div className={classes.verifyError}>{resetCodeError}</div>}
                {resendAgainCodeMessage && <div className={classes.verifyError}>{resendAgainCodeMessage}</div>}
            </div>
        </Modal>
    )
}


export default ResetCodeModal;

