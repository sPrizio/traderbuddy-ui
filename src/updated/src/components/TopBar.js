import React, {Component} from "react";
import {FaUserCircle} from "react-icons/fa";
import {FiSettings} from "react-icons/fi";
import {AiOutlineSearch} from "react-icons/ai";

export default class TopBar extends Component {


    //  RENDER FUNCTION

    render() {
        return (
            <div className="top-bar">
                <div className="card">
                    <div className="card-content">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <div className="field">
                                        <p className="control has-icons-left has-icons-right">
                                            <input className="input is-rounded" type="text" placeholder="Search" />
                                                <span className="icon is-small is-left">
                                                  <AiOutlineSearch />
                                                </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <span className="icon is-size-4">
                                        <FiSettings />
                                    </span>
                                </div>
                                <div className="level-item">
                                    <span className="icon is-size-4">
                                        <FaUserCircle />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}