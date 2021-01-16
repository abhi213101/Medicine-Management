import React, { Component } from 'react';

import IndentComponent from './IndentComponent';
import './EI.css';
const { ipcRenderer } = window.require("electron");


class BiMonthlyIndent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : []
        }
    }

    componentDidMount() {
        ipcRenderer.send('BI', []);

        ipcRenderer.on('BIData', (event , data) => {
            this.setState({
                data: data
            });
        }) ;
    }

    render() {
        let meds = this.state.data.map(d => <IndentComponent data={d} indent="schedule"/>);
        return (
            <div>
                <div style={{color:'white', fontSize: 20, textAlign:"center", marginBottom:13, marginTop:13}}>
                    <b><u>BI-MONTHLY INDENT RECEIVE</u></b>
                </div>
                <div className="IndentEntry1">
                    <div className="name1"><b><u>Name</u></b></div>
                    <div className="buffer1"><b><u>Buffer Stock</u></b></div>
                    <div className="current1"><b><u>Current Balance</u></b></div>
                    <div className="current1"><b><u>Close Expiry Date</u></b></div>
                    <div className="buffer1"><b><u>Requirement</u></b></div>
                    <div className="buffer1"><b><u>Submit</u></b></div>
                </div>
                {meds}
            </div>
        );
    }
}

export default BiMonthlyIndent;