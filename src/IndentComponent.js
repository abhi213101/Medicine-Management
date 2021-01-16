import React, { Component } from 'react';
import './IC.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('closeExpData', (event, data)=> {
    if(data[0]) {
        if(data[1] !== "None"){
            let date = data[1][8]+data[1][9]+"-"+data[1][5]+data[1][6]+"-"+data[1][0]+data[1][1]+data[1][2]+data[1][3];
            alert("Closest Expiry date is : " + date);
        }
        else{
            alert("No medicines available");
        }
    }
    else{
        alert("Error!");
    }
});


ipcRenderer.on('indentResult', (event, result) => {
    if(result) {
        alert("Medicine requirement added successfully!");
    }
    else {
        alert("Error!");
    }
});

class IndentComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={
            requirement: ""
        };

        this.showExp = this.showExp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showExp(evt) {
        ipcRenderer.send('closeExp', this.props.data.ID);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        if(this.state.requirement === "") {
            alert("Enter the requirement!");
        }

        else {
            ipcRenderer.send('Indent', [this.props.data.name, this.state.requirement, this.props.indent]);
        }
    }
   
    render() {
        return (
            <div className="IndentEntry">
                <div className="name">{this.props.data.name}</div>
                <div className="buffer">{this.props.data.bufferStock}</div>
                <div className="current">{this.props.data.currentBalance}</div>
                <div className="expDate" onClick={this.showExp}><b>Show</b></div>
                <input type="text" name="requirement" className="text" placeholder="  Requirement" value={this.state.requirement} onChange={this.handleChange}/>
                <div className="submit" onClick={this.handleSubmit}><b>Submit</b></div>
            </div>
        );
    }
}

export default IndentComponent;