import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state ={
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleForgot = this.handleForgot.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(evt) {
        this.setState({
            [evt.target.name] : evt.target.value
        })      
    }

    handleSubmit(evt) {
        evt.preventDefault();
        ipcRenderer.send('loginData', this.state);

        ipcRenderer.on('loginResult', (event, result) => {

            if(result) {
                this.props.changeLogged();
            }

            else{
                window.alert("Incorrect Details!");
                this.setState({
                    username: "",
                    password: ""
                });
            }

        });

    }

    handleSignUp(evt) {
        evt.preventDefault();
        this.props.changeSignUp();
    }

    handleForgot(evt) {
        evt.preventDefault();
        this.props.changeForgot();
    }

    render() {
        return (
            <div className="App">

                <div style={{color:'white', fontSize: 20, marginLeft:80, marginBottom:40, marginTop:13}}>
                    <b><u>WELCOME TO ESIS!</u></b>
                </div>

                <Form>

                    <div className="labelClass">
                        <label htmlFor="username">Username</label>
                    </div>
                        <input 
                            type="text" 
                            className="inputText" 
                            placeholder="  Username" 
                            id="username" 
                            name="username" 
                            onChange={this.handleChange}
                            value={this.state.username}
                        />

                    <div className="labelClass">
                        <label htmlFor="password">Password</label>
                    </div>
                        <input 
                            type="password" 
                            className="inputText" 
                            placeholder="  Password" 
                            id="password" 
                            name="password" 
                            onChange={this.handleChange}
                            value={this.state.password}
                        />

                    <div>
                        <button className="PrimaryButton" onClick={this.handleSubmit} >
                            Submit
                        </button>
                    </div>

                    <div className="SignUpDiv labelClass">
                        <label htmlFor="signup">New Here?</label>
                    </div>
                    <div>
                        <button className="SecondaryButton" onClick={this.handleSignUp}>
                            Sign Up
                        </button>
                    </div>

                    <div className="SignUpDiv">
                        <button className="DangerButton" onClick={this.handleForgot}>
                            Forgot Password?
                        </button>
                    </div>

                </Form>

            </div>
        );
    }
}

export default LoginPage;