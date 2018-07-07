import React from "react";
import { render } from "react-dom";
import { CreateUser } from "./components/user/create-user/createuser";
import { UpdateUser } from "./components/user/update-user/updateuser";
import { DeleteUser } from "./components/user/delete-user/deleteuser";
import { BlockedUser } from "./components/user/blocked-user/blockedUser";
import { Login } from "./components/login-logout/login/login";
import { Logout } from "./components/login-logout/logout/logout";
import { Wallet } from "./components/wallet/wallet-admin/wallet";
import { WalletSeller } from "./components/wallet/wallet-seller/walletSeller";
import { AmountTransfer } from "./components/wallet/amount-transfer/amountTransfer";
import { Router, Route, browserHistory } from "react-router";

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            login: "false",
            loginSeller: "false"

        }
        this.requireAuth = this.requireAuth.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.requireAuthSeller = this.requireAuthSeller.bind(this);
        this.isAuthenticatedSeller = this.isAuthenticatedSeller.bind(this);
        //sessionStorage.setItem('user', 'my');       

    }

    requireAuth(nextState, replace) {
        console.log("in requireAuth");
        console.log("this.state.loginSeller is::" + this.state.loginSeller)
        if (!this.isAuthenticated()) {
            if (this.state.loginSeller == "true")
                replace({ pathname: '/WalletSeller' });
            else
                replace({ pathname: '/login' });
        }

    }

    isAuthenticated() {

        //localStorage.setItem('user', 'my');
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user') != null && localStorage.getItem('user') == 'Administrator') {
            console.log("if");
            return true;
        }
        return false;
    }

    requireAuthSeller(nextState, replace) {
        console.log("in requireAuth");
        if (!this.isAuthenticatedSeller()) {
            replace({ pathname: '/login' });
        }
    }


    isAuthenticatedSeller() {

        //localStorage.setItem('user', 'my');
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user') != null && localStorage.getItem('user') == 'Seller') {
            console.log("if");
            return true;

        }
        return false;
    }

    /*yes(){
        sessionStorage.setItem('user', 'my');
    }*/
    render() {
        return (

            <Router history={browserHistory}>
                <Route path="login" components={Login} />

                <Route path="CreateUser" components={CreateUser} onEnter={this.requireAuth} />
                <Route path="UpdateUser" components={UpdateUser} onEnter={this.requireAuth} />
                <Route path="DeleteUser" components={DeleteUser} onEnter={this.requireAuth} />
                <Route path="Wallet" components={Wallet} onEnter={this.requireAuth} />
                <Route path="AmountTransferReport" components={AmountTransfer} onEnter={this.requireAuth} />
                <Route path="BlockedUserReport" components={BlockedUser} onEnter={this.requireAuth} />
                <Route path="WalletSeller" components={WalletSeller} onEnter={this.requireAuthSeller} />
                <Route path="Logout" components={Logout} onEnter={this.requireAuth} />
            </Router>
        );
    }
}

render(<App />, window.document.getElementById("app"));