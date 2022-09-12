import React, {Component} from "react";
import HeroComponent from "../components/layout/HeroComponent";
import moment from "moment";

export default class TradingPlanPage extends Component {

    static forecastUrl = 'http://localhost:8080/api/v1/trading-plans/forecast'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            forecast: [],
            interval: 'MONTHLY',
            startDate: moment().startOf('month').format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment().add(1, 'months').startOf('month').format('YYYY-MM-DDTHH:mm:ss')
        }
    }


    //  GENERAL FUNCTIONS

    async forecast() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(TradingPlanPage.forecastUrl)
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
                    {
                        this.state.forecast.map((item, key) => {
                            return <p>{item.startDate} | {item.earnings} | {item.balance}</p>
                        })
                    }
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.forecast()
    }
}
