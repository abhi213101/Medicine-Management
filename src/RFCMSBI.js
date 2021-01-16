import React, { Component } from 'react';

import RFCMSComponent from './RFCMSComponent';
import './EI.css';
const { ipcRenderer } = window.require("electron");


class RFCMSBI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : []
        }
    }

    componentDidMount() {
        ipcRenderer.send('RFCMSList', "schedule");

        ipcRenderer.on('RFCMSData', (event , data) => {
            this.setState({
                data: data
            });
        }) ;
    }

    render() {
        let meds = this.state.data.map(d => <RFCMSComponent data={d} indent="schedule"/>);        
        return (
            <div>
                <div style={{color:'white', fontSize: 20, textAlign:"center", marginBottom:40, marginTop:13}}>
                    <b><u>RECEIVE FROM CMS(BI-MONTHLY)</u></b>
                </div>
                <div className="IndentEntry1">
                    <div className="name1"><b>Name</b></div>
                    <div className="buffer1"><b>Batch No.</b></div>
                    <div className="current1"><b>Expiry Date</b></div>
                    <div className="current1"><b>Receive Date</b></div>
                    <div className="buffer1"><b>Quantity</b></div>
                    <div className="buffer1"><b>Submit</b></div>
                </div>
                {meds}
            </div>
        );
    }
}

export default RFCMSBI;