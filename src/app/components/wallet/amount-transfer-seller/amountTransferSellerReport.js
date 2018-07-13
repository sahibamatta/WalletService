import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarSeller } from "../../commons/sidebarSeller";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
const urlForAmountTransferReport = "http://localhost:8080/WalletService/wallet/report/";
let citySelectId = "";
let vi = "";
export class AmountTransferSellerReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dateFrom: "",
            dateFromDiv: "",
            dateTo: "",
            dateToDiv: "",
            row: "",
            errorDiv: "",
            createDiv: "",
            userId: "",
            data: ""

        }
        this.clearAllFields = this.clearAllFields.bind(this);
        this.populateAmountTransfersBetweenDates = this.populateAmountTransfersBetweenDates.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.isNotEmptyFieldCheck = this.isNotEmptyFieldCheck.bind(this);

    }

    populateAmountTransfersBetweenDates(event) {

        console.log("in populateAmountTransfersBetweenDates");
        console.log("startDate::" + this.state.dateFrom + "::endDate::" + this.state.dateTo)

        fetch(urlForAmountTransferReport + this.state.dateFrom + "/" + this.state.dateTo).then(response => {
            if (!response.ok) {
                throw Error("Network request failed");
            }
            return response.json();
        })

            .then(d => {
                console.log(d);
                this.clearAllFields()
                //console.log("then data::" + JSON.stringify(d))

                console.log("then data::" + d.walletTransferAmountRequestDto);

                this.setState({
                    data: d.walletTransferAmountRequestDto
                })

            })

    }

    isNotEmptyFieldCheck(event) {
        event.preventDefault();

        this.setState({
            dateFromDiv: "",
            dateToDiv: "",
        })

        console.log("in notempty::" + this.state.dateFrom + "::dateTo::" + this.state.dateTo)

        if (this.state.dateFrom == null || this.state.dateFrom == '') {
            this.setState({
                dateFromDiv: "Please select a start date"
            })
            return false;
        }

        if (this.state.dateTo == null || this.state.dateTo == '') {
            this.setState({
                dateToDiv: "Please select an end date"
            })
            return false;
        }

        return true;
    }

    clearAllFields() {

        this.setState({
            dateFrom: "",
            dateFromDiv: "",
            dateTo: "",
            dateToDiv: "",
            errorDiv: ""
        })
    }

    onDropdownSelected(event) {

        var propState = event.target.value;
        console.log("propState is::" + propState);

        this.setState({
            [event.target.name]: propState
        })
    }


    render() {

        var rowsAmount = [];
        console.log("this.state.data len--" + this.state.data.length)

        for (var i = 0; i < this.state.data.length; i++) {
            console.log("date is::" + this.state.data[i].date + "::transferFrom::" + this.state.data[i].transferFrom +
                "::amountPyg::" + this.state.data[i].amountPyg + "::amountEth::" + this.state.data[i].amountEth +
                "::transferto::" + this.state.data[i].transferTo)
            rowsAmount.push(
                <tr key={i}>
                    <td >{this.state.data[i].date}</td>
                    <td >{this.state.data[i].transferFrom}</td>
                    <td>{this.state.data[i].amountPyg}</td>
                    <td>{this.state.data[i].amountEth}</td>
                    <td>{this.state.data[i].transferTo}</td>
                    <td>{this.state.data[i].reason}</td>
                </tr >
            );
        }

        return (

            <div className="content">
                <div className="container clearfix">
                    <SidebarSeller />

                    <div className="main-content">
                        <div className="property-form">

                            <div className="form-wrap">
                                <label className="form-title">Del</label>
                                <input type="date" name="dateFrom" id="dateId" maxLength="100"
                                    value={this.state.dateFrom} onChange={this.onDropdownSelected} />
                                <div className="error" id="dateFromDivId" data-value=
                                    {this.state.dateFromDiv}>{this.state.dateFromDiv}</div>
                            </div>

                            <div className="form-wrap">
                                <label className="form-title">Al</label>
                                <input type="date" name="dateTo" id="dateId" maxLength="100"
                                    value={this.state.dateTo} onChange={this.onDropdownSelected} />
                                <div className="error" id="dateToDivId" data-value=
                                    {this.state.dateToDiv}>{this.state.dateToDiv}</div>

                                <br /><br />
                                <input type="submit" value="GENERAR REPORTE" onClick={(event) => {
                                    if (this.isNotEmptyFieldCheck(event)) {
                                        this.populateAmountTransfersBetweenDates();
                                    }
                                }} />

                                <div className="success" id="createDivId" value={this.state.createDiv}>
                                    {this.state.createDiv}</div>
                                <div className="error" id="errorDivId" value={this.state.errorDiv}>
                                    {this.state.errorDiv}</div>
                            </div>

                            <br /><br />
                            <table>
                                <thead>
                                    <tr>
                                        <th >Fecha</th>
                                        <th >Transferencia desde(Dirección Wallet)</th>
                                        <th >Monto en PYG</th>
                                        <th >Monto en ETH</th>
                                        <th >Transferencia a(Dirección Wallet)</th>
                                        <th >Motivo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {rowsAmount}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
