import React, {Component} from "react";
import AbstractPage from "./AbstractPage";
import LoginPage from "./authentication/LoginPage";
import RegisterPage from "./authentication/RegisterPage";
import {UserContext} from "../context/UserContext";
import {baseUrl} from "../service/ConfigurationService";

export default class GenericPage extends Component {

    static loginUrl = baseUrl() + '/login'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            authenticated: true,
            loginFlow: 'login',
            errorState: false,
            errorStateMessage: '',
            user: {}
        }

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }


    //  HANDLER FUNCTIONS

    async login(username, password) {
        try {
            this.setState({isLoading:true})
            const response = await fetch(GenericPage.loginUrl, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data.data)


            if (data.success) {
                this.setState({
                    isLoading: false,
                    authenticated: data.data.loggedIn,
                    user: data.data.user
                })
            } else {
                this.setState({
                    isLoading: false,
                    errorState: true,
                    errorStateMessage: data.data.message
                })
                //  TODO: error state for logging in
            }
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    logout() {
        console.log('logout')
        this.setState({user: {}})
    }



    //  RENDER FUNCTION

    render() {
        const value = {
            isLoading: this.state.isLoading,
            user: this.state.user,
            errorState: this.state.errorState,
            errorStateMessage: this.state.errorStateMessage,
            loginUser: this.login,
            logoutUser: this.logout
        }

        let authenticationFlow
        if (this.state.authenticated) {
            authenticationFlow = <AbstractPage />
        } else if (this.state.loginFlow === 'login') {
            authenticationFlow = <LoginPage />
        } else {
            authenticationFlow = <RegisterPage />
        }

        return (
            <UserContext.Provider value={value}>
                <div className="generic-page">
                    {authenticationFlow}
                </div>
            </UserContext.Provider>
        );
    }
}