import React, {Component} from "react";
import {Helmet} from "react-helmet";

export default class RegisterPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Register</title>
                </Helmet>
                <div className="register-page">
                    <p>Hello World!</p>
                </div>
            </>
        );
    }
}