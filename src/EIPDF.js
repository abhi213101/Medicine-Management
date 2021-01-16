import React, { Component } from 'react';
import './App.css';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('EIPDFResult', (event, result) => {
    if(result) {
        alert("PDF generated successfully on Desktop!");
    }

    else{
        alert("ERROR!!");
    }
});

class EIPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            indent: ""
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
        ipcRenderer.send('EIPDF', this.state);


        this.setState({
            date: "",
            name: "",
            indent: ""
        });
    }

    render() {
        return (
            <div className="App">

                <div style={{color:'white', fontSize: 20, marginLeft:80, marginBottom:40, marginTop:13}}>
                    <b><u>EMERGENCY INDENT PDF</u></b>
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
                    <label htmlFor="indent">Indent No.:</label>
                </div>
                <input 
                    type="text" 
                    className="inputText" 
                    placeholder="  Indent No." 
                    id="indent" 
                    name="indent" 
                    onChange={this.handleChange}
                    value={this.state.indent}
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

export default EIPDF;