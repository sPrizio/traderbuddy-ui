import React, {Component} from "react";
import {FiSettings} from "react-icons/fi";
import {FaUserCircle} from "react-icons/fa";
import brandImageMinimal from '../../assets/images/brand/logo_minimal.png'
import FileImportModal from "../data/FileImportModal";
import {HiUpload} from "react-icons/hi";

export default class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobileActive: false,
            isModalActive: false
        }

        this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }


    //  HANDLER FUNCTIONS

    toggleMobileMenu() {
        this.setState({isMobileActive: !this.state.isMobileActive})
    }

    toggleModal() {
        this.setState({isModalActive: !this.state.isModalActive})
    }


    //  RENDER FUNCTION

    render() {
        return (
            <nav className="navbar is-spaced" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="image brand is-48x48" onClick={() => this.props.pageChangeHandler('home')}>
                            <img src={brandImageMinimal} alt={'TraderBuddy Logo'} />
                        </a>

                        <a role="button" className={"navbar-burger" + (this.state.isMobileActive ? ' is-active ' : '')} aria-label="menu" aria-expanded="false" onClick={this.toggleMobileMenu}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className={"navbar-menu" + (this.state.isMobileActive ? ' is-active ' : '')}>
                        <div className="navbar-start">
                            <a className="navbar-item" onClick={() => this.props.pageChangeHandler('history')}>Trade History</a>
                            {/*<a className="navbar-item" onClick={() => this.props.pageChangeHandler('forecasting')}>Forecasting</a>*/}
                            <a className="navbar-item" onClick={() => this.props.pageChangeHandler('analysis')}>Analysis</a>
                            <a className="navbar-item" onClick={() => this.props.pageChangeHandler('retrospectives')}>Retrospectives</a>

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
                            <div className="navbar-item hoverable" onClick={this.toggleModal}>
                                <span className="icon is-size-4">
                                    <HiUpload />
                                </span>
                            </div>
                            <div className="navbar-item hoverable">
                                <span className="icon is-size-4">
                                    <FiSettings />
                                </span>
                            </div>
                            <div className="navbar-item hoverable">
                                <span className="icon is-size-4">
                                    <FaUserCircle />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <FileImportModal
                    active={this.state.isModalActive}
                    closeHandler={this.toggleModal}
                />
            </nav>
        );
    }
}