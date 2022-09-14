import React, {Component} from "react";
import HeroComponent from "../components/layout/HeroComponent";
import ForecastComponent from "../components/layout/forecast/ForecastComponent";
import moment from "moment";

export default class TradingPlanPage extends Component {

    static forecastUrl = 'http://localhost:8080/api/v1/trading-plans/forecast'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            forecast: [],
            forecastTotals: {},
            interval: 'MONTHLY',
            begin: moment().startOf('year').format('YYYY-MM-DD'),
            limit: moment().startOf('year').add(1, 'years').format('YYYY-MM-DD')
        }

        this.handleForecastIntervalChange = this.handleForecastIntervalChange.bind(this);
    }


    //  HANDLER FUNCTIONS

    handleForecastIntervalChange(val) {

        switch (val) {
            case 'Daily':
                this.setState({
                    interval: val.toUpperCase(),
                    begin: moment().startOf('month').format('YYYY-MM-DD'),
                    limit: moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')
                }, () => this.forecast())
                break
            case 'Weekly':
                this.setState({
                    interval: val.toUpperCase(),
                    begin: moment().startOf('month').format('YYYY-MM-DD'),
                    limit: moment().startOf('month').add(3, 'months').format('YYYY-MM-DD')
                }, () => this.forecast())
                break
            default:
                this.setState({
                    interval: val.toUpperCase(),
                    begin: moment().startOf('year').format('YYYY-MM-DD'),
                    limit: moment().startOf('year').add(1, 'years').format('YYYY-MM-DD')
                }, () => this.forecast())
                break
        }
    }


    //  GENERAL FUNCTIONS

    async forecast() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(TradingPlanPage.forecastUrl + '?interval=' + this.state.interval + '&begin=' + this.state.begin + '&limit=' + this.state.limit)
            const data = await response.json()

            this.setState({
                isLoading: false,
                forecast: data.data.entries,
                forecastTotals: data.data.statistics
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="min-height-for-footer">
                <HeroComponent title={"Trade Planner"} subtitle={"Forecast and plan your trading days"}/>
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <ForecastComponent selectedDate={moment().format('YYYY-MM-DD')}
                                               interval={this.state.interval} data={this.state.forecast}
                                               totals={this.state.forecastTotals}
                                               intervalChangeHandler={this.handleForecastIntervalChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.forecast()
    }
}
