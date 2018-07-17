import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { request } from "https";
const urlForUserUpdation = "http://localhost:8080/WalletService/user/update";
const urlForUserProfile = "http://localhost:8080/WalletService/user/profile";
const urlForUserNames = "http://localhost:8080/WalletService/user/id";
const urlForUserDetailsById = "http://localhost:8080/WalletService/user/details/";
let citySelectId = "";
let v = "";
let vi = [];
export class UpdateUserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            user: "--Select--",
            profile: "--Select--",
            isUserLocked: false,
            changePassword: false,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            userDiv: "",
            emailDiv: "",
            oldPasswordDiv: "",
            newPasswordDiv: "",
            confirmPasswordDiv: "",
            createDiv: "",
            errorDiv: "",
            userstate: ""

        }
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearAllFields = this.clearAllFields.bind(this);
        this.populateUserDetailsBasedOnUserIDs = this.populateUserDetailsBasedOnUserIDs.bind(this);
        this.hideUnhideDiv = this.hideUnhideDiv.bind(this);
        this.updateData = this.updateData.bind(this);
        this.onCheckboxSelected = this.onCheckboxSelected.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

    }
    componentDidMount() {
        console.log("in componentdidmount")

        fetch(urlForUserProfile)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                return response.json();
            })
            .then(d => {
                console.log(d);
                this.setState({
                    userProfiles: d.userProfiles,
                    profile: "--Select--"
                })

            }), () => {
                this.setState({
                    requestFailed: true
                })
            },

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

    validatePassword() {
        console.log("in validatePassword::");

        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (strongRegex.test(this.state.newPassword) === false) {
            console.log("Password is Not Correct");
            this.setState({ newPasswordDiv: "Password must be atleast 8 characters long ,contain atleast 1 upper-case , 1 lower-case and 1 special character" })
            return false;
        }
        else {
            this.setState({ newPasswordDiv: "" })
            console.log("password is Correct");
        }
        return true;
    }


    populateUserProfiles() {
        const profileItems = [];
        console.log('this.state.userProfiles.length is:' + this.state.userProfiles.length);
        for (let i = this.state.userProfiles.length - 1; i >= 0; i--) {
            profileItems.push(<option key={i} value={this.state.userProfiles[i]}>{this.state.userProfiles[i]}</option>);
        }
        return profileItems;
    }

    populateUsers() {

        const userItems = [];
        console.log('this.state.username.length is:' + this.state.username.length);
        for (let i = this.state.username.length - 1; i >= 0; i--) {
            userItems.push(<option key={i} value={this.state.username[i]}>{this.state.username[i]}</option>);
        }
        return userItems;

    }

    onDropdownSelected(event) {
        var index = event.nativeEvent.target.selectedIndex;
        v = event.nativeEvent.target[index].text
        this.setState({
            [event.target.name]: v
        })
    }

    populateUserDetailsBasedOnUserIDs(event) {

        var index = event.nativeEvent.target.selectedIndex;
        var propState = event.nativeEvent.target[index].text
        console.log("propState is::" + propState);

        this.clearAllFields();

        this.setState({
            user: propState,
            createDiv: "",
            errorDiv: ""
        })
        console.log("user is:" + this.state.user);

        if (propState != '--Select--') {

            fetch(urlForUserDetailsById + propState).then(function (response) {
                // alert("in response--"+response.json())
                return response.json();
            })
                .then(function (data) {
                    { () => this.clearAllFields() }

                    vi = {
                        profile: data.profile, isUserLocked: data.isUserLocked
                    }
                    console.log("profile::" + vi.profile +
                        "isUSerLOcked:::" + vi.isUserLocked);

                    return vi;

                }).then(vi => {
                    document.getElementById('userId').value = this.state.user;

                    this.setState({
                        profile: vi.profile,
                        isUserLocked: vi.isUserLocked
                    })
                })
        }
    }

    ifChangePasswordChecked() {
        console.log("ifChangePasswordChecked::")

        this.setState({
            oldPasswordDiv: "",
            newPasswordDiv: "",
            confirmPasswordDiv: ""
        })

        console.log("changePassword is::" + this.state.changePassword);
        console.log("oldPassword is::" + this.state.oldPassword);
        if (this.state.changePassword) {
            if (this.state.oldPassword == '') {
                console.log("in if old Password is blnk");
                this.setState({
                    oldPasswordDiv: "Please enter old password"
                })

                return false;
            }

            else if (this.state.newPassword == '') {
                this.setState({
                    newPasswordDiv: "Please enter new password"
                })

                return false;
            }

            else if (this.state.confirmPassword == '') {
                this.setState({
                    confirmPasswordDiv: "Please confirm / re-enter password"
                })

                return false;
            }

            else if (this.state.newPassword != this.state.confirmPassword) {
                this.setState({
                    confirmPasswordDiv: "Please confirm / re-enter the same password"
                })

                return false;
            }
        }
        return true;
    }


    updateData() {
        console.log("in update data");

        var data = {
            "userId": this.state.user,
            "profile": this.state.profile,
            "isUserLocked": this.state.isUserLocked,
            "changePassword": this.state.changePassword,
            "oldPassword": this.state.oldPassword,
            "newPassword": this.state.newPassword
        }

        var headers = {
            "Content-Type": "application/json"
        }

        fetch(urlForUserUpdation, {
            method: "PUT",
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


    clearAllFields() {

        this.setState({

            user: "--Select--",
            profile: "--Select--",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            isUserLocked: false,
            changePassword: false,
            userDiv: "",
            profileDiv: "",
            oldPasswordDiv: "",
            newPasswordDiv: "",
            confirmPasswordDiv: "",
            errorDiv: "",
            userLockedDiv: ""
        }, () => {
            document.getElementById("divChangePassword").style.display = "none";
        });

    }

    isNotEmptyFieldCheck(event) {
        event.preventDefault();

        this.setState({
            userDiv: "",
            profileDiv: "",
            oldPasswordDiv: "",
            passwordDiv: "",
            confirmPasswordDiv: "",
            errorDiv: "",
            userLockedDiv: ""
        })

        console.log("in notempty::" + this.state.user)

        if (this.state.user == null || this.state.user == '') {
            this.setState({
                userDiv: "Please enter a User Id"
            })
            return false;
        }

        else if (this.state.profile == null || this.state.profile == '' || this.state.profile == '--Select--') {
            this.setState({
                profileDiv: "Please select a Role"
            })
            return false;
        }
        console.log("changePasswors::" + !this.ifChangePasswordChecked)

        if (!this.ifChangePasswordChecked())
            return false;

        return true;
    }

    handleChange(event) {
        console.log("in handlechange::" + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onCheckboxSelected(event) {
        var checked = event.target.checked
        this.setState({
            [event.target.name]: checked
        })
    }

    hideUnhideDiv(event) {
        var checked = event.target.checked
        console.log("checked is::" + checked);
        this.setState({
            changePassword: checked
        }, () => {

            var x = document.getElementById("divChangePassword");
            console.log("this.state.changePassword is::" + this.state.changePassword);
            if (this.state.changePassword) {
                console.log("if hideunhide div");
                x.style.display = "block";
            } else {
                console.log("else hideunhide div");
                x.style.display = "none";
            }

        });

    }


    render() {

        if (this.state.requestFailed) return (<p>Failed...</p>);
        if (!this.state.userProfiles || !this.state.username) return (<p>Loading...</p>);
        if (!this.state.profile || !this.state.user) return (<p>Loading...</p>);

        return (
            <div className="content">
                <div className="container clearfix">
                    <SidebarClass />
                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title">Actualizar Usuario</h1>

                            <form>

                                <div className="form-wrap">
                                    <label className="form-title">User Id</label>
                                    <select id="userId" name="user" value={this.state.user}
                                        onChange={this.populateUserDetailsBasedOnUserIDs}>
                                        <option>--Select--</option>
                                        {this.populateUsers()}
                                    </select>

                                    <div className="error" id="userDivId" data-value=
                                        {this.state.userDiv}>{this.state.userDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title"> User Profile</label>
                                    <select id="profileId" name="profile" value={this.state.profile}
                                        onChange={this.onDropdownSelected}>
                                        <option>--Select--</option>
                                        {this.populateUserProfiles()}
                                    </select>
                                    <div className="error" id="profileDivId" data-value=
                                        {this.state.profileDiv}>{this.state.profileDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <input name="isUserLocked" id="isUserLockedId" type="checkbox"
                                        checked={this.state.isUserLocked}
                                        onChange={this.onCheckboxSelected} />
                                    <label className="form-title" >Usuario Bloqueado</label>
                                </div>

                                <br />
                                <div className="form-wrap">
                                    <input name="changePassword" id="changePasswordId" type="checkbox"
                                        checked={this.state.changePassword}
                                        onChange={this.hideUnhideDiv} />

                                    <label className="form-title" >Cambiar Password</label>
                                </div>


                                <div id="divChangePassword" style={{ display: 'none' }}>

                                    <div className="form-wrap">
                                        <label className="form-title">Old Password</label>
                                        <input type="password" name="oldPassword" id="oldPasswordId" maxLength="200"
                                            value={this.state.oldPassword} onChange={this.handleChange} />
                                        <div className="error" id="oldPasswordDivId" data-value=
                                            {this.state.oldPasswordDiv}>{this.state.oldPasswordDiv}</div>
                                    </div>

                                    <div className="form-wrap">
                                        <label className="form-title">New Password</label>
                                        <input type="password" name="newPassword" id="newPasswordId" maxLength="200"
                                            value={this.state.newPassword} onChange={this.handleChange}
                                            onBlur={this.validatePassword} />
                                        <div className="error" id="newPasswordDivId" data-value=
                                            {this.state.newPasswordDiv}>{this.state.newPasswordDiv}</div>
                                    </div>

                                    <div className="form-wrap">
                                        <label className="form-title">Confirm Password</label>
                                        <input type="password" name="confirmPassword" id="confirmPasswordId" maxLength="200"
                                            value={this.state.confirmPassword} onChange={this.handleChange} />
                                        <div className="error" id="confirmPasswordDivId" data-value=
                                            {this.state.confirmPasswordDiv}>{this.state.confirmPasswordDiv}</div>
                                    </div>
                                </div>


                                <input type="submit" value="update" onClick={(event) => {
                                    if (this.isNotEmptyFieldCheck(event)) {
                                        this.updateData();
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
