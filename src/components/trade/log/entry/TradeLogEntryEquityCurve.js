import React, {Component} from "react";
import {Area, CartesianGrid, ComposedChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {CoreConstants} from "../../../../constants/coreConstants";

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


    //  RENDER FUNCTIONS

    render() {
        return (
            <div>
                <ResponsiveContainer width="100%" height={125}>
                    <ComposedChart data={this.props.points}>
                        <defs>
                            <linearGradient id={"split_" + this.props.index} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={CoreConstants.CssConstants.EquityCurveGreen} stopOpacity={0.75} />
                                <stop offset={this.computeGradientOffset()} stopColor={CoreConstants.CssConstants.White} stopOpacity={0.75} />
                                <stop offset="100%" stopColor={CoreConstants.CssConstants.EquityCurveRed} stopOpacity={0.75} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid horizontal={false} vertical={false}/>
                        <XAxis hide={true} dataKey="name" tickLine={false} tickFormatter={value => ''}/>
                        <YAxis hide={true} tickLine={false} tickFormatter={(value) => ''}
                        />
                        <ReferenceLine
                            y={0}
                            stroke={"rgba(215, 215, 215, 0.5)"}
                            /*label={{position: 'insideTopRight', value: 'Break-even', fill: 'red', fontSize: 10}}*/
                        />
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