import React, {Component} from "react";
import {AiFillRightCircle} from "react-icons/ai";
import {RiAlarmWarningLine} from "react-icons/ri";
import {formatNumberForDisplay} from "../../service/FormattingService";
import RetrospectiveLoader from "../loader/retrospective/RetrospectiveLoader";
import moment from "moment";

export default class Retrospective extends Component {


    //  GENERAL FUNCTIONS

    getDate() {
        if (this.props.retro && this.props.retro.startDate && this.props.retro.endDate) {

            if (this.props.interval === 'WEEKLY') {
                return moment(this.props.retro.startDate).format('MMMM Do') + ' - ' + moment(this.props.retro.endDate).format('Do')
            } else if (this.props.interval === 'DAILY') {
                return moment(this.props.retro.startDate).format('MMMM Do')
            } else if (this.props.interval === 'YEARLY') {
                return moment(this.props.retro.startDate).format('YYYY')
            } else {
                return moment(this.props.retro.startDate).format('MMMM YYYY')
            }
        }


        return ''
    }


    //  RENDER FUNCTION

    render() {
        let loader = null
        if (this.props.isLoading) {
            loader = <RetrospectiveLoader count={this.props.count} isLoading={this.props.isLoading} />
        }

        let totals = null
        if (this.props.showTotals) {
            totals =
                <div>
                    <hr />
                    <div className="level is-mobile">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Trades</p>
                                <p className="value">60</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Trading Rate</p>
                                <p className="value">{formatNumberForDisplay(12.00)}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Win %</p>
                                <p className="value">60</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Net Profit</p>
                                <p className="value">${formatNumberForDisplay(222.23)}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="sub-header">Average Gain</p>
                                <p className="value">{formatNumberForDisplay(1.59)}%</p>
                            </div>
                        </div>
                    </div>
                </div>
        }

        const displayKeyPoints = []
        if (this.props.retro && this.props.retro.points) {
            this.props.retro.points.filter(p => p.keyPoint).forEach((item, key) => {
                displayKeyPoints.push(
                    <p key={key}>
                        <span className="icon-text">
                            <span className="icon">
                                <RiAlarmWarningLine/>
                            </span>
                        </span>
                        {item.entryText}
                    </p>
                )
            })
        }

        const displayPoints = []
        if (this.props.retro && this.props.retro.points) {
            this.props.retro.points.filter(p => !p.keyPoint).forEach((item, key) => {
                displayPoints.push(
                    <div className="block" key={key}>
                        <span className="icon-text">
                            <span className="icon">
                                <AiFillRightCircle/>
                            </span>
                        </span>
                        {item.entryText}
                    </div>
                )
            })
        }

        return (
            <div className="retrospective">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.props.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">Retrospective</h5>
                            <h6 className="sub-header">{this.getDate()}</h6>
                            <div className="container">
                                <div className="block">
                                    <div className="message is-primary">
                                        <div className="message-body">
                                            {displayKeyPoints}
                                        </div>
                                    </div>
                                </div>
                                {displayPoints}
                                {totals}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}