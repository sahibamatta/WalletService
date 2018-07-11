import React from "react";
import { HeaderSeller } from "../../commons/headerSeller";
import { WalletSellerForm } from "./walletSellerForm";
import { Footer } from "../../commons/footer";

export class WalletSeller extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <HeaderSeller />
                <WalletSellerForm />
                <Footer />
            </div>
        );
    }
}
