import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
const urlForUserDeletion = "http://localhost:8080/WalletService/user/delete/";
const urlForUserProfile = "http://localhost:8080/WalletService/user/profile";
const urlForUserNames = "http://localhost:8080/WalletService/user/id";
let v = "";
export class DeleteUserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            user: "--Select--",
            createDiv: "",
            errorDiv: "",
            userDiv: ""
        }
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.clearAllFields = this.clearAllFields.bind(this);
        this.populateUsers = this.populateUsers.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.fetchUserNames = this.fetchUserNames.bind(this);

    }
    componentDidMount() {
        console.log("in componentdidmount")
        fetch(urlForUserNames)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                return response.json();
            })
            .then(d => {
                console.log(d);
                this.setState({
                    username: d.username,
                    user: "--Select--"
                })

            }), () => {
                this.setState({
                    requestFailed: true
                })
            }
    }

    fetchUserNames() {
        fetch(urlForUserNames)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                return response.json();
            })
            .then(d => {
                console.log(d);
                this.setState({
                    username: d.username,
                    user: "--Select--"
                })

            }), () => {
                this.setState({
                    requestFailed: true
                })
            }
    }


    onDropdownSelected(event) {
        var index = event.nativeEvent.target.selectedIndex;
        v = event.nativeEvent.target[index].text
        this.setState({
            [event.target.name]: v
        })
    }

    deleteData() {
        console.log("in deleteData");

        fetch(urlForUserDeletion + this.state.user, {
            method: "DELETE"
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
                    this.fetchUserNames();
                }
                else {
                    this.setState({
                        errorDiv: data.message,
                        createDiv: ""
                    })
                }

                console.log("this.state.createDiv is::" + this.state.createDiv);
                console.log("this.state.errorDiv is::" + this.state.errorDiv);

            })
    }

    clearAllFields() {

        this.setState({
            user: "--Select--",
            errorDiv: ""
        })
    }



    isNotEmptyFieldCheck(event) {
        event.preventDefault();

        this.setState({
            userDiv: "",
            user: "--Select--"

        })

        if (this.state.user == null || this.state.user == '--Select--') {
            this.setState({
                userDiv: "Please select a User"
            })
            return false;
        }

        return true;
    }

    populateUsers() {

        const userItems = [];
        console.log('this.state.username.length is:' + this.state.username.length);
        for (let i = this.state.username.length - 1; i >= 0; i--) {
            userItems.push(<option key={i} value={this.state.username[i]}>{this.state.username[i]}</option>);
        }
        return userItems;

    }


    render() {

        if (this.state.requestFailed) return (<p>Failed...</p>);
        if (!this.state.username) return (<p>Loading...</p>);
        if (!this.state.user) return (<p>Loading...</p>);

        return (
            <div className="content">
                <div className="container clearfix">
                    <SidebarClass />
                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title">Suprimir Usuario</h1>

                            <form>

                                <div className="form-wrap">
                                    <label className="form-title">User Id</label>
                                    <select id="userId" name="user" value={this.state.user}
                                        onChange={this.onDropdownSelected}>
                                        <option>--Select--</option>
                                        {this.populateUsers()}
                                    </select>

                                    <div className="error" id="userDivId" data-value=
                                        {this.state.userDiv}>{this.state.userDiv}</div>
                                </div>

                                <input type="submit" value="SUPRIMIR" onClick={(event) => {
                                    if (this.isNotEmptyFieldCheck(event)) {
                                        this.deleteData();
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
        );
    }
}
