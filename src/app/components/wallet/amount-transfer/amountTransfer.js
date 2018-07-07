import React from "react";
import { Header } from "../../commons/header"
import { AmountTransferReport } from "./amountTransferReport";
import { Footer } from "../../commons/footer"

export class AmountTransfer extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Header />
                <AmountTransferReport />
                <Footer />
            </div>
        );
    }
}
