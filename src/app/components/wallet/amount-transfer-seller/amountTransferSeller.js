import React from "react";
import { HeaderSeller } from "../../commons/headerSeller";
import { AmountTransferSellerReport } from "./amountTransferSellerReport";
import { Footer } from "../../commons/footer"

export class AmountTransferSeller extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <HeaderSeller />
                <AmountTransferSellerReport />
                <Footer />
            </div>
        );
    }
}
