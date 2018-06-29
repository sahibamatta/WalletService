import React from "react";
import "../../html/assets/css/global.css";
const urlForFooter = "http://localhost:8080/WalletService/header-footer/footer";

export class Footer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    componentDidMount() {
        console.log("in componentdidmount")
        fetch(urlForFooter)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                
                return response.json();
            })
            .then(d => {
                console.log(d);
                this.setState({
                    footer: d.footer
                })

            }), () => {
                this.setState({
                    requestFailed: true
                })
            }
    }


    render() {
        return (

            <footer className="footer">
                <div className="main-page">
                    <p>{this.state.footer}</p>
                </div>
            </footer>

        );
    }
}