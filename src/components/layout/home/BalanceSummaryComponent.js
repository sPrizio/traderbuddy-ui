import React, {Component} from "react";
import {PieChart, Pie, Sector, ResponsiveContainer, Cell} from 'recharts';

const data = [
    { name: 'Group A', value: 49 },
    { name: 'Group B', value: 38 },
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, percent, value, fill } = props;
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
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#3e8ed0"}>
                Win%
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
                fill={"rgba(62, 142, 208, 0.45)"}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"rgba(62, 142, 208, 0.45)"} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={"rgba(62, 142, 208, 0.45)"} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Trades`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(0)}%)`}
            </text>
        </g>
    );
};

export default class BalanceSummaryComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }
    }


    //  GENERAL FUNCTIONS

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };


    //  RENDER FUNCTION

    render() {
        return (
            <div className="box box-border-turquoise">
                <h2 className="is-size-5">Performance Summary</h2>
                <h6 className="is-size-6-half">October 2022</h6>
                <hr className="card-hr"/>
                <div className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading hidden">Tweets</p>
                            <p className="is-size-6">October 2022</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Trades</p>
                            <p className="is-size-6">87</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Win%</p>
                            <p className="is-size-6">56</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Net Profit</p>
                            <p className="is-size-6">789.64</p>
                        </div>
                    </div>
                </div>
                <hr className="card-hr"/>
                <div className="columns is-multiline">
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <p>Average Win: 25 Units</p>
                        <p>Biggest Win: 67 Units</p>
                        <p>Average Loss: 16 Units</p>
                        <p>Biggest Loss: 48 Units</p>
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    activeIndex={this.state.activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill={"#000"}
                                    dataKey="value"
                                    onMouseEnter={this.onPieEnter}
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={index === 1 ? "rgba(235, 15, 41, 0.45)" : "rgba(0, 135, 60, 0.45)"}/>
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
}