import React, { Component } from 'react';
import { useEffect, useState } from "react";
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

const Header = (props) => {

const [loggedIn , setLoggedIn ]    = useState(true);
const [showBookShowButton , setShowBookShowButton ] = useState(false);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [value,setValue] = useState(0);
const [username, setUserName] = useState("");
const [usernameRequired, setUsernameRequired] = useState("dispNone");
const [loginPassword, setLoginPassword] = useState("");
const [loginPasswordRequired, setLoginPasswordRequired] = useState("dispNone");
const [firstname, setFirstname] = useState("");
const [firstnameRequired, setFirstnameRequired] = useState("dispNone");
const [lastname, setLastname] = useState("");
const [lastnameRequired, setLastnameRequired] = useState("dispNone");
const [email, setEmail] = useState("");
const [emailRequired, setEmailRequired] = useState("dispNone");
const [registerPassword, setRegisterPassword] = useState("");
const [registerPasswordRequired, setRegisterPasswordRequired] = useState("dispNone");
const [contact, setContact] = useState("");
const [contactRequired, setContactRequired] = useState("dispNone");
const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const checkLoggedIn = () => {
        let accessToken;
        accessToken = sessionStorage.getItem("access-token");
        if ( accessToken == null ){
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }        
    }

    const   openModalHandler = () => {
        setModalIsOpen(true);
    }

    const closeModalHandler = () => {
        setModalIsOpen(false);
    }

    const tabChangeHandler = (event, value) => {
        setValue(value);
    }

    async function login(username, password) {
        const param = window.btoa(`${email.value}:${password.value}`);
        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            });
    
            const result = await rawResponse.json();
            if(rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                setLoggedIn(true);
                closeModalHandler();
            } else {
                const error = new Error();
                error.message = result.message || 'Unable to Login.';
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }

    const loginClickHandler = () => {
        
        username === "" ?  setUsernameRequired("dispBlock") : setUsernameRequired("dispNone" );
        loginPassword === "" ? setLoginPasswordRequired("dispBlock") : setLoginPasswordRequired("dispNone");

        login(username, loginPassword);


    }
    const inputUsernameChangeHandler = (e) => {
        setUserName(e.target.value);
    }

    const inputLoginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    }

    const registerClickHandler = () => {
        firstname           === "" ? setFirstnameRequired("dispBlock") : setFirstnameRequired("dispNone");
        lastname            === "" ? setLastnameRequired("dispBlock") : setLastnameRequired("dispNone");
        email               === "" ? setEmailRequired("dispBlock" ) : setEmailRequired("dispNone");
        registerPassword    === "" ? setRegisterPassword("dispBlock") : setRegisterPassword("dispNone");
        contact             === "" ? setContactRequired("dispBlock") : setContactRequired("dispNone");

        let dataSignup = JSON.stringify({
            "email_address": email,
            "first_name": firstname,
            "last_name": lastname,
            "mobile_number": contact,
            "password": registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {                
                    setRegistrationSuccess(true);                
            }
        });

        xhrSignup.open("POST", "http://localhost:8085/api/v1/" + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    const inputFirstNameChangeHandler = (e) => {
        setFirstname(e.target.value );
    }

    const inputLastNameChangeHandler = (e) => {
        setLastname( e.target.value );
    }

    const inputEmailChangeHandler = (e) => {
        setEmail(e.target.value );
    }

    const inputRegisterPasswordChangeHandler = (e) => {
        setRegisterPasswordRequired(e.target.value );
    }

    const inputContactChangeHandler = (e) => {
        setContact( e.target.value );
    }

    const logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        setLoggedIn(false);
    }
    
    return (
        <div>
            <header className="app-header">
                <img src={logo} className="app-logo" alt="Movies App Logo" />
                {loggedIn ?
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={openModalHandler}>
                            Login
                        </Button>
                    </div>
                    :
                    <div className="logout-button">
                        <Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }
                {showBookShowButton === "true" && !loggedIn
                    ? <div className="bookshow-button">
                        <Button variant="contained" color="primary" onClick={openModalHandler}>
                            Book Show
                        </Button>
                    </div>
                    : ""
                }

                {showBookShowButton === "true" && loggedIn
                    ? <div className="bookshow-button">
                        <Link to={"/bookshow/" + this.props.id}>
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link>
                    </div>
                    : ""
                }

            </header>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                contentLabel="Login"
                onRequestClose={closeModalHandler}
                style={customStyles}
            >
                <Tabs className="tabs" value={value} onChange={tabChangeHandler}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={username} onChange={inputUsernameChangeHandler} />
                            <FormHelperText className={usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={loginPassword} onChange={inputLoginPasswordChangeHandler} />
                            <FormHelperText className={loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {loggedIn === true &&
                            <FormControl>
                                <span className="successText">
                                    Login Successful!
                                </span>
                            </FormControl>
                        }
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                }

                {value === 1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={firstname} onChange={inputFirstNameChangeHandler} />
                            <FormHelperText className={firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={lastname} onChange={inputLastNameChangeHandler} />
                            <FormHelperText className={lastnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={email} onChange={inputEmailChangeHandler} />
                            <FormHelperText className={emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={registerPassword} onChange={inputRegisterPasswordChangeHandler} />
                            <FormHelperText className={registerPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={contact} onChange={inputContactChangeHandler} />
                            <FormHelperText className={contactRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {registrationSuccess === true &&
                            <FormControl>
                                <span className="successText">
                                    Registration Successful. Please Login!
                                  </span>
                            </FormControl>
                        }
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={registerClickHandler}>REGISTER</Button>
                    </TabContainer>
                }
            </Modal>
        </div>
    )

};

export default Header;