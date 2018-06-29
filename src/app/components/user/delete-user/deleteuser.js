import React from "react";
import { Header } from "../../commons/header";
import {DeleteUserMetadata} from "./deleteUserMetadata";
import { Footer } from "../../commons/footer";

export class DeleteUser extends React.Component {

    render() {
        return (
            <div>
                <Header/> 
                <DeleteUserMetadata/>
                <Footer/>    
            </div>
        );
    }
}
