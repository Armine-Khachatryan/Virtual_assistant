import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import useInput from "../../hooks/useInput";
import useValidation from "../../hooks/useValidation";
import MainImg from '../../assets/images/MainImg.png';
import ClosedEye from '../../assets/images/ClosedEye.png';
import EyeImage from '../../assets/images/EyeImage.png';
import classes from './Registration.module.css';
import {useNavigate} from "react-router-dom";


function Registration() {

    const navigate = useNavigate();
    const {isName, isEmail, isPassword} = useValidation();
    const [signUpError, setSignUpError] = useState(null);


    const {
        value: fullName,
        isValid: fullNameIsValid,
        hasError: fullNameHasError,
        valueChangeHandler: fullNameChangeHandler,
        inputBlurHandler: fullNameBlurHandler,
        reset: resetFullName,
        isTouched: fullNameIsTouched
    } = useInput(isName);

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isTouched: emailIsTouched
    } = useInput(isEmail);

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
        if (fullNameIsTouched || emailIsTouched
            || passwordIsTouched || confirmPasswordIsTouched) {
            setSignUpError("")
        }
    }, [fullNameIsTouched, emailIsTouched, passwordIsTouched, confirmPasswordIsTouched]);


    let hasError = false;
    let confirmPasswordMessage=null;
    if(password !== confirmPasswordValue){
        hasError = true;
        confirmPasswordMessage = "Passwords do not match"
    }



    let emailMessage = null;
    if (!email) {
        emailMessage = "Email is required";
    } else if (!emailIsValid) {
        emailMessage = "Invalid email";
    }

    let formIsValid = false;
    if (fullNameIsValid
        && emailIsValid
        && passwordIsValid
        && confirmPasswordIsValid) {
        formIsValid = true;
    }

    const body = {
        full_name: fullName,
        email,
        password,
        password_confirmation: confirmPasswordValue
    }


    let postRegistration = async (body)=> {
        let formData = new FormData();
        formData.append('full_name', body.full_name);
        formData.append('email', body.email);
        formData.append('password', body.password);
        formData.append('password_confirmation', body.password_confirmation);
        try {
            let response = await axios.post(`${config.baseUrl}api/register`, formData);
            if(response.data.data==="success") {
                localStorage.setItem('email', body.email);
                navigate(`/email-verification`);
            }
        }
        catch (e) {
            setSignUpError("Something went wrong");
        }
    }



    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
         postRegistration(body);
         resetFullName();
         resetEmail();
         resetPassword();
         resetConfirmPassword();
         showPassFalse();
         // navigate(`/email-verification`);
    };


    return(
        <div className={"whole"}>
            <div className={"left"}>
                <div className={"welcome"}>Welcome to </div>
                <div className={"virt"}>Virt Assistant</div>
                <div className={'sign'}>Sign Up</div>
                <form onSubmit={submitHandler}>
                    <Input
                        label='Full Name'
                        error={signUpError}
                        hasError={fullNameHasError}
                        errorText="Please enter Full Name."
                        width='520px'
                        input={{
                            value: fullName,
                            placeholder: "Type your name surname",
                            type: "text",
                            onChange: fullNameChangeHandler,
                            onBlur: fullNameBlurHandler,
                        }}
                    />
                    <Input
                        label='Email'
                        error={signUpError}
                        hasError={emailHasError}
                        errorText={emailMessage}
                        width='520px'
                        input={{
                            value: email,
                            placeholder: "Type your email",
                            type: "email",
                            onChange: emailChangeHandler,
                            onBlur: emailBlurHandler
                        }}
                    />
                    <Input
                        label='Password'
                        error={signUpError}
                        hasError={passwordHasError}
                        errorText="Password must contain one lowercase, one uppercase, one number,
                         one special character, 8 characters minimum"
                        width='520px'
                        image={passwordShow ? EyeImage : ClosedEye}
                        onClick={passwordShowHandler}
                        input={{
                            value: password,
                            placeholder: "Set your password",
                            type: passwordShow ? "text" : "password",
                            onChange: passwordChangeHandler,
                            onBlur: passwordBlurHandler,
                        }}
                    />
                    <Input
                        label='Confirm password'
                        error={signUpError}
                        hasError={hasError && confirmPasswordIsTouched}
                        errorText={confirmPasswordMessage}
                        width='520px'
                        image={confirmPasswordShow ? EyeImage : ClosedEye}
                        onClick={confirmPasswordShowHandler}
                        input={{
                            value: confirmPasswordValue,
                            placeholder: "Confirm your password",
                            type: confirmPasswordShow ? "text" : "password",
                            onChange: confirmPasswordChangeHandler,
                            onBlur: confirmPasswordBlurHandler,
                        }}
                    />
                    <Button disabled={!formIsValid} width="520px" marginTop="16px"
                            type={"submit"}>Sign Up</Button>
                    {signUpError && <div className={classes.signUpError}>{signUpError}</div>}
                </form>
                <div className={classes.belowDiv}>Already have an account?
                    <span className={classes.sign}
                          onClick={() => navigate(`/`)}>Sign In</span>
                </div>
            </div>
            <div className={"right"}>
                <img src={MainImg} alt=""/>
            </div>
        </div>

    )
}


export default Registration;