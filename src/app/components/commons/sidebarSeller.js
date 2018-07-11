import React from "react";
import "../../html/assets/css/global.css";
import "../../html/assets/css/style.css";
import "../../html/assets/css/reset.css";


export class SidebarSeller extends React.Component {

    render() {
        return (

            <sidebar className="dashboard-link">
                <ul className="clearfix">
                    <li>
                        <a href="/WalletSeller">Wallet</a>
                    </li>

                    <li>
                        <a href="/AmountTransferSellerReport">Amount Transfer Report</a>
                    </li>

                </ul>
            </sidebar>
        );
    }
}