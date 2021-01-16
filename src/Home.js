import React, { Component } from 'react';
import './App.css';
import Autocomplete from  './Autocomplete';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('currentBalanceResult', (event, result) => {
    if(result) {
        alert("Current balance is " + result);
    }

    else{
        alert("ERROR!!");
    }
});


class TC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            balance: "NULL"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

    }

    handleChange(evt) {
        this.setState({
            [evt.target.name] : evt.target.value
        });     
    }

    handleChange2(userInput) {
        this.setState({
            name: userInput,
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        ipcRenderer.send('currentBalance', this.state);


        this.setState({
            price: "",
        });
    }

    componentDidMount() {
        ipcRenderer.send('suggestions', "");

        ipcRenderer.on('suggestionsData', (event, data) => {
            this.setState({
                suggestions: data             
            });
        });
    }

    render() {
        return (
            <div className="App">

                <div style={{color:'white', fontSize: 20, marginLeft:80, marginBottom:40, marginTop:13}}>
                    <b><u>CHECK CURRENT BALANCE</u></b>
                </div>

                <div className="labelClass">
                    <label htmlFor="name">Medicine Name</label>
                </div>
                <Autocomplete 
                    suggestions={this.state.suggestions}
                    onChange={this.handleChange}
                    onChange2={this.handleChange2}
                    name="name"
                    id="name"
                    value={this.state.name}
                />

                <div style={{marginTop: 40, marginLeft: 90}}>
                    <button className="PrimaryButton" onClick={this.handleSubmit}>
                        Check Balance
                    </button>
                </div>

            </div>
        );
    }
}

export default TC;