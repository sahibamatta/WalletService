import React from 'react';
import "../../../html/assets/css/global.css";
import { SidebarClass } from "../../commons/sidebar"

import PropTypes from 'prop-types';
const urlForCurrencyConversion = "http://localhost:8080/WalletService/wallet/currency";
const urlForWalletAddresses = "http://localhost:8080/WalletService/wallet/address";
const urlForTnc = "http://localhost:8080/WalletService/wallet/tnc";
const urlForTransferAmount = "http://localhost:8080/WalletService/wallet/transfer";
let v = "";

export class WalletForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pyg: "",
            pygDiv: "",
            eth: "",
            transferFrom: "0xdc4b6479060252156c6423ea7a0233bd98d1479b",
            transferTo: "--Select--",
            transferToDiv: "",
            isTnc: false,
            isTncDiv: "",
            createDiv: "",
            errorDiv: ""

        }
        this.handleChange = this.handleChange.bind(this);
        this.clearAllFields = this.clearAllFields.bind(this);
        this.convertCurrencies = this.convertCurrencies.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.onCheckboxSelected = this.onCheckboxSelected.bind(this);
        this.transferAmount = this.transferAmount.bind(this);
    }

    componentDidMount() {
        console.log("in componentdidmount")

        fetch(urlForWalletAddresses)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                return response.json();
            })
            .then(d => {
                console.log(d);
                this.setState({
                    walletAddresses: d.walletAddresses,
                    transferTo: "--Select--"
                })

            }), () => {
                this.setState({
                    requestFailed: true
                })
            },

            fetch(urlForTnc)
                .then(response => {
                    if (!response.ok) {
                        throw Error("Network request failed");
                    }
                    return response.json();
                })
                .then(d => {
                    console.log(d);
                    this.setState({
                        title: d.title,
                        body: d.body
                    })

                }), () => {
                    this.setState({
                        requestFailed: true
                    })
                }
    }


    clearAllFields() {

        this.setState({
            pyg: "",
            pygDiv: "",
            eth: "",
            transferTo: "--Select--",
            transferToDiv: "",
            isTnc: false,
            isTncDiv: "",
            errorDiv: ""
        })
    }

    isNotEmptyFieldCheck(event) {
        event.preventDefault();

        this.setState({
            pygDiv: "",
            transferToDiv: "",
            isTncDiv: ""
        })

        console.log("in notempty::" + this.state.pyg + "::tnc::" + this.state.isTnc)

        if (this.state.pyg == null || this.state.pyg == '') {
            this.setState({
                pygDiv: "Please enter amount in pyg"
            })
            return false;
        }

        if (this.state.transferTo == null || this.state.transferTo == '--Select--') {
            this.setState({
                transferToDiv: "Please select a transfer to wallet address"
            })
            return false;
        }
        if (this.state.isTnc == null || this.state.isTnc == false || this.state.isTnc == '') {
            this.setState({
                isTncDiv: "Please accept the terms and conditions"
            })
            return false;
        }
        return true;
    }

    handleChange(event) {
        console.log("in handlechange::" + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    convertCurrencies() {
        console.log("in convertCurrencies");

        if (this.state.pyg != '') {

            this.setState({
                createDiv: "",
                eth: ""
            })

            var data = {
                "currency1": this.state.pyg
            }

            console.log("data is::" + data + "::pyg is::" + this.state.pyg);

            var headers = {
                "Content-Type": "application/json"
            }

            fetch(urlForCurrencyConversion, {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
                ,
                body: JSON.stringify(data)

            })
               

                .then(responseDto => {
                    console.log("then responseDto::" + JSON.stringify(responseDto))

                    if (responseDto.status == 1) {
                        this.setState({
                            eth: responseDto.data.currency2,
                        })

                    }
                    else {
                        this.setState({
                            pygDiv: responseDto.message,
                            createDiv: ""
                        })
                    }

                })
        }
    }


    transferAmount() {
        console.log("in transferamount");

        var data = {
            "transferFrom": this.state.transferFrom,
            "amountPyg": this.state.pyg,
            "amountEth": this.state.eth,
            "transferTo": this.state.transferTo
        }
        console.log("data is::" + data.transferFrom);

        var headers = {
            "Content-Type": "application/json"
        }

        fetch(urlForTransferAmount, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            ,
            body: JSON.stringify(data)

        })
            .then(function (response) {
                var d = response.json()
                console.log("response is:" + d)
                return d;
            })

            .then(data => {
                console.log("then data::" + JSON.stringify(data))

                if (data.status == 1) {
                    this.setState({
                        createDiv: data.message
                    })
                    this.clearAllFields();
                }
                else {
                    this.setState({
                        errorDiv: data.message
                    })
                }

                console.log("this.state.createDiv is::" + this.state.createDiv);
                console.log("this.state.errorDiv is::" + this.state.errorDiv);

            })
    }

    onDropdownSelected(event) {
        var index = event.nativeEvent.target.selectedIndex;
        v = event.nativeEvent.target[index].text
        this.setState({
            [event.target.name]: v
        })
    }

    populateClientWalletAddresses() {

        const walletAddressItems = [];
        console.log('this.state.walletAddresses.length is:' + this.state.walletAddresses.length);
        for (let i = this.state.walletAddresses.length - 1; i >= 0; i--) {
            walletAddressItems.push(<option key={i} value={this.state.walletAddresses[i]}>
                {this.state.walletAddresses[i]}</option>);
        }
        return walletAddressItems;

    }

    onCheckboxSelected(event) {
        var checked = event.target.checked
        this.setState({
            [event.target.name]: checked
        })
    }


    render() {

        if (this.state.requestFailed) return (<p>Failed...</p>);
        if (!this.state.walletAddresses || !this.state.title || !this.state.body) return (<p>Loading...</p>);
        if (!this.state.transferTo) return (<p>Loading...</p>);

        return (

            <div className="content">
                <div className="container clearfix">
                    <SidebarClass />
                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title">Wallet</h1>

                            <form>

                                <div className="form-wrap">
                                    <label className="form-title">Transfer From(Wallet Address)</label>
                                    <input type="text" name="transferFrom" id="transferFromId" maxLength="100"
                                        disabled="true" value={this.state.transferFrom}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Enter Amount In PGY</label>
                                    <input type="number" name="pyg" id="pygId" maxLength="100"
                                        value={this.state.pyg} onChange={this.handleChange}
                                        onBlur={this.convertCurrencies} />
                                    <div className="error" id="pygDivId" data-value=
                                        {this.state.pygDiv}>{this.state.pygDiv}</div>
                                </div>


                                <div className="form-wrap">
                                    <label className="form-title">Converted Amount In ETH</label>
                                    <input type="number" name="eth" id="ethId" maxLength="100"
                                        disabled="true" value={this.state.eth}
                                        onChange={this.handleChange} />
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Transfer To (Wallet Address)</label>
                                    <select id="transferToId" name="transferTo"
                                        value={this.state.transferTo} onChange={this.onDropdownSelected}>
                                        <option>--Select--</option>
                                        {this.populateClientWalletAddresses()}
                                    </select>
                                    <div className="error" id="transferToDivId" data-value=
                                        {this.state.transferToDiv}>{this.state.transferToDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <div className="termsx">
                                        <p> <strong>
                                            <span className="styleTitle">
                                                {this.state.title}
                                            </span></strong></p>
                                        <br />

                                        <p><span className="styleBody">hey whatsup
                                                {this.state.body}
                                        </span>
                                        </p> </div></div>

                                <div className="form-wrap">
                                    <input name="isTnc" id="isTncId" type="checkbox"
                                        checked={this.state.isTnc}
                                        onChange={this.onCheckboxSelected} />
                                    <label className="form-title" >Agree with Terms And Conditions</label>
                                    <div className="error" id="isTncDivId" data-value=
                                        {this.state.isTncDiv}>{this.state.isTncDiv}</div>
                                </div>

                                <input type="submit" value="transfer" onClick={(event) => {
                                    if (this.isNotEmptyFieldCheck(event)) {
                                        this.transferAmount();
                                    }
                                }} />


                                <div className="success" id="createDivId" value={this.state.createDiv}>
                                    {this.state.createDiv}</div>
                                <div className="error" id="errorDivId" value={this.state.errorDiv}>
                                    {this.state.errorDiv}</div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


