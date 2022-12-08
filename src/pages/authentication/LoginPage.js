import React, {Component} from "react";
import {UserContext} from "../../context/UserContext";
import brandImage from '../../assets/images/brand/logo_full.png'
import {Helmet} from "react-helmet";

export default class LoginPage extends Component {

    static contextType = UserContext

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleEmailInput = this.handleEmailInput.bind(this)
        this.handlePasswordInput = this.handlePasswordInput.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleEmailInput(e) {
        this.setState({email: e.target.value})
    }

    handlePasswordInput(e) {
        this.setState({password: e.target.value})
    }


    // GENERAL FUNCTIONS

    //  RENDER FUNCTION

    render() {
        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Login</title>
                </Helmet>
                <div className="login-page">
                    <div className="login-container">
                        <div className="card">
                            <div className="card-content">
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-12 has-text-centered">
                                        <img src={brandImage} width="183" height="63" alt={"TraderBuddy brand"}/>
                                    </div>
                                    <div className="column is-12">
                                        <div className="welcome">
                                            <h5 className="header">
                                                Welcome!
                                            </h5>
                                            <h6 className="sub-header">Please sign-in to continue</h6>
                                        </div>
                                    </div>
                                    <div className="column is-12">
                                        <label htmlFor="email">Email or Username</label>
                                        <input className="input" type="text" placeholder="john.doe@email.com"
                                               value={this.state.email} onChange={this.handleEmailInput}/>
                                    </div>
                                    <div className="column is-12">
                                        <label htmlFor="Name">Password</label>
                                        <input className="input" type="password" placeholder="********"
                                               value={this.state.password} onChange={this.handlePasswordInput}/>
                                        <div className="forgot-password">
                                            <a href="#" className="forgot-password-text">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="column is-12">
                                        <button
                                            className={"button is-primary is-fullwidth" + (this.context.isLoading ? ' is-loading ' : '')}
                                            type="submit"
                                            onClick={() => this.context.loginUser(this.state.username, this.state.password)}>
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="column is-12 has-text-centered">
                                        <div className="register">
                                            <p className="">New here?&nbsp;
                                                <a href="#" className="value">Create an account</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}