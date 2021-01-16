import React, { Component } from 'react';
import './App.css';
import Autocomplete from  './Autocomplete';
import './LoginPage.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('TCResult', (event, result) => {
    if(result) {
        alert("PDF generated successfully on Desktop!");
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
            pdf: ""
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
        ipcRenderer.send('TC', this.state);


        this.setState({
            price: ""
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
                <div style={{color:'white', fontSize: 20, marginLeft:40, marginBottom:40, marginTop:13}}>
                    <b><u>TOTAL CINSUMPED STOCK PDF</u></b>
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
                    <label htmlFor="useDate">PDF Name</label>
                </div>
                <input 
                    type="text" 
                    className="inputText" 
                    placeholder="  PDF Name" 
                    id="pdf" 
                    name="pdf" 
                    onChange={this.handleChange}
                    value={this.state.pdf}
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

export default TC;