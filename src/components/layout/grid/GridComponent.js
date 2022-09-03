import React, {Component} from "react";
import GridTradeComponent from "./GridTradeComponent";
import TradesListComponent from "../../trades/overview/TradesListComponent";
import moment from "moment/moment";

export default class GridDailyComponent extends Component {

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

    computeOffset() {
        const date = moment(this.props.record.date).day()

        if (this.props.index === 0) {
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


    //  RENDER FUNCTION

    render() {
        let modal
        if (this.state.toggleTradeList) {
            modal = <TradesListComponent active={this.state.toggleTradeList} closeHandler={this.closeModal} date={this.state.listTradeDate} dateFormat={this.computeDateFormat()} interval={this.state.interval} disregardHandler={this.disregardTrade} />
        } else {
            modal = null
        }

        return (
            <div className="grid-view">
                <div className="columns is-multiline">
                    {
                        this.props.records.map((item, key) => {
                            return (
                                <GridTradeComponent key={key} index={key} record={item}
                                                    listHandler={this.toggleTradeListView}
                                                    interval={'daily'} offset={this.computeOffset()}
                                                    columnSize={'column is-2'}
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
