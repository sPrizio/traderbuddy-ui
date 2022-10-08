import React, {Component} from "react";

export default class NavbarComponent extends Component {

    render() {
        return (
            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#" onClick={() => this.props.pageChangeHandler('home')}>
                            <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" alt="Bulma Logo" />
                        </a>

                        <a href="#" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                           data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a href="#" className="navbar-item" onClick={() => this.props.pageChangeHandler('summary')}>Summary</a>
                            <a href="#" className="navbar-item" onClick={() => this.props.pageChangeHandler('planning')}>Planning & Forecasting</a>
                            <a href="#" className="navbar-item" onClick={() => this.props.pageChangeHandler('retro')}>Retrospectives</a>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a href="#" className="navbar-link">More</a>

                                <div className="navbar-dropdown">
                                    <a href="#" className="navbar-item">About</a>
                                    <a href="#" className="navbar-item">Contact</a>
                                    <hr className="navbar-divider" />
                                    <a href="#" className="navbar-item">Report an issue</a>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a href="#" className="button is-light">
                                        Sign Up
                                    </a>
                                    <a href="#" className="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}