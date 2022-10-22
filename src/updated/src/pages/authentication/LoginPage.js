import React, {Component} from "react";

export default class LoginPage extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="card">
                        <div className="card-content">
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <div className="column is-12 has-text-centered">
                                    <img src="https://bulma.io/images/bulma-logo.png" width="150" height="28"
                                         alt={"Navbar brand"}/>
                                </div>
                                <div className="column is-12">
                                    <div className="welcome">
                                        <h5 className="header">
                                            Welcome to TraderBuddy
                                        </h5>
                                        <h6 className="sub-header">Please sign-in to continue</h6>
                                    </div>
                                </div>
                                <div className="column is-12">
                                    <label htmlFor="email">Email or Username</label>
                                    <input className="input" type="text" placeholder="john.doe@email.com"/>
                                </div>
                                <div className="column is-12">
                                    <label htmlFor="Name">Password</label>
                                    <input className="input" type="password" placeholder="********"/>
                                    <div className="forgot-password">
                                        <a href="#" className="forgot-password-text">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="column is-12">
                                    <button className="button is-primary is-fullwidth" type="submit">Sign In</button>
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
        );
    }
}