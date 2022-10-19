import React, {Component} from "react";
import {Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";
import {formatNumberForDisplay} from "../../service/FormattingService";

const data = [
     {
        "name": "2022-07-01",
        "amt": 12500.07
    }, {
        "name": "2022-08-01",
        "amt": 17099.81
    }, {
        "name": "2022-09-01",
        "amt": 22371.31
    }, {
        "name": "2022-10-01",
        "amt": 30235.63
    }, {
        "name": "2022-11-01",
        "amt": 40198.34
    }, {
        "name": "2022-12-01",
        "amt": 52634.29
    }
]

export default class ProfitCurve extends Component {


    //  GENERAL FUNCTIONS

    formatYAxisTicks(value) {

        if (value >= 1000) {
            return (value / 1000.0) + 'K'
        } else if (value >= 1000000) {
            return (value / 1000000.0) + 'M'
        }

        return value
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="profit-curve">
                <div className="card">
                    <div className="card-content">
                        <h5 className="header">Account Growth</h5>
                        <h6 className="sub-header">Last {this.props.count} months</h6>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={245}>
                                <ComposedChart data={data}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="25%" stopColor="#696CFF" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid horizontal={false} vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickFormatter={(value) => moment(value).format('MMM')}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => this.formatYAxisTicks(value)}
                                    />
                                    <Tooltip
                                        labelFormatter={(value) => moment(value).format('MMMM YYYY')}
                                        formatter={(value) => formatNumberForDisplay(value)}
                                    />
                                    <Area type="monotone" name="Close" dataKey="amt" stroke="#696CFF" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}