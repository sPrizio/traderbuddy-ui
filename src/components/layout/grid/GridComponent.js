import React, {Component} from "react";
import GridTradeComponent from "./GridTradeComponent";
import TradesListComponent from "../../trades/overview/TradesListComponent";
import moment from "moment/moment";
import {IoReturnUpBackOutline} from "react-icons/io5";

export default class GridComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toggleTradeList: false,
            listTradeDate: ''
        }

        this.closeModal = this.closeModal.bind(this)
        this.toggleTradeListView = this.toggleTradeListView.bind(this)
    }


    //  HANDLERS

    closeModal() {
        this.setState({toggleTradeList: false})
    }

    toggleTradeListView(val) {
        this.setState({
            toggleTradeList: !this.toggleTradeList,
            listTradeDate: val
        })
    }


    //  GENERAL FUNCTIONS

    computeOffset(d, index) {

        if (this.props.interval === 'weekly') {
            return ''
        }

        let date;
        if (this.props.interval === 'monthly') {
            date = moment(d).month()
            if (index === 0) {
                switch (date) {
                    case 1:
                    case 4:
                    case 7:
                    case 10:
                        return 'is-offset-4-desktop'
                    case 2:
                    case 5:
                    case 8:
                    case 11:
                        return 'is-offset-8-desktop'
                    default:
                        return ''
                }
            } else if (date === 0 || date === 3 || date === 6 || date === 9) {
                return ''
            }
        } else if (this.props.interval === 'daily') {
            date = moment(d).day()
            if (index === 0) {
                switch (date) {
                    case 1:
                        return 'is-offset-1-desktop'
                    case 2:
                        return 'is-offset-3-desktop'
                    case 3:
                        return 'is-offset-5-desktop'
                    case 4:
                        return 'is-offset-7-desktop'
                    case 5:
                        return 'is-offset-9-desktop'
                    default:
                        return ''
                }
            }

            if (date === 1) {
                return 'is-offset-1-desktop'
            }
        }
    }

    computeColumnSize() {
        switch (this.props.interval) {
            case 'weekly':
                return 'column is-3'
            case 'monthly':
                return 'column is-4'
            default:
                return 'column is-2'
        }
    }

    computeDateFormat() {
        switch (this.state.interval) {
            case 'weekly':
            case 'monthly':
                return 'MMMM yyyy'
            case 'yearly':
                return 'yyyy'
            default:
                return 'MMMM Do'
        }
    }


    //  RENDER FUNCTION

    render() {
        let modal = null
        if (this.state.toggleTradeList) {
            modal = <TradesListComponent active={this.state.toggleTradeList} closeHandler={this.closeModal}
                                         date={this.state.listTradeDate} dateFormat={this.computeDateFormat()}
                                         interval={this.state.interval} disregardHandler={this.props.disregardHandler}/>
        }

        let title = null
        if (this.props.interval === 'daily') {
            title = moment(this.props.currentDate).format('MMMM YYYY')
        } else if (this.props.interval === 'monthly') {
            title = moment(this.props.currentDate).format('YYYY')
        }

        let returnButton = null
        if (this.props.interval === 'daily') {
            returnButton =
                <p className="has-text-left is-text-blue has-text-weight-medium back-link-hover"
                   onClick={() => this.props.resetViewHandler('month')}>
                            <span className="icon-text back-link-hover">
                                <span className="icon">
                                    <IoReturnUpBackOutline/>
                                </span>
                                <span className="back-link-hover">Previous Months</span>
                            </span>
                </p>
        } else if (this.props.interval === 'monthly') {
            returnButton =
                <p className="has-text-left is-text-blue has-text-weight-medium back-link-hover"
                   onClick={() => this.props.resetViewHandler('year')}>
                            <span className="icon-text back-link-hover">
                                <span className="icon">
                                    <IoReturnUpBackOutline/>
                                </span>
                                <span className="back-link-hover">Previous Years</span>
                            </span>
                </p>
        }

        let weekDayLabels = null
        if (this.props.interval === 'daily') {
            weekDayLabels =
                <div className="column is-12">
                    <div className="columns is-multiline">
                        <div className="column is-2 is-offset-1-desktop has-text-centered heading">Monday</div>
                        <div className="column is-2 has-text-centered heading">Tuesday</div>
                        <div className="column is-2 has-text-centered heading">Wednesday</div>
                        <div className="column is-2 has-text-centered heading">Thursday</div>
                        <div className="column is-2 has-text-centered heading">Friday</div>
                    </div>
                </div>
        }

        return (
            <div className="grid-view">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-4">
                        {returnButton}
                    </div>
                    <div className="column is-4">
                        <p className="has-text-centered has-text-weight-medium month-heading">
                            {title}
                        </p>
                    </div>
                    <div className="column is-4"/>
                    {weekDayLabels}
                    {
                        this.props.records.map((item, key) => {
                            return (
                                <GridTradeComponent key={key} index={key} record={item}
                                                    listHandler={this.toggleTradeListView}
                                                    interval={this.props.interval}
                                                    offset={this.computeOffset(item.date, key)}
                                                    columnSize={this.computeColumnSize()}
                                                    dateChangeHandler={this.props.dateChangeHandler}
                                />
                            )
                        })
                    }
                </div>
                {modal}
            </div>
        );
    }
}
