import React, {Component} from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {AiFillDelete} from "react-icons/ai";
import moment from "moment/moment";

export default class RetrospectiveModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isInvalidText: false,
            isInvalidDate: false,
            retroData: this.props.newRetro,
            datePicker: [new Date(), new Date()],
            textAreaValue: '',
            keyPoint: false,

        }

        this.handleCheck = this.handleCheck.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleCheck(e) {
        this.setState({keyPoint: e.target.checked})
    }

    handleDateChange(val) {
        if (val.length > 1) {
            const start = moment(val[0])
            const end = moment(val[1])
            this.setState(prevState => ({
                retroData: {
                    ...prevState.retroData,
                    startDate: start.format('YYYY-MM-DD'),
                    endDate: end.format('YYYY-MM-DD')
                },
                datePicker: [start.toDate(), end.toDate()],
                isInvalidDate: false
            }))
        }
    }

    handleSelect(e) {
        this.setState(prevState => ({
            retroData: {
                ...prevState.retroData,
                intervalFrequency: e.target.value
            },
        }))
    }

    handleTextChange(e) {
        this.setState({textAreaValue: e.target.value})
    }


    //  GENERAL FUNCTIONS

    addPoint() {
        if (this.state.textAreaValue.length === 0) {
            this.setState({isInvalidText: true})
        } else {
            const temp = {
                lineNumber: this.state.retroData.points.length + 1,
                entryText: this.state.textAreaValue,
                keyPoint: this.state.keyPoint
            }

            this.setState(prevState => ({
                isInvalidText: false,
                retroData: {
                    ...prevState.retroData,
                    points: [...prevState.retroData.points, temp]
                },
                textAreaValue: '',
                keyPoint: false
            }))
        }
    }

    removePoint(lineNumber) {
        let points = this.state.retroData.points
        points = points.filter(el => el.lineNumber !== lineNumber)
        for (let i = 0; i < points.length; i++) {
            points[i].lineNumber = (i + 1)
        }

        this.setState(prevState => ({
            retroData: {
                ...prevState.retroData,
                points: points
            },
        }))
    }


    //  RENDER FUNCTION

    render() {
        let invalidText
        if (this.state.isInvalidText) {
            invalidText = <small className="has-text-danger">Please add some text to this note.</small>
        } else {
            invalidText = null
        }

        let invalidDate
        if (this.state.isInvalidDate) {
            invalidDate = <p className="has-text-danger">Please select a valid time span</p>
        } else {
            invalidDate = null
        }

        return (
            <div className={"modal " + (this.props.modalActive ? ' is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add a Retrospective</p>
                        <button className="delete" aria-label="close"
                                onClick={() => this.props.toggleModal(this.props.modalActive)}></button>
                    </header>
                    <section className="modal-card-body">
                        <p>
                            Adding a retrospective for a time period is a great way to reflect on your performance
                            and keep track of your evolution. Be sure to include both positive and constructive
                            points. It's important to improve but it is equally important to celebrate those small
                            victories!
                        </p>
                        <br/>

                        <div className="columns is-multiline">
                            <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                <div className="field">
                                    <label className="label">Period Type&nbsp;<small>(Is this a daily, weekly,
                                        monthly or yearly retro?)</small></label>
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.retroData.intervalFrequency} onChange={this.handleSelect}>
                                                <option value={'DAILY'}>Daily</option>
                                                <option value={'WEEKLY'}>Weekly</option>
                                                <option value={'MONTHLY'}>Monthly</option>
                                                <option value={'YEARLY'}>Yearly</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                <div className="field">
                                    <label className="label">Time Period&nbsp;<small>(dd/MM/yyyy)</small></label>
                                    <div className="control">
                                        <DateRangePicker value={this.state.datePicker}
                                                         onChange={this.handleDateChange}
                                                         format={'d/M/yyyy'}
                                        />
                                        {invalidDate}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-12">
                                <div className="field">
                                    <label className="label">
                                        Notes&nbsp;<small>(Add multiple notes! Each line entry will be represented
                                        as a bullet-style point in the retrospective section)</small>
                                    </label>
                                </div>
                                <div className="columns is-multiline is-vcentered">
                                    <div className="column is-9">
                                        <div className="field">
                                            <div className="control">
                                                    <textarea
                                                        className={"textarea " + (this.state.isInvalidText ? ' is-danger' : '')}
                                                        value={this.state.textAreaValue}
                                                        onChange={this.handleTextChange}
                                                        placeholder="Enter a thought, idea or summary or whatever else you think is important!"
                                                        rows={1}></textarea>
                                                {invalidText}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-3 has-text-centered">
                                        <label className="checkbox">
                                            <input type="checkbox" checked={this.state.keyPoint} onChange={this.handleCheck}/>
                                            &nbsp;Highlight this point?
                                        </label>
                                    </div>
                                    <div className="column is-2">
                                        <button className="button is-dark" onClick={() => this.addPoint()}>
                                            Add Note
                                        </button>
                                    </div>
                                    <div className="column is-12">
                                        {
                                            this.state.retroData.points.map((item, key) => {
                                                return (
                                                    <div className="columns is-multiline" key={key}>
                                                        <div className="column is-9">
                                                            <p>{item.lineNumber})&nbsp;{item.entryText}</p>
                                                        </div>
                                                        <div className="column is-1">
                                                            <p>{item.keyPoint ? 'key point' : ''}</p>
                                                        </div>
                                                        <div className="column is-2 has-text-centered">
                                                            <button className="button" onClick={() => this.removePoint(item.lineNumber)}>
                                                                <span className="icon is-size-5">
                                                                    <AiFillDelete/>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-info" onClick={() => this.props.handleSubmit(this.state.retroData)}>Save changes</button>
                        <button className="button" onClick={() => this.props.toggleModal(this.props.modalActive)}>Cancel
                        </button>
                    </footer>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newRetro !== this.props.newRetro) {
            this.setState({
                retroData: this.props.newRetro,
                datePicker: this.props.datePicker
            })
        }
    }
}