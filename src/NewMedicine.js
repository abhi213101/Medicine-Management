import React, { Component } from 'react';
import './App.css';
import './LoginPage.css';
import './NewMedicine.css';
const { ipcRenderer } = window.require("electron");



ipcRenderer.on('nameInsertionResult', (event, result) => {
    if(result) {
        alert("Medicine entered successfully enter opening balance now!");
    }

    else {
        alert("Incorrect details");
    }

});


class NewMedicine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schNo: "OS",
            type: "Tab.",
            moleculeName1: "",
            moleculeName2: "",
            moleculeName3: "",
            moleculeName4: "",
            moleculeName5: "",
            power1: "",
            power2: "",
            power3: "",
            power4: "",
            power5: "",
            lastYearConsumption: "",
            OBValue: ""
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
        let name = this.state.moleculeName1;

        if(this.state.power1 !== ""){
            name = name + " " + this.state.power1;
        }

        if(this.state.moleculeName2 !== "") {
            name = name + " + " + this.state.moleculeName2;
        }

        if(this.state.power2 !== "") {
            name = name + " " + this.state.power2;
        }
        
        if(this.state.moleculeName3 !== "") {
            name = name + " + " + this.state.moleculeName3;
        }

        if(this.state.power3 !== "") {
            name = name + " " + this.state.power3;
        }

        if(this.state.moleculeName4 !== "") {
            name = name + " + " + this.state.moleculeName4;
        }

        if(this.state.power4 !== "") {
            name = name + " " + this.state.power4;
        }

        if(this.state.moleculeName5 !== "") {
            name = name + " + " + this.state.moleculeName5;
        }

        if(this.state.power5 !== "") {
            name = name + " " + this.state.power5;
        }

        ipcRenderer.send('nameInsertion', [name, this.state]);

        
        this.setState({
            schNo: "OS",
            type: "Tab.",
            moleculeName1: "",
            moleculeName2: "",
            moleculeName3: "",
            moleculeName4: "",
            moleculeName5: "",
            power1: "",
            power2: "",
            power3: "",
            power4: "",
            power5: "",
            lastYearConsumption: "",
            OBValue: ""
        });
    }


    render() {
        return (
            <div className="App">
                <div style={{color:'white', textAlign:"center", marginLeft:80, marginBottom:40, marginTop:13, fontSize:20}}>
                    <b><u>ENTER NEW MEDICINE</u></b>
                </div>
                <form>

                    <div className="container">
                        <div className="miniContainer">
                            <div className="labelClass">
                                <label htmlFor="schNo">Schedule No.</label>
                            </div>
                            <input className="inputText1" type="text" name="schNo" value={this.state.schNo} id="schNo" placeholder="  Schedule No / OS" onChange={this.handleChange} required defaultValue="OS"/>
                        </div>

                        <div className="miniContainer">
                            <div className="labelClass">
                                <label htmlFor="type">Type Of Medicine</label>
                            </div>
                            <select className="inputText" name="type" value={this.state.type} id="type" onChange={this.handleChange}>
                                <option>Tab.</option>
                                <option>Cap.</option>
                                <option>Drops</option>
                                <option>Film</option>
                                <option>Infusion</option>
                                <option>Inh.</option>
                                <option>Inj.</option>
                                <option>Jelly</option>
                                <option>Liq.</option>
                                <option>Lotion</option>
                                <option>M.W.</option>
                                <option>Oint.</option>
                                <option>Paint</option>
                                <option>Powder</option>
                                <option>Resp.</option>
                                <option>Roto.</option>
                                <option>Sachet</option>
                                <option>Scrub</option>
                                <option>Spray</option>
                                <option>Syp.</option>
                                <option>Syringe</option>
                                <option>Than</option>
                            </select>
                        </div>
                    </div>

                    <div className="container">
                        <div className="miniContainer">
                            <div className="labelClass">
                                <label htmlFor="moleculeName">Molecule Name</label>
                            </div>
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="moleculeName1" 
                                value={this.state.moleculeName1} 
                                id="moleculeName" 
                                placeholder="  Molecule Name" 
                                onChange={this.handleChange} 
                            />
                        </div>

                        <div className="miniContainer">
                            <div className="labelClass">
                                <label htmlFor="power">Power</label>
                            </div>
                            <input 
                                className="inputText1"
                                type="text" 
                                name="power1" 
                                id="power" 
                                value={this.state.power1} 
                                placeholder="  e.g 500 mg" 
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="moleculeName2" 
                                id="moleculeName" 
                                placeholder="  Molecule Name" 
                                onChange={this.handleChange} 
                                value={this.state.moleculeName2}
                            />
                        </div>

                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="power2" 
                                id="power" 
                                placeholder="  e.g 500 mg" 
                                onChange={this.handleChange} 
                                value={this.state.power2}
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="moleculeName3" 
                                id="moleculeName" 
                                placeholder="  Molecule Name" 
                                onChange={this.handleChange} 
                                value={this.state.moleculeName3}
                            />
                        </div>

                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="power3" 
                                id="power" 
                                placeholder="  e.g 500 mg" 
                                onChange={this.handleChange} 
                                value={this.state.power3}
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="moleculeName4" 
                                id="moleculeName" 
                                placeholder="  Molecule Name" 
                                onChange={this.handleChange} 
                                value={this.state.moleculeName4}
                            />
                        </div>

                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="power4" 
                                id="power" 
                                placeholder="  e.g 500 mg" 
                                onChange={this.handleChange} 
                                value={this.state.power4}
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="moleculeName5" 
                                id="moleculeName" 
                                placeholder="  Molecule Name" 
                                onChange={this.handleChange} 
                                value={this.state.moleculeName5}
                            />
                        </div>

                        <div className="miniContainer">
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="power5" 
                                id="power" 
                                placeholder="  e.g 500 mg" 
                                onChange={this.handleChange} 
                                value={this.state.power5}
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="miniContainer">
                            <div className="labelClass">
                                <label htmlFor="lastYearConsumption">Last Year Consumption</label>
                            </div>
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="lastYearConsumption" 
                                id="lastYearConsumption" 
                                placeholder="  Last Year Consumption" 
                                onChange={this.handleChange} 
                                value={this.state.lastYearConsumption}
                            />
                        </div>

                        <div className="miniContainer">
                            <div className="labelClass">
                                <label htmlFor="OBValue">Opening Balance Value</label>
                            </div>
                            <input 
                                className="inputText1" 
                                type="text" 
                                name="OBValue" 
                                id="OBValue" 
                                placeholder="  e.g 100" 
                                onChange={this.handleChange} 
                                value={this.state.OBValue}
                            />
                        </div>
                    </div>

                    <div className="BUTTON">
                        <input type="submit" className="PrimaryButton" onClick={this.handleSubmit}/>
                    </div>

                </form>
            </div>
        );
    }
}

export default NewMedicine;