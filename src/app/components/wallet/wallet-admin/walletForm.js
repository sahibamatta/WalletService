import React from 'react';
import "../../../html/assets/css/global.css";  
import { SidebarClass } from "../../commons/sidebar"

import PropTypes from 'prop-types';


export class WalletForm extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (

            <div className="content">
                <div className="container clearfix">
                    <SidebarClass />
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


