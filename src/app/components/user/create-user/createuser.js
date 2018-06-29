import React from "react";
import { Header } from "../../commons/header";
import {UserMetadata} from "./userMetadata";
import { Footer } from "../../commons/footer";

export class CreateUser extends React.Component {

    render() {
        return (
            <div>
                <Header/> 
                <UserMetadata/>
                <Footer/>    
            </div>
        );
    }
}
