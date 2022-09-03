import React, {Component} from "react";
import {RiCopyrightLine} from "react-icons/ri";

export default class FooterComponent extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>TraderBuddy</strong> by <a href="https://www.google.ca">Stephen Prizio</a>.<br/>
                        <span className="icon-text">
                            <span>TraderBuddy</span>
                            <span className="icon"><RiCopyrightLine/></span>
                        </span>
                        &nbsp;2022 All Rights Reserved.
                    </p>
                </div>
            </footer>
        );
    }
}
