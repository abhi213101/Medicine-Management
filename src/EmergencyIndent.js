import React, { Component } from 'react';

import IndentComponent from './IndentComponent';
import './EI.css';
const { ipcRenderer } = window.require("electron");


class EmergencyIndent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : []
        }
    }

    componentDidMount() {
        ipcRenderer.send('EI', []);

        ipcRenderer.on('EIData', (event , data) => {
            this.setState({
                data: data
            });
        }) ;
    }

    render() {
        let meds = this.state.data.map(d => <IndentComponent data={d} indent="emergency"/>);
        return (
            <div>
                <div style={{color:'white', fontSize: 20, textAlign:"center", marginBottom:13, marginTop:13}}>
                    <b><u>EMERGENCY INDENT RECEIVE</u></b>
                </div>
                <div className="IndentEntry1">
                    <div className="name1"><b>Name</b></div>
                    <div className="buffer1"><b>Buffer Stock</b></div>
                    <div className="current1"><b>Current Balance</b></div>
                    <div className="current1"><b>Close Expiry Date</b></div>
                    <div className="buffer1"><b>Requirement</b></div>
                    <div className="buffer1"><b>Submit</b></div>
                </div>
                {meds}
            </div>
        );
    }
}

export default EmergencyIndent;