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
            interval: 'MONTHLY',
            begin: moment().startOf('year').format('YYYY-MM-DD'),
            limit: moment().startOf('year').add(1, 'years').format('YYYY-MM-DD')
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
                forecast: data.data
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div>
                <HeroComponent title={"Trade Planner"} subtitle={"Forecast and plan your trading days"} />
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <ForecastComponent selectedDate={moment().format('YYYY-MM-DD')} interval={this.state.interval} data={this.state.forecast} />
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
