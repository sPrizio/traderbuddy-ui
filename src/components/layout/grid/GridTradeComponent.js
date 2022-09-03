import React, {Component} from "react";
import Moment from "react-moment";
import moment from "moment";
import {CgCheckO} from "react-icons/cg";
import {TiDeleteOutline} from "react-icons/ti";

export default class GridTradeComponent extends Component {


    //  GENERAL FUNCTIONS

    formatDate(value) {
        switch (this.props.interval) {
            case 'weekly':
                return <span><Moment format='MMM D'>{value}</Moment>-<Moment format='D' add={{days: 6}}>{value}</Moment></span>
            case 'monthly':
                return <span><Moment format="MMMM yyyy">{value}</Moment></span>
            case 'yearly':
                return <span><Moment format="yyyy">{value}</Moment></span>
            default:
                return <span><Moment format="MMMM Do">{value}</Moment></span>
        }
    }


    //  RENDER FUNCTION

    render() {
        let iconDisplay = null;
        if (this.props.record.netProfit > 0) {
            iconDisplay = <span className={"positive-profit"}><CgCheckO/></span>
        } else if (this.props.record.netProfit < 0) {
            iconDisplay = <span className={"negative-profit"}><TiDeleteOutline /></span>
        }


        if (this.props.record.weekend) {
            return null
        } else {
            return (
                <div className={this.props.columnSize + ' ' + this.props.offset}>
                    <div className={"box " + (this.props.record.empty ? ' opacity-35' : ' hoverable ')} onClick={this.props.record.empty ? undefined : () => this.props.listHandler(this.props.record.date)}>
                        <div className="level grid-trade-border">
                            <div className="level-left">
                                <div className="level-item">
                                    <h6 className="is-size-7">
                                        {this.formatDate(this.props.record.date)}&nbsp;
                                    </h6>
                                </div>
                            </div>

                            <div className="level-right">
                                <p className="level-item is-size-5">
                                    {iconDisplay}
                                </p>
                            </div>
                        </div>
                        <div className="level">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Trades</p>
                                    <p className="">{this.props.record.numberOfTrades}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Win%</p>
                                    <p className="">{this.props.record.winPercentage}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Profit</p>
                                    <p className="">{this.props.record.netProfit}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
