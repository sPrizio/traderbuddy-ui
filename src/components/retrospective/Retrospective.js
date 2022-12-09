import React, {Component} from "react";
import {AiFillDelete, AiFillEdit, AiFillRightCircle} from "react-icons/ai";
import {RiAlarmWarningLine} from "react-icons/ri";
import {formatNumberForDisplay} from "../../service/FormattingService";
import RetrospectiveLoader from "../loader/retrospective/RetrospectiveLoader";
import moment from "moment";
import {CoreConstants} from "../../constants/coreConstants";

export default class Retrospective extends Component {


    //  GENERAL FUNCTIONS

    getDate() {
        if (this.props.retro && this.props.retro.startDate && this.props.retro.endDate) {

            if (this.props.interval === 'WEEKLY') {
                return moment(this.props.retro.startDate).format(CoreConstants.DateTime.ISOMonthDayFormat) + ' - ' + moment(this.props.retro.endDate).format(CoreConstants.DateTime.ISOMonthDayFormat)
            } else if (this.props.interval === 'DAILY') {
                return moment(this.props.retro.startDate).format(CoreConstants.DateTime.ISOMonthDayFormat)
            } else if (this.props.interval === 'YEARLY') {
                return moment(this.props.retro.startDate).format(CoreConstants.DateTime.ISOYearFormat)
            } else {
                return moment(this.props.retro.startDate).format(CoreConstants.DateTime.ISOMonthYearFormat)
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
        if (this.props.showTotals && this.props.retro && this.props.retro.totals && this.props.retro.totals.statistics) {
            totals =
                <div>
                    <hr />
                    <div className="columns is-multiline is-mobile has-text-centered">
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Trades</p>
                                <p className="value">{this.props.retro.totals.statistics.numberOfTrades}</p>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Trading Rate</p>
                                <p className="value">{formatNumberForDisplay(this.props.retro.totals.statistics.tradingRate)}</p>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Win %</p>
                                <p className="value">{this.props.retro.totals.statistics.winPercentage}</p>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Net Profit</p>
                                <p className="value">{formatNumberForDisplay(this.props.retro.totals.statistics.netProfit)}</p>
                            </div>
                        </div>

                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Wins</p>
                                <p className="value">{this.props.retro.totals.statistics.numberOfWinningTrades}</p>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Average Win</p>
                                <p className="value">{formatNumberForDisplay(this.props.retro.totals.statistics.averageWinAmount)}</p>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Largest Win</p>
                                <p className="value">{this.props.retro.totals.statistics.largestWinAmount}</p>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div>
                                <p className="sub-header">Gross Gain</p>
                                <p className="value">{formatNumberForDisplay(this.props.retro.totals.statistics.grossWinAmount)}</p>
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
                            <div className="level">
                                <div className="level-left">
                                    <div className="level-item">
                                        <div>
                                            <h5 className="header">Retrospective</h5>
                                            <h6 className="sub-header">{this.getDate()}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className={"level-right" + (this.props.showCrud ? '' : ' no-show ')}>
                                    <div className="level-item">
                                        <button className="button" onClick={() => this.props.editHandler(this.props.retro.uid)}>
                                            <span className="icon is-size-4">
                                                <AiFillEdit />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="level-item">
                                        <button className="button" onClick={() => this.props.deleteHandler(this.props.retro.uid)}>
                                            <span className="icon is-size-4">
                                                <AiFillDelete/>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

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