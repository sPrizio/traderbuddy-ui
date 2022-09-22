import React, {Component} from "react";
import HeroComponent from "../components/layout/HeroComponent";
import RetrospectiveComponent from "../components/layout/retrospective/RetrospectiveComponent";
import moment from "moment";
import 'bulma-floating-button/dist/css/bulma-floating-button.min.css'
import {HiPlus} from "react-icons/hi";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'

export default class RetrospectivePage extends Component {

    static timespanUrl = 'http://localhost:8080/api/v1/retrospectives/timespan'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            retros: [],
            startDate: moment().subtract(2, "months").format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            modalActive: false,
            textAreaValue: '',
            keyPoint: false,
            newRetro: {
                interval: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            isInvalidText: false,
            isInvalidDate: false,
            datePicker: [new Date(), new Date()]
        }

        this.handleCheck = this.handleCheck.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
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
                newRetro: {
                    ...prevState.newRetro,
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
            newRetro: {
                ...prevState.newRetro,
                interval: e.target.value
            },
        }))
    }

    handleSubmit() {
        if (this.state.newRetro.startDate.length === 0 && this.state.newRetro.endDate.length === 0) {
            this.setState({isInvalidDate: true})
        } else {
            console.log(this.state.newRetro)
        }
    }

    handleTextChange(e) {
        this.setState({textAreaValue: e.target.value})
    }

    toggleModal(val) {
        this.setState({modalActive: !val}, () => this.resetForm())
    }


    //  GENERAL FUNCTIONS

    addPoint() {
        if (this.state.textAreaValue.length === 0) {
            this.setState({isInvalidText: true})
        } else {
            const temp = {
                lineNumber: this.state.newRetro.points.length + 1,
                entryText: this.state.textAreaValue,
                keyPoint: this.state.keyPoint
            }

            this.setState(prevState => ({
                isInvalidText: false,
                newRetro: {
                    ...prevState.newRetro,
                    points: [...prevState.newRetro.points, temp]
                },
                textAreaValue: '',
                keyPoint: false
            }))
        }
    }

    resetForm() {
        this.setState({
            textAreaValue: '',
            keyPoint: false,
            newRetro: {
                interval: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            isInvalidText: false,
            isInvalidDate: false
        })
    }

    async getRetrospectives() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.timespanUrl + '?start=' + this.state.startDate + '&end=' + this.start.endDate);
            const data = await response.json();

            console.log(data.data)

            this.setState({
                isLoading: false,
                retros: data.data,
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
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
            <div className="min-height-for-footer">
                <HeroComponent title={"Retrospectives"}
                               subtitle={"Reflect on previous trading performances and track your progress and evolution"}/>
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column is-12">
                            <RetrospectiveComponent/>
                        </div>
                    </div>
                </div>

                <button className="button is-floating is-info is-vcentered has-text-centered"
                        onClick={() => this.toggleModal(this.state.modalActive)}>
                    <span className="is-size-3" style={{marginTop: "5px"}}>
                        <HiPlus/>
                    </span>
                </button>

                <div className={"modal " + (this.state.modalActive ? ' is-active' : '')}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add a Retrospective</p>
                            <button className="delete" aria-label="close"
                                    onClick={() => this.toggleModal(this.state.modalActive)}></button>
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
                                                <select value={this.state.newRetro.interval} onChange={this.handleSelect}>
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
                                        <label className="label">Time Period</label>
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
                                                <input type="checkbox" checked={this.state.keyPoint} onChange={this.handleCheck}/>&nbsp;Highlight this
                                                point?
                                            </label>
                                        </div>
                                        <div className="column is-2">
                                            <button className="button is-dark" onClick={() => this.addPoint()}>Add
                                                Note
                                            </button>
                                        </div>
                                        <div className="column is-12">
                                            {
                                                this.state.newRetro.points.map((item, key) => {
                                                    return <p key={key}>{item.lineNumber}.&nbsp;{item.entryText}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-info" onClick={this.handleSubmit}>Save changes</button>
                            <button className="button" onClick={() => this.toggleModal(this.state.modalActive)}>Cancel
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        //await this.getRetrospectives()
    }
}