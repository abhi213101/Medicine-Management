import React, { Component } from 'react';
import Autocomplete from  './Autocomplete';
import './App.css';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('consumptionResult', (event, result) => {
    if(result) {
        alert("Medicine entered successfully! Current balance is " + result[1]);
    }

    else{
        alert("ERROR!!");
    }
});

class Consumption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            name: "",
            useDate: "",
            quantity: ""
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
            name: userInput
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        ipcRenderer.send('consumption', this.state);


        this.setState({
            useDate: "",
            quantity: ""
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
                    <b><u>CONSUMPTION ENTRY</u></b>
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

                <div style={{marginTop: 13}} className="labelClass">
                    <label htmlFor="useDate">Use Date</label>
                </div>
                <input 
                    type="date" 
                    className="inputText" 
                    placeholder="  Use Date" 
                    id="useDate" 
                    name="useDate" 
                    onChange={this.handleChange}
                    value={this.state.useDate}
                />

                <div className="labelClass">
                    <label htmlFor="quantity">Quantity</label>
                </div>
                <input 
                    type="text" 
                    className="inputText" 
                    placeholder="  Quantity" 
                    id="quantity" 
                    name="quantity" 
                    onChange={this.handleChange}
                    value={this.state.quantity}
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

export default Consumption;