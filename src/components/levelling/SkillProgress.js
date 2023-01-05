import React, {Component} from "react";
import {HiOutlineChevronDoubleDown, HiOutlineChevronDoubleUp} from "react-icons/hi";

export default class SkillProgress extends Component {


    //  GENERAL FUNCTIONS

    computeClass() {
        return this.props.overview.skill.delta >= 0 ? ' positive ' : ' negative '
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="skill-progress">
                <div className="card">
                    <div className="card-content">
                        <h5 className="header">Skill</h5>
                        <div className="container">
                            <div className="columns is-multiline is-mobile is-gapless">
                                <div className="column is-12">
                                    <nav className="level is-mobile">
                                        <div className="level-left">
                                            <div className="level-item">
                                                <p className="sub-header">Level {this.props.overview.skill.level}</p>
                                            </div>
                                        </div>
                                        <div className="level-right">
                                            <div className="level-item">
                                                <div className="has-text-right">
                                                    <span className="icon-text net">
                                                <span className={"icon " + (this.computeClass())}>
                                                    {
                                                        this.props.overview.skill.delta >= 0 ?
                                                            <HiOutlineChevronDoubleUp/> :
                                                            <HiOutlineChevronDoubleDown/>
                                                    }
                                                </span>
                                                <span className={this.computeClass()}>
                                                    {this.props.overview.skill.delta}
                                                </span>
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                                <div className="column is-12">
                                    <progress className="progress is-primary" value={this.props.overview.skill.points} max={this.props.overview.skill.stepIncrement} />
                                </div>
                                <div className="column is-12">
                                    <nav className="level is-mobile">
                                        <div className="level-left">
                                            <div className="level-item">
                                                <p className="sub-header">Current: {this.props.overview.skill.points}</p>
                                            </div>
                                        </div>
                                        <div className="level-right">
                                            <div className="level-item">
                                                <div className="has-text-right">
                                                    <p className="sub-header">Remaining: 86</p>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}