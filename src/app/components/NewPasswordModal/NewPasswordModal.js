import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import ClosingIcon from '../../assets/images/ClosingIcon.png';
import useValidation from "../../hooks/useValidation";
import useInput from "../../hooks/useInput";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import EyeImage from "../../assets/images/EyeImage.png";
import ClosedEye from "../../assets/images/ClosedEye.png";



function NewPasswordModal(props){



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

    const {isPassword}=useValidation();
    const [newPasswordError, setNewPasswordError] = useState(null);


    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        togglePassword: passwordShowHandler,
        passwordShown: passwordShow,
        reset: resetPassword,
        showPassFalse: showPassFalse,
        isTouched: passwordIsTouched
    } = useInput(isPassword);



    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        togglePassword: confirmPasswordShowHandler,
        passwordShown: confirmPasswordShow,
        reset: resetConfirmPassword,
        isTouched: confirmPasswordIsTouched
    } = useInput(isPassword);

    useEffect(() => {
        if(passwordIsTouched || confirmPasswordIsTouched){
            setNewPasswordError("")
        }
    },[passwordIsTouched,confirmPasswordIsTouched]);


    let hasError = false;
    let confirmPasswordMessage=null;
    if(password !== confirmPasswordValue){
        hasError = true;
        confirmPasswordMessage = "Passwords do not match"
    }


    let formIsValid = false;
    if (passwordIsValid && confirmPasswordIsValid && password === confirmPasswordValue) {
        formIsValid = true;
    }



    function closeAndResetNewPasswordModal (){
        props.closeNewPasswordModal();
        resetPassword();
        resetConfirmPassword();
        showPassFalse();
        setNewPasswordError("")
    }

    // const postChangePassword = async () => {
    //     let formData = new FormData();
    //     formData = {
    //         email: props.emailValue,
    //         password: password,
    //         password_confirmation:confirmPasswordValue
    //     }
    //     console.log(formData, "formData")
    //     try {
    //         let response = await axios.post(`${config.baseUrl}api/reset/password`, formData);
    //         console.log(response.data, "response.data");
    //         if(response.data.success===true){
    //             props.closeNewPassworModal();
    //             props.openLoginModal()
    //         }
    //     } catch (error) {
    //         console.log(error, "resetPasswordModalError")
    //         setChangePasswordError("Something went wrong");
    //     }
    // }
    //
    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        // postChangePassword();
        resetPassword();
        showPassFalse()
        resetConfirmPassword()
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    return(
        <>
            <Modal
                isOpen={props.newPasswordModalIsOpen}
                onRequestClose={closeAndResetNewPasswordModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="modalUpPart">
                    <div className="modalTitle">Reset your password</div>
                    <div className="closingImgDiv" onClick={closeAndResetNewPasswordModal}><img src={ClosingIcon} alt=""/></div>
                </div>
                <form
                    onSubmit={submitHandler}
                >
                    <Input
                        label='Password'
                        error={newPasswordError}
                        width='713px'
                        hasError={passwordHasError}
                        errorText="Password must contain one lowercase, one uppercase, one number,
                         one special character, 8 characters minimum"
                        image={passwordShow ? EyeImage : ClosedEye}
                        onClick={passwordShowHandler}
                        input={{
                            value: password,
                            placeholder: "Type new password",
                            type: passwordShow ? "text" : "password",
                            onChange: passwordChangeHandler,
                            onBlur: passwordBlurHandler,
                        }}
                    />
                    <Input
                        label='Repeat New Password'
                        error={newPasswordError}
                        width='713px'
                        hasError = {hasError && confirmPasswordIsTouched}
                        errorText={confirmPasswordMessage}
                        image ={confirmPasswordShow ? EyeImage : ClosedEye}
                        onClick={confirmPasswordShowHandler}
                        input={{
                            value: confirmPasswordValue,
                            placeholder: "Repeat New Password",
                            type: confirmPasswordShow ? "text" : "password",
                            onChange: confirmPasswordChangeHandler,
                            onBlur: confirmPasswordBlurHandler,
                            onKeyPress:handleKeyPress
                        }}
                    />
                    <Button disabled={!formIsValid} width="713px"
                            marginTop="-8px"
                            type={"Reset Password"}>Save</Button>
                </form>
            </Modal>
        </>
    )
}


export default NewPasswordModal;