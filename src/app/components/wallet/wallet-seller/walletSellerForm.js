import React from 'react';
import "../../../html/assets/css/login.css"
import { SidebarSeller } from "../../commons/sidebarSeller";

import PropTypes from 'prop-types';


export class WalletSellerForm extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (

            <div className="content">
                <div className="container clearfix">
                    <SidebarSeller />
                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title">Wallet</h1>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


