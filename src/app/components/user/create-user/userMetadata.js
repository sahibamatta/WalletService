import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
const urlForUserCreation = "http://localhost:8080/WalletService/user/create";
const urlForUserProfile = "http://localhost:8080/WalletService/user/profile";
let citySelectId = "";
let v = "";
export class UserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            user: "",
            birthday: "",
            phone: "",
            profile: "--Select--",
            email: "",
            password: "",
            confirmPassword: "",
            firstnameDiv: "",
            lastnameDiv: "",
            userDiv: "",
            birthdayDiv: "",
            phoneDiv: "",
            emailDiv: "",
            passwordDiv: "",
            confirmPasswordDiv: "",
            createDiv: "",
            errorDiv: ""

        }
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearAllFields = this.clearAllFields.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
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
            }
    }

    populateUserProfiles() {
        const profileItems = [];
        console.log('this.state.userProfiles.length is:' + this.state.userProfiles.length);
        for (let i = this.state.userProfiles.length - 1; i >= 0; i--) {
            profileItems.push(<option key={i} value={this.state.userProfiles[i]}>{this.state.userProfiles[i]}</option>);
        }
        return profileItems;
    }

    onDropdownSelected(event) {
        var index = event.nativeEvent.target.selectedIndex;
        v = event.nativeEvent.target[index].text
        this.setState({
            [event.target.name]: v
        })
    }

    submitData() {
        console.log("in submit data");
        var data = {
            "firstName": this.state.firstname,
            "lastName": this.state.lastname,
            "userId": this.state.user,
            "birthday": this.state.birthday,
            "phone": this.state.phone,
            "profile": this.state.profile,
            "emailId": this.state.email,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        }

        console.log("data is::" + data + "::username is :" + this.state.username + "::email is::" + this.state.email);
        console.log("emailId is::" + data.emailId + "::username::" + data.userNameId);
        var headers = {
            "Content-Type": "application/json"
        }

        fetch(urlForUserCreation, {
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
            firstname: "",
            lastname: "",
            user: "",
            birthday: "",
            phone: "",
            profile: "--Select--",
            email: "",
            password: "",
            confirmPassword: "",
            firstnameDiv: "",
            lastnameDiv: "",
            userDiv: "",
            birthdayDiv: "",
            phoneDiv: "",
            profileDiv: "",
            emailDiv: "",
            passwordDiv: "",
            confirmPasswordDiv: "",
            errorDiv: ""
        })
    }

    isNotEmptyFieldCheck(event) {
        event.preventDefault();

        this.setState({
            firstnameDiv: "",
            lastnameDiv: "",
            userDiv: "",
            birthdayDiv: "",
            phoneDiv: "",
            profileDiv: "",
            emailDiv: "",
            passwordDiv: "",
            confirmPasswordDiv: ""
        })

        console.log("in notempty::" + this.state.profile)

        if (this.state.user == null || this.state.user == '') {
            this.setState({
                userDiv: "Please enter a User Id"
            })
            return false;
        }

        else if (this.state.firstname == null || this.state.firstname == '') {
            this.setState({
                firstnameDiv: "Please enter First Name"
            })
            return false;
        }

        else if (this.state.lastname == null || this.state.lastname == '') {
            this.setState({
                lastnameDiv: "Please enter Last Name"
            })
            return false;
        }

        else if (this.state.birthday == null || this.state.birthday == '') {
            this.setState({
                birthdayDiv: "Please select your Birth Date"
            })
            return false;
        }

        else if (this.state.profile == null || this.state.profile == '' || this.state.profile == '--Select--') {
            this.setState({
                profileDiv: "Please select a Role"
            })
            return false;
        }

        else if (this.state.email == null || this.state.email == '') {
            this.setState({
                emailDiv: "Please enter an email id"
            })
            return false;
        }

        else if (this.state.password == null || this.state.password == '') {
            this.setState({
                passwordDiv: "Please enter a Password"
            })
            return false;
        }

        else if (this.state.confirmPassword == null || this.state.confirmPassword == '') {
            this.setState({
                confirmPasswordDiv: "Please re-enter/confirm your password"
            })
            return false;
        }

        else if (this.state.confirmPassword != this.state.password) {
            this.setState({
                confirmPasswordDiv: "Please re-enter the same password"
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

    validateEmail() {
        console.log("in validateEmail");
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            console.log("Email is Not Correct");
            this.setState({ emailDiv: "Email Format is Incorrect" })
            return false;
        }
        else {
            this.setState({ emailDiv: "" })
            console.log("Email is Correct");
        }
        return true;
    }

    validatePassword() {
        console.log("in validatePassword::");
        
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (strongRegex.test(this.state.password) === false) {
            console.log("Password is Not Correct");
            this.setState({ passwordDiv: "Password must be atleast 8 characters long ,contain atleast 1 upper-case , 1 lower-case and 1 special character" })
            return false;
        }
        else {
            this.setState({ passwordDiv: "" })
            console.log("password is Correct");
        }
        return true;
    }




    render() {

        if (this.state.requestFailed) return (<p>Failed...</p>);
        if (!this.state.userProfiles) return (<p>Loading...</p>);
        if (!this.state.profile) return (<p>Loading...</p>);

        return (
            <div className="content">
                <div className="container clearfix">
                    <SidebarClass />
                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title">Create User</h1>

                            <form>

                                <div className="form-wrap">
                                    <label className="form-title">User Id</label>
                                    <input type="text" name="user" id="userId" maxLength="100"
                                        value={this.state.user} onChange={this.handleChange} />
                                    <div className="error" id="userDivId" data-value=
                                        {this.state.userDiv}>{this.state.userDiv}</div>
                                </div>


                                <div className="form-wrap">
                                    <label className="form-title">First Name</label>
                                    <input type="text" name="firstname" id="firstNameId" maxLength="100"
                                        value={this.state.firstname} onChange={this.handleChange} />
                                    <div className="error" id="firstnameDivId" data-value=
                                        {this.state.firstnameDiv}>{this.state.firstnameDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Last Name</label>
                                    <input type="text" name="lastname" id="lastNameId" maxLength="100"
                                        value={this.state.lastname} onChange={this.handleChange} />
                                    <div className="error" id="lastnameDivId" data-value=
                                        {this.state.lastnameDiv}>{this.state.lastnameDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Birthday</label>
                                    <input type="date" name="birthday" id="birthdayId" maxLength="100"
                                        value={this.state.birthday} onChange={this.handleChange} />
                                    <div className="error" id="birthdayDivId" data-value=
                                        {this.state.birthdayDiv}>{this.state.birthdayDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Phone Number</label>
                                    <input type="number" name="phone" id="phoneId" maxLength="20"
                                        value={this.state.phone} onChange={this.handleChange} />
                                    <div className="error" id="phoneDivId" data-value=
                                        {this.state.phoneDiv}>{this.state.phoneDiv}</div>
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
                                    <label className="form-title">Email Id</label>
                                    <input type="text" name="email" id="emailId" maxLength="200"
                                        value={this.state.email} onChange={this.handleChange}
                                        onBlur={this.validateEmail} />
                                    <div className="error" id="emailDivId" data-value=
                                        {this.state.emailDiv}>{this.state.emailDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Password</label>
                                    <input type="password" name="password" id="passwordId" maxLength="200"
                                        value={this.state.password} onChange={this.handleChange}
                                        onBlur={this.validatePassword} />
                                <div className="error" id="passwordDivId" data-value=
                                        {this.state.passwordDiv}>{this.state.passwordDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPasswordId" maxLength="200"
                                        value={this.state.confirmPassword} onChange={this.handleChange} />
                                    <div className="error" id="confirmPasswordDivId" data-value=
                                        {this.state.confirmPasswordDiv}>{this.state.confirmPasswordDiv}</div>
                                </div>

                                <input type="submit" value="create" onClick={(event) => {
                                    if (this.isNotEmptyFieldCheck(event)) {
                                        if (this.validateEmail() && this.validatePassword())
                                            this.submitData();
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
