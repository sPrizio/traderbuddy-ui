import React, {Component} from "react";
import moment from "moment";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";

export default class RetrospectiveComponent extends Component {


    //  GENERAL FUNCTIONS

    computeDateFormat() {
        switch (this.props.retro.intervalFrequency) {
            case 'DAILY':
            case 'WEEKLY':
                return 'MMMM Do'
            case 'MONTHLY':
                return 'MMMM YYYY'
            case 'YEARLY':
                return 'YYYY'
            default:
                return ''
        }
    }

    computeVerbiage() {
        switch (this.props.retro.intervalFrequency) {
            case 'DAILY':
                return 'Day in Review'
            case 'WEEKLY':
                return 'Week in Review'
            case 'MONTHLY':
                return 'Month in Review'
            case 'YEARLY':
                return 'Year in Review'
            default:
                return 'Review'
        }
    }


    //  RENDER FUNCTION

    render() {
        let dateDisplay;
        if (this.props.retro.intervalFrequency === 'WEEKLY') {
            dateDisplay = moment(this.props.retro.startDate).format(this.computeDateFormat()) + ' - ' + moment(this.props.retro.endDate).format(this.computeDateFormat())
        } else {
            dateDisplay = moment(this.props.retro.startDate).format(this.computeDateFormat())
        }

        return (
            <div className="box box-border-blue">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <h2 className="is-size-5">{this.computeVerbiage()}</h2>
                                <h6 className="is-size-7">
                                    {dateDisplay}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="level-right">
                        <div className="level-item">
                            <button className="button" onClick={() => this.props.editHandler(this.props.retro.startDate, this.props.retro.endDate, this.props.retro.intervalFrequency)}>
                                <span className="icon is-size-4">
                                    <AiFillEdit />
                                </span>
                            </button>
                        </div>
                        <div className="level-item">
                            <button className="button">
                                <span className="icon is-size-4">
                                    <AiFillDelete/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="card-hr"/>
                <div className="content">
                    {
                        this.props.retro.points ?
                            <blockquote>
                                This would contain any key notes or important takeaways from the time period.<br/>
                                Each new element would probably be separated into individual lines?<br/>
                                br tags look nicer than p tags since the spacing isn't as excessive<br />
                                {
                                    this.props.retro.points.map((item, key) => {
                                        if (item.keyPoint) {
                                            return <p key={key}>{item.entryText}</p>
                                        }
                                    })
                                }
                            </blockquote>
                            :
                            null
                    }
                    <ul className="retro-list">
                        {
                            this.props.retro.points ?
                                this.props.retro.points.map((item, key) => {
                                    if (!item.keyPoint) {
                                        return <li key={key}>{item.entryText}</li>
                                    }
                                })
                                :
                                <p>Add some reflection points to this retrospective!</p>
                        }
                    </ul>
                </div>
                <hr className="card-hr"/>
                <div className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Trades</p>
                            <p className="subtitle">54</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Trading Rate</p>
                            <p className="subtitle">10.58</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Win%</p>
                            <p className="subtitle">58</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Net Profit</p>
                            <p className="subtitle">108.65</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Average Gain</p>
                            <p className="subtitle">1.55%</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}