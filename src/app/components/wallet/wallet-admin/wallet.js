import React from "react";
import { Header } from "../../commons/header"
import { WalletForm } from "./walletForm";
import { Footer } from "../../commons/footer"

export class Wallet extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Header />
                <WalletForm />
                <Footer />
            </div>
        );
    }
}
