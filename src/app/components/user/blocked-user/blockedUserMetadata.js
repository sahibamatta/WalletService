import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
const urlForBlockedUsers = "http://localhost:8080/WalletService/user/blocked/";
let citySelectId = "";
let vi = "";
export class BlockedUserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "",
            dateDiv: "",
            row: "",
            errorDiv: "",
            createDiv: "",
            userId: "",
            data: ""

        }
        this.clearAllFields = this.clearAllFields.bind(this);
        this.populateBlockedUserDetailsDateWise = this.populateBlockedUserDetailsDateWise.bind(this);

    }

    populateBlockedUserDetailsDateWise(event) {

        var propState = event.target.value;
        console.log("propState is::" + propState);

        this.clearAllFields();

        this.setState({
            date: propState
        })
        console.log("user is:" + this.state.date);

        if (propState != '') {

            fetch(urlForBlockedUsers + propState).then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                return response.json();
            })

                .then(d => {
                    console.log(d);
                    this.clearAllFields()
                    //console.log("then data::" + JSON.stringify(d))


                    console.log("then data::" + d.data);

                    this.setState({
                        data: d.data
                    })

                })

        }
    }

    clearAllFields() {

        this.setState({
            dateDiv: "",
            errorDiv: ""
        })
    }

    /*populateTableRows() {
        console.log("in populateTableRows");
        var rows = [];
        this.state.data.forEach(function (d) {
            rows.push(
                <tr>
                    <td>d.userId</td>
                    <td>d.profile</td>
                    <td>d.ip</td>
                    <td>d.time</td>
                </tr >
            );
        })
        return rows;
}

*/
    render() {

        var rows = [];
        console.log("this.state.data len--" + this.state.data.length)

        for (var i = 0; i < this.state.data.length; i++) {
            rows.push(
                <tr key={i}>
                    <td >{this.state.data[i].userId}</td>
                    <td>{this.state.data[i].profile}</td>
                    <td>{this.state.data[i].ip}</td>
                    <td>{this.state.data[i].time}</td>
                </tr >
            );
        }

        return (

            <div className="content">
                <div className="container clearfix">

                    <SidebarClass />
                    <div className="main-content">
                        <div className="property-form">
                            <div className="form-wrap">
                                <label className="form-title">Fecha</label>
                                <input type="date" name="date" id="dateId" maxLength="100"
                                    value={this.state.date} onChange={this.populateBlockedUserDetailsDateWise} />
                                <div className="error" id="dateDivId" data-value=
                                    {this.state.dateDiv}>{this.state.dateDiv}</div>
                                <br /><br /><br /><br />


                                <table>
                                    <thead>
                                        <tr>
                                            <th >Usuario Id</th>
                                            <th >Perfil</th>
                                            <th >IP</th>
                                            <th >Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
