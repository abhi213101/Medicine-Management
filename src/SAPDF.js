import React, { Component } from 'react';
import './App.css';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('SAPDFResult', (event, result) => {
    if(result) {
        alert("Medicine entered successfully! Current balance is " + result[1]);
    }

    else{
        alert("ERROR!!");
    }
});

class SAPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: ""
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
        ipcRenderer.send('SAPDF', this.state);


        this.setState({
            date: ""
        });
    }

    render() {
        return (
            <div className="App">
                <div style={{color:'white', fontSize: 20, marginLeft:80, marginBottom:40, marginTop:13}}>
                    <b><u>STORE ACCOUNT PDF</u></b>
                </div>

                <div className="labelClass">
                    <label htmlFor="name">PDF Name</label>
                </div>
                <input 
                    type="text" 
                    className="inputText" 
                    placeholder="  PDF Name" 
                    id="name" 
                    name="name" 
                    onChange={this.handleChange}
                    value={this.state.quantity}
                /> 

                <div className="labelClass">
                    <label htmlFor="useDate">Date</label>
                </div>
                <input 
                    type="date" 
                    className="inputText" 
                    placeholder="  Date" 
                    id="date" 
                    name="date" 
                    onChange={this.handleChange}
                    value={this.state.useDate}
                />

                <div style={{marginTop: 40, marginLeft: 90}}>
                    <button className="PrimaryButton" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>

            </div>
        );
    }
}

export default SAPDF;