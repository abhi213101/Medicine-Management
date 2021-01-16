import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            que: "",
            ans: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        ipcRenderer.send('SQAnswer', this.state.ans);
        ipcRenderer.on('SQAnswerData', (event, result) => {
            console.log(result);
            if(result[0]) {
                alert("Your password is : " + result[1] );
                this.props.changeLogin();
            }
            else{
                alert("Incorrect Details");
            }
        })
    }
    
    componentDidMount() {
        ipcRenderer.send('SQ', " ");

        ipcRenderer.on('SQData', (event, que) => {
            this.setState({
                que: que
            });
        });
    }

    render() {
        return (
            <div className="App">

                <div style={{color:'white', fontSize: 20, marginLeft:80, marginBottom:40, marginTop:13}}>
                    <b><u>FORGOT PASSWORD?</u></b>
                </div>

                <Form>

                    <div className="labelClass">
                        <label htmlFor="que">Question:</label>
                    </div>
                    <div className="labelClass">
                        <label htmlFor="que">{this.state.que}</label>
                    </div>

                    <div className="labelClass">
                        <label htmlFor="ans">Password</label>
                    </div>
                        <input type="ans" className="inputText" placeholder="  Answer" id="ans" name="ans" onChange={this.handleChange}/>

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

export default ForgotPassword;