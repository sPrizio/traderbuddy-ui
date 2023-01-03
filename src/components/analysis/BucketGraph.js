import React, {Component} from "react";
import {CoreConstants} from "../../constants/coreConstants";
import {
    Bar,
    CartesianGrid, Cell,
    ComposedChart,
    ErrorBar,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import moment from "moment/moment";
import {formatNumberForDisplay} from "../../service/FormattingService";

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
            <div className="performance-statistics">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile is-gapless">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Time</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{moment(payload[0].payload.start, 'HH:mm:ss').format(CoreConstants.DateTime.ISOShortTimeFormat)}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Win&nbsp;%</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{payload[0].payload.winPercentage}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Wins</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{payload[0].payload.winningTrades}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Losses</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{payload[0].payload.losingTrades}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">Pips</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{formatNumberForDisplay(payload[0].payload.pips)}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="row-entry-small">P&L</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="row-entry-small">{formatNumberForDisplay(payload[0].payload.netProfit)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default class BucketGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            bucket: []
        }
    }


    //  GENERAL FUNCTIONS

    computeFill(val, isLoser) {
        if (isLoser && val.winPercentage > 50) {
            return CoreConstants.CssConstants.FadedBarColor
        } else if (isLoser && val.winPercentage < 50) {
            return CoreConstants.CssConstants.RedBarColor
        }

        if (!isLoser && val.winPercentage > 50) {
            return CoreConstants.CssConstants.GreenBarColor
        } else if (!isLoser && val.winPercentage < 50) {
            return CoreConstants.CssConstants.FadedBarColor
        }

        return CoreConstants.CssConstants.NeutralBarColor
    }

    async getBucket() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Analysis.Bucket
                    .replace('{start}', this.props.start)
                    .replace('{end}', this.props.end)
                    .replace('{bucket}', this.props.code)
            )

            const data = await response.json()
            if (data.data) {
                this.setState({
                    bucket: data.data,
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
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <div className={"" + (this.state.isLoading ? ' no-show ' : '')}>
                            <h5 className="header">Profitability</h5>
                            <h6 className="sub-header">5 minute interval</h6>
                        </div>
                        <br/>
                        <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={this.state.bucket}>
                                <CartesianGrid horizontal={false} vertical={false}/>
                                <XAxis dataKey="start"
                                       tickFormatter={(value) => moment(value, 'H:mm').format(CoreConstants.DateTime.ISOShortTimeFormat)}/>
                                <YAxis/>
                                <Tooltip content={CustomTooltip}/>
                                <Bar dataKey="winningTrades" stackId="1">
                                    {
                                        this.state.bucket.map((entry, index) => (
                                            <Cell fill={this.computeFill(entry, false)} key={`cell-${index}`}/>
                                        ))
                                    }
                                </Bar>
                                <Bar dataKey="losingTrades" stackId="1">
                                    {
                                        this.state.bucket.map((entry, index) => (
                                            <Cell fill={this.computeFill(entry, true)} key={`cell-${index}`}/>
                                        ))
                                    }
                                </Bar>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getBucket()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.start !== this.props.start) {
            await this.getBucket()
        }
    }
}