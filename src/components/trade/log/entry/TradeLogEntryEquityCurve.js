import React, {Component} from "react";
import {Area, CartesianGrid, ComposedChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CoreConstants} from "../../../../constants/coreConstants";
import moment from "moment";
import {formatNumberForDisplay} from "../../../../service/FormattingService";

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length && payload.length > 0) {
        return (
            <div className="performance-statistics">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Time:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{moment(payload[0].payload.x).format(CoreConstants.DateTime.ISOShortTimeFormat)}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Pips:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{formatNumberForDisplay(payload[0].payload.y)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default class TradeLogEntryEquityCurve extends Component {

    constructor(props) {
        super(props);

        this.state = {
            offset: this.computeGradientOffset()
        }
    }


    //  GENERAL FUNCTION

    computeGradientOffset() {
        const points = this.props.points
        const min = Math.min(...points.map(i => i.y))
        const max = Math.max(...points.map(i => i.y))
        const ratio = Math.round((max / (Math.abs(min) + max)) * 100.0)

        return ratio + '%'
    }

    computeXAxisLabel(value) {
        return moment(value).format(CoreConstants.DateTime.ISOShortTimeFormat);
    }


    //  RENDER FUNCTIONS

    render() {
        return (
            <div className="graph">
                <ResponsiveContainer width="100%" height={this.props.height}>
                    <ComposedChart data={this.props.points}>
                        <defs>
                            <linearGradient id={"split_" + this.props.index} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={CoreConstants.CssConstants.EquityCurveGreen} stopOpacity={0.75} />
                                <stop offset={this.computeGradientOffset()} stopColor={CoreConstants.CssConstants.White} stopOpacity={0.75} />
                                <stop offset="100%" stopColor={CoreConstants.CssConstants.EquityCurveRed} stopOpacity={0.75} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid horizontal={false} vertical={false}/>
                        <XAxis hide={!this.props.showXAxis} dataKey="x" tickLine={true} tickFormatter={this.computeXAxisLabel} />
                        <YAxis hide={!this.props.showYAxis} tickLine={true} label={{ value: 'Pips', angle: -90, position: 'insideLeft' }} />
                        <ReferenceLine
                            y={0}
                            stroke={"rgba(215, 215, 215, 0.5)"}
                            /*label={{position: 'insideTopRight', value: 'Break-even', fill: 'red', fontSize: 10}}*/
                        />
                        {this.props.showTooltip ? <Tooltip content={CustomTooltip} /> : null}
                        <Area
                            type="monotone"
                            name="Net"
                            dataKey="y"
                            stroke="rgba(105, 108, 255, 0.35)"
                            fillOpacity={1.0}
                            fill={"url(#split_" + this.props.index + ")"}
                            strokeWidth={2}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
}