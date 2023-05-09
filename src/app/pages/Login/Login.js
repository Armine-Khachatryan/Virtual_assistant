import React, {useState, useEffect} from "react";
import Input from "../../UI/Input/Input";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";
import EyeImage from "../../assets/images/EyeImage.png";
import ClosedEye from "../../assets/images/ClosedEye.png";
import Button from "../../UI/Button/Button";
import axios from "axios";
import config from "../../config";
import {useDispatch} from "react-redux";
import {setUserData} from "../../features/User/UserSlice";
import {useNavigate} from "react-router-dom";
import MainImg from "../../assets/images/MainImg.png";
import useValidation from "../../hooks/useValidation";
import useInput from "../../hooks/useInput";
import classes from './Login.module.css';
import NewPasswordModal from "../../components/NewPasswordModal/NewPasswordModal";


function Login(props) {

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {isEmail, isPassword} = useValidation();
    const [signInError, setSignInError] = useState(null);
    const [resetPasswordModalIsOpen, setResetPasswordModalIsOpen] = useState(false);
    const [newPasswordModalIsOpen, setNewPasswordModalIsOpen] = useState(false);

    function openResetPasswordModal() {
        setResetPasswordModalIsOpen(true)
    }

    function closeResetPasswordModal() {
        setResetPasswordModalIsOpen(false)
    }


    function openNewPasswordModal() {
        setNewPasswordModalIsOpen(true)
    }

    function closeNewPasswordModal() {
        setNewPasswordModalIsOpen(false)
    }

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


    useEffect(() => {
        if (emailIsTouched
            || passwordIsTouched) {
            setSignInError("")
        }
    }, [emailIsTouched, passwordIsTouched]);


    let emailMessage = null;
    if (!email) {
        emailMessage = "Email is required";
    } else if (!emailIsValid) {
        emailMessage = "Invalid email";
    }

    let formIsValid = false;
    if (emailIsValid
        && passwordIsValid) {
        formIsValid = true;
    }

    const body = {
        // username: email,
        email,
        password,
    }


    let postLogin = async (body) => {
        let formData = new FormData();
        formData = {
            email: body.email,
            password: body.password,
        }
        console.log(body, "body");
        try {
            let response = await axios.post(`${config.baseUrl}api/login`, formData);
            console.log(response.data, "response login");
            if(response.data.data.token){
                sessionStorage.setItem('token', response.data.data.token);
                console.log("hiiiiiiiiiiiiii")
                props.setAccessToken(sessionStorage.getItem('token'));
                localStorage.removeItem('email');
                dispatch(setUserData(response.data.user));
                navigate(`../my-profile/dashboard`)
            }
    } catch (error) {
        console.log(error, "error message")
            setSignInError("Something went wrong");
    }
}
            //
    //         if(checkedOne){
    //             localStorage.setItem('token', response.data.token);
    //             props.setAccessToken(localStorage.getItem('token'));
    //             dispatch(setUserData(response.data))
    //         }
    //         if(response.data.token){
    //             await closeAndResetLoginModal();
    //         }

    const submitHandler =  event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        postLogin(body);
        resetEmail();
        resetPassword();
        showPassFalse();
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
                        error={signInError}
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
                        error={signInError}
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
                    <div className={classes.forgot} onClick={openResetPasswordModal}>Forgot password?</div>
                    <ResetPasswordModal resetPasswordModalIsOpen={resetPasswordModalIsOpen}
                                        closeResetPasswordModal={closeResetPasswordModal}
                                        newPasswordModalIsOpen={newPasswordModalIsOpen}
                                        openNewPasswordModal={openNewPasswordModal}
                                        closeNewPasswordModal={closeNewPasswordModal}
                    />
                    <NewPasswordModal closeNewPasswordModal={closeNewPasswordModal}
                                         newPasswordModalIsOpen={newPasswordModalIsOpen}/>
                    <Button disabled={!formIsValid} width="520px"
                            marginTop="48px"
                            type={"submit"}>Sign In</Button>
                    {signInError && <div className={classes.signInError}>{signInError}</div>}
                </form>
                <div className={classes.belowDivLogin}>Don’t have an account?
                    <span className={classes.signUpNow}
                          onClick={() => navigate(`/register`)}>Sing Up Now</span>
                </div>
            </div>
            <div className={"right"}>
                <img src={MainImg} alt=""/>
            </div>
        </div>
    )
}

export default Login;