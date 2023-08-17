import React, {useState, useEffect} from "react";
import classes from './LoginFacebook.module.css';
import useInput from "../../hooks/useInput";
import useValidation from "../../hooks/useValidation";
import Input from "../../UI/Input/Input";
import EyeImage from "../../assets/images/EyeImage.png";
import ClosedEye from "../../assets/images/ClosedEye.png";
import Button from "../../UI/Button/Button";
import MainImg from "../../assets/images/MainImg.png";



function LoginFacebook(){
    const {isNotEmpty, isPassword} = useValidation();

    const {
        value: username,
        isValid:usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername,
        isTouched: usernameIsTouched
    } = useInput(isNotEmpty);


    console.log(username, "username")

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


    let formIsValid = false;
    if (usernameIsValid
        && passwordIsValid) {
        formIsValid = true;
    }

    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
      console.log("success")
    };


    return(
        <div className="whole">
            <div className="left">
                <div className="welcome">Welcome to </div>
                <div className="virt">Virt Assistant</div>
                <div className='sign'>Sign In</div>
                <form onSubmit={submitHandler}>
                    <Input
                        label='Email'
                        // error={signInError}
                        hasError={usernameHasError}
                        // errorText={emailMessage}
                        width='520px'
                        input={{
                            value: username,
                            placeholder: "Type your username",
                            type: "Username",
                            onChange: usernameChangeHandler,
                            onBlur:usernameBlurHandler
                        }}
                    />
                    <Input
                        label='Password'
                        // error={signInError}
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
                    <Button disabled={!formIsValid} width="520px"
                            marginTop="48px"
                            type={"submit"}>Sign</Button>
                </form>
            </div>
            <div className={"right"}>
                <img src={MainImg} alt=""/>
            </div>
        </div>
    )
}


export default LoginFacebook;