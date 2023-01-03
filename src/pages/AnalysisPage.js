import React, {Component} from "react";
import {Helmet} from "react-helmet";
import TopTrades from "../components/analysis/TopTrades";
import AverageValues from "../components/analysis/AverageValues";
import moment from "moment";
import {CoreConstants} from "../constants/coreConstants";
import BucketGraph from "../components/analysis/BucketGraph";

export default class AnalysisPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeMonths: [],
            activeYears: [],
            currentMonth: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            currentYear: moment().startOf('year').format(CoreConstants.DateTime.ISODateFormat),
            start: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            end: moment().add(1, 'months').startOf('month').format(CoreConstants.DateTime.ISODateFormat),
        }

        this.handleMonthChange = this.handleMonthChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleMonthChange(e) {
        this.setState({
            currentMonth: e.target.value,
        })
    }

    handleYearChange(e) {
        this.setState({
            currentYear: e.target.value,
        }, () => this.getActiveMonths())
    }

    handleSubmit() {
        this.setState({
            start: moment(this.state.currentMonth).format(CoreConstants.DateTime.ISODateFormat),
            end: moment(this.state.currentMonth).add(1, 'months').format(CoreConstants.DateTime.ISODateFormat),
        })
    }


    //  GENERAL FUNCTIONS

    async getActiveMonths() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.ActiveMonths
                    .replace('{year}', moment(this.state.currentYear).format('YYYY'))
                    .replace('{includeStarterMonth}', 'true')
            )

            const data = await response.json()
            const months = data.data
            const index = months.filter(x => x.active)[0]
            this.setState({
                activeMonths: months,
                currentMonth: moment(this.state.currentYear + '-' + index.month.toLowerCase() + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).format(CoreConstants.DateTime.ISODateFormat)
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }

    async getActiveYears() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.TradeRecord.ActiveYears
            )

            const data = await response.json()
            this.setState({
                activeYears: data.data,
            })
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
            <>
                <Helmet>
                    <title>TraderBuddy | Analysis</title>
                </Helmet>
                <div className="analysis-page">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-offset-8-desktop is-4-desktop is-12-tablet is-12-mobile">
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <div className="select is-fullwidth">
                                        <select value={this.state.currentYear} onChange={this.handleYearChange}>
                                            {
                                                this.state.activeYears && this.state.activeYears.map((item, key) => {
                                                    const val = moment(item)
                                                    return (
                                                        <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                key={key}>
                                                            {val.format(CoreConstants.DateTime.ISOYearFormat)}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="control is-expanded">
                                    <div className="select is-fullwidth">
                                        <select value={this.state.currentMonth} onChange={this.handleMonthChange}>
                                            {
                                                this.state.activeMonths && this.state.activeMonths.map((item, key) => {
                                                    const val = moment(this.state.currentYear + '-' + item.month.toLowerCase() + '-01', CoreConstants.DateTime.ISODateLongMonthFormat)
                                                    return (
                                                        <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                key={key} disabled={!item.active}>
                                                            {val.format(CoreConstants.DateTime.ISOMonthFormat)}
                                                        </option>
                                                    )
                                                })
                                            }
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="control">
                                    <button type="submit" className="button is-primary" onClick={this.handleSubmit}>Apply</button>
                                </div>
                            </div>
                        </div>
                        <div className="column is-12-desktop is-12-tablet is-12-mobile">
                            <BucketGraph start={this.state.start} end={this.state.end} code={'5m'}/>
                        </div>
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <AverageValues isWin={true} start={this.state.start} end={this.state.end}/>
                        </div>
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <AverageValues isWin={false} start={this.state.start} end={this.state.end}/>
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTrades count={5} sortByLosses={false}
                                       start={this.state.start} title={'Pips'}
                                       sort={'PIPS'} end={this.state.end}
                                       dataKey={'pips'}
                            />
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTrades count={5} sortByLosses={true}
                                       start={this.state.start} title={'Pips'}
                                       sort={'PIPS'} end={this.state.end}
                                       dataKey={'pips'}
                            />
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTrades count={5} sortByLosses={false}
                                       start={this.state.start} title={'P&L'}
                                       sort={'NET_PROFIT'} end={this.state.end}
                                       dataKey={'netProfit'}
                            />
                        </div>
                        <div className="column is-3-desktop is-12-tablet is-12-mobile">
                            <TopTrades count={5} sortByLosses={true}
                                       start={this.state.start} title={'P&L'}
                                       sort={'NET_PROFIT'} end={this.state.end}
                                       dataKey={'netProfit'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getActiveYears()
        await this.getActiveMonths()

    }
}