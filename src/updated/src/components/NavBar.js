import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import {FaUserCircle} from "react-icons/fa";

export default class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobileActive: false
        }

        this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    }


    //  HANDLER FUNCTIONS

    toggleMobileMenu() {
        this.setState({isMobileActive: !this.state.isMobileActive})
    }


    //  RENDER FUNCTION

    render() {
        return (
            <nav className="navbar is-spaced" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"
                                 alt={"Navbar brand"}/>
                        </a>

                        <a role="button" className={"navbar-burger" + (this.state.isMobileActive ? ' is-active ' : '')} aria-label="menu" aria-expanded="false" onClick={this.toggleMobileMenu}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className={"navbar-menu" + (this.state.isMobileActive ? ' is-active ' : '')}>
                        <div className="navbar-start">
                            <a className="navbar-item">Trade History</a>
                            <a className="navbar-item">Forecasting</a>
                            <a className="navbar-item">Retrospectives</a>

                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">More</a>
                                <div className="navbar-dropdown">
                                    <a className="navbar-item">About TraderBuddy</a>
                                    <a className="navbar-item">Contact Us</a>
                                    <hr className="navbar-divider"/>
                                    <a className="navbar-item">Report an issue</a>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <span className="icon is-size-4">
                                    <FiSettings />
                                </span>
                            </div>
                            <div className="navbar-item">
                                <span className="icon is-size-4">
                                    <FaUserCircle />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}