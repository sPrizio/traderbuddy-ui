import React, {Component} from "react";
import AbstractPage from "./AbstractPage";
import LoginPage from "./authentication/LoginPage";
import RegisterPage from "./authentication/RegisterPage";

export default class GenericPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            loginFlow: 'login'
        }
    }


    //  RENDER FUNCTION

    render() {
        let authenticationFlow
        if (this.state.authenticated) {
            authenticationFlow = <AbstractPage />
        } else if (this.state.loginFlow === 'login') {
            authenticationFlow = <LoginPage />
        } else {
            authenticationFlow = <RegisterPage />
        }

        return (
            <div className="generic-page">
                {authenticationFlow}
            </div>
        );
    }
}