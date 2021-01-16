import React, { Component } from 'react';
import './RFCMSC.css';
const { ipcRenderer } = window.require("electron");

ipcRenderer.on('RFCMSResult', (event, result) => {
    if(result) {
        alert("Medicine entered successfully! Current balance is " + result[1]);
    }

    else{
        alert("ERROR!!");
    }
});

class IndentComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={
            quantity: "",
            batch: "",
            expDate: "",
            date: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        ipcRenderer.send("RFCMS", [this.state, this.props]);
    }
   
    render() {
        return (
            <div className="IndentEntry2">
                <div className="name2">{this.props.data.name}</div>
                <input type="text" name="batch" className="buffer2" placeholder="  Batch No." value={this.state.batch} onChange={this.handleChange}/>
                <input type="date" name="expDate" className="expDate2" placeholder="  Expiry Date" value={this.state.expDate} onChange={this.handleChange}/>
                <input type="date" name="date" className="expDate2" placeholder="  Receive Date" value={this.state.date} onChange={this.handleChange}/>
                <input type="text" name="quantity" className="text2" placeholder="  Quantity" value={this.state.quantity} onChange={this.handleChange}/>
                <div className="submit2" onClick={this.handleSubmit}><b>Submit</b></div>
            </div>
        );
    }
}

export default IndentComponent;