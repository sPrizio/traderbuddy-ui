import React, {Component} from "react";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

export default class PerformanceStatisticsEntry extends Component {

    //  GENERAL FUNCTIONS

    computeSentimentClass() {

        if (this.props.delta === 0) {
            return ''
        }

        if (this.props.sentiment === 'positive') {
            if (this.props.delta > 0) {
                return 'positive'
            }

            return 'negative'
        } else {
            if (this.props.delta < 0) {
                return 'positive'
            }

            return 'negative'
        }
    }

    computeSentimentIcon() {

        if (this.props.delta === 0) {
            return null
        }

        if (this.props.sentiment === 'positive') {
            if (this.props.delta > 0) {
                return <AiOutlineArrowUp />
            }

            return <AiOutlineArrowDown />
        } else {
            if (this.props.delta < 0) {
                return <AiOutlineArrowDown />
            }

            return <AiOutlineArrowUp />
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="column is-12 performance-statistics-entry">
                <div className="columns is-multiline is-mobile is-vcentered">
                    <div className="column is-8">
                        <h5 className="row-entry-header">{this.props.label}</h5>
                        <h6 className={"row-entry-small " + (this.computeSentimentClass())}>
                            <span className="icon-text">
                                <span className="icon">
                                    {this.computeSentimentIcon()}
                                </span>
                                <span>{this.props.delta}%</span>
                            </span>
                        </h6>
                    </div>
                    <div className="column is-4 has-text-right">
                        <h5 className="value">{this.props.value}</h5>
                        <h6 className="row-entry-small">{this.props.valuePercentage}&nbsp;pts</h6>
                    </div>
                </div>
            </div>
        );
    }
}