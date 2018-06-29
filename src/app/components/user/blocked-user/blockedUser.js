import React from "react";
import { Header } from "../../commons/header";
import {BlockedUserMetadata} from "./blockedUserMetadata";
import { Footer } from "../../commons/footer";

export class BlockedUser extends React.Component {

    render() {
        return (
            <div>
                <Header/> 
                <BlockedUserMetadata/>
                <Footer/>    
            </div>
        );
    }
}
