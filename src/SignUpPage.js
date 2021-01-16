import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
const { ipcRenderer } = window.require("electron");

class SignUpPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            sq: "",
            answer: "",
            disp: "",
            result:"nothing"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }

    

    handleSubmit(evt) {
        evt.preventDefault();
        ipcRenderer.send('SignUp', this.state);
        this.setState({
            username: "",
            password: "",
            sq: "",
            answer: "",
            disp: "",
        });

        ipcRenderer.on('SignUpResult', (event, result) => {

            if(result) {
                window.alert("Registered Successfully! You can login now!");
                this.props.changeLogin();
            }

            else{
                window.alert("Incorrect Details!");
            }

        });

        
    }

    render() {
        return (
            <div className="App">
                <div style={{color:'white', fontSize: 20, marginLeft:80, marginBottom:40, marginTop:13}}>
                    <b><u>CREATE NEW ACCOUNT</u></b>
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

                    <div className="labelClass">
                        <label htmlFor="question">Security Question</label>
                    </div>
                        <input 
                            type="text" 
                            className="inputText" 
                            placeholder="  e.g What is your pet?" 
                            id="password" 
                            name="sq" 
                            onChange={this.handleChange}
                            value={this.state.sq}
                        />

                    <div className="labelClass">
                        <label htmlFor="answer">Answer</label>
                    </div>
                        <input 
                            type="text"     
                            className="inputText" 
                            placeholder="  e.g Dog" 
                            id="answer" 
                            name="answer" 
                            onChange={this.handleChange}
                            value={this.state.answer}
                        />

                    <div className="labelClass">
                        <label htmlFor="dispensary">Dispensary</label>
                    </div>
                        <input 
                            type="text" 
                            className="inputText" 
                            placeholder="  Dispensary" 
                            id="disp" 
                            name="disp" 
                            onChange={this.handleChange}
                            value={this.state.disp}
                        />

                    <div>
                        <button className="PrimaryButton" onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>

                </Form>

            </div>
        );
    }
}

export default SignUpPage;