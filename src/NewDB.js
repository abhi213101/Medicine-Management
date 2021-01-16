import React, { Component } from 'react';
import './App.css';
import Autocomplete from  './Autocomplete';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('NDBResult', (event, result) => {
    if(result) {
        alert("Price entered successfully!");
    }

    else{
        alert("ERROR!!");
    }
});

class StoreAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        ipcRenderer.send('NDB', this.state);


        this.setState({
            year: ""
        });
    }

    render() {
        return (
            <div className="App">

                <div style={{color:'white', fontSize: 20, marginLeft:50, marginBottom:40, marginTop:13}}>
                    <b><u>CREATE NEXT YEAR DATABASE</u></b>
                </div>

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
                    value={this.state.date}
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

export default StoreAccount;