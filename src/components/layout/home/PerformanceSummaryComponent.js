import React, {Component} from "react";
import {PieChart, Pie, Sector, ResponsiveContainer, Cell} from 'recharts';
import moment from "moment";
import {getDomain} from "../../../services/ConfigurationService";

export default class PerformanceSummaryComponent extends Component {

    static fetchMonthlyStatsUrl = getDomain() + '/trade-summary/monthly-stats'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeIndex: 0,
            activeIndexText: 'Wins',
            startDate: moment().startOf('month'),
            performanceSummary: {},
            winPercentagePieData: []
        }

        this.renderActiveShape = this.renderActiveShape.bind(this)
    }


    //  GENERAL FUNCTIONS

    renderActiveShape(props) {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, percent, /*value,*/ fill } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={this.state.activeIndex === 0 ? "rgba(0, 135, 60, 0.75)" : "rgba(235, 15, 41, 0.60)"}>
                    {this.state.activeIndexText}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={"rgba(62, 142, 208, 0.75)"}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"rgba(62, 142, 208, 0.75)"} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={"rgba(62, 142, 208, 0.75)"} stroke="none" />
                {/*<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fontSize={13} fill={"rgba(62, 142, 208, 1.0)"}>
                    {`${value}`}&nbsp;{this.state.activeIndexText}
                </text>*/}
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dx={this.state.activeIndex === 0 ? 6 : -6} dy={5} textAnchor={textAnchor} fill={"rgba(62, 142, 208, 1.0)"} fontSize={13}>
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        );
    }

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
            activeIndexText: index === 0 ? this.state.winPercentagePieData[index].value + ' Wins' : this.state.winPercentagePieData[index].value + ' Losses'
        });
    };

    async getMonthlyStats() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(PerformanceSummaryComponent.fetchMonthlyStatsUrl + '?month=' + this.state.startDate.format('MMMM') + '&year=' + this.state.startDate.year())
            const data = await response.json()

            this.setState({
                isLoading: false,
                performanceSummary: data.data,
                winPercentagePieData: [
                    { name: 'Winning Trades', value: data.data.totalNumberOfWinningTrades },
                    { name: 'Losing Trades', value: data.data.totalNumberOfLosingTrades }
                ],
            }, () => {
                this.setState({
                    activeIndexText: this.state.activeIndex === 0 ? this.state.winPercentagePieData[this.state.activeIndex].value + ' Wins' : this.state.winPercentagePieData[this.state.activeIndex].value + ' Losses'
                })
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="box box-border-turquoise">
                <h2 className="is-size-5">Performance Summary</h2>
                <h6 className="is-size-6-half">{this.state.startDate.format('MMMM YYYY')}</h6>
                <hr className="card-hr"/>
                <div className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Trades</p>
                            <p className="is-size-6">{this.state.performanceSummary.totalNumberOfTrades}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Trading Rate</p>
                            <p className="is-size-6">
                                {this.state.performanceSummary.tradingRate}&nbsp;
                            </p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">AVG Win%</p>
                            <p className="is-size-6">{this.state.performanceSummary.averageWinPercentage}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Net Profit</p>
                            <p className="is-size-6">{this.state.performanceSummary.netProfit}</p>
                        </div>
                    </div>
                </div>
                <hr className="card-hr"/>
                <div className="columns is-multiline">
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <table className="table is-striped is-fullwidth">
                            <tbody>
                            <tr>
                                <td className="has-text-left">Average Win</td>
                                <td className="has-text-centered">
                                    25&nbsp;<small><abbr title={"Points or Units, sometimes referred to as Pips."}>pts</abbr></small>
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-left">Biggest Win</td>
                                <td className="has-text-centered">
                                    25&nbsp;<small><abbr title={"Points or Units, sometimes referred to as Pips."}>pts</abbr></small>
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-left">Average Loss</td>
                                <td className="has-text-centered">
                                    25&nbsp;<small><abbr title={"Points or Units, sometimes referred to as Pips."}>pts</abbr></small>
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-left">Biggest Loss</td>
                                <td className="has-text-centered">
                                    25&nbsp;<small><abbr title={"Points or Units, sometimes referred to as Pips."}>pts</abbr></small>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    activeIndex={this.state.activeIndex}
                                    activeShape={this.renderActiveShape}
                                    data={this.state.winPercentagePieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill={"#000"}
                                    dataKey="value"
                                    onMouseEnter={this.onPieEnter}
                                >
                                    {
                                        this.state.winPercentagePieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? "rgba(0, 135, 60, 0.45)" : "rgba(235, 15, 41, 0.45)"}/>
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getMonthlyStats()
    }
}