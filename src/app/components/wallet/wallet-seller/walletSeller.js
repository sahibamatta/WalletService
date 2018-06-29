import React from "react";
import { Header } from "../../commons/header";
import { WalletSellerForm } from "./walletSellerForm";
import { Footer } from "../../commons/footer";

export class WalletSeller extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Header />
                <WalletSellerForm/>
                <Footer />
            </div>
        );
    }
}
