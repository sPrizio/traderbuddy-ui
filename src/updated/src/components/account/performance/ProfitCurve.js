import React, {Component} from "react";
import {Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";
import {formatNumberForDisplay} from "../../../service/FormattingService";
import {CoreConstants} from "../../../constants/coreConstants";
import ProfitCurveLoader from "../../loader/account/ProfitCurveLoader";

export default class ProfitCurve extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            curveData: []
        }
    }


    //  GENERAL FUNCTIONS

    formatYAxisTicks(value) {

        if (value >= 1000) {
            return (value / 1000.0) + 'K'
        } else if (value >= 1000000) {
            return (value / 1000000.0) + 'M'
        }

        return value
    }

    async getData() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.EquityCurve
                    .replace('{start}', moment().subtract(this.props.count, 'months').startOf('month').format('YYYY-MM-DD'))
                    .replace('{end}', moment().add(1, 'months').startOf('month').add(1, 'days').format('YYYY-MM-DD'))
                    .replace('{interval}', 'MONTHLY')
            )

            const data = await response.json()
            if (data.data) {
                const filtered = []
                data.data.forEach((item) => {
                    filtered.push({
                        name: item.date,
                        amt: item.value
                    })
                })

                this.setState({
                    curveData: filtered,
                })
            }
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }


    //  RENDER FUNCTION

    render() {
        let loader = null
        if (this.state.isLoading) {
            loader = <ProfitCurveLoader isLoading={this.state.isLoading} />
        }

        return (
            <div className="profit-curve">
                <div className="card">
                    <div className="card-content">
                        {loader}
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">Account Growth</h5>
                            <h6 className="sub-header">Last {this.props.count} months</h6>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={245}>
                                    <ComposedChart data={this.state.curveData}>
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
                                        <Area type="monotone" name="Value" dataKey="amt" stroke="#696CFF" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getData()
    }
}