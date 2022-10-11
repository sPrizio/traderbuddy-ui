import React, {Component} from "react";
import HeroComponent from "../components/layout/HeroComponent";
import RetrospectiveComponent from "../components/layout/retrospective/RetrospectiveComponent";
import moment from "moment";
import 'bulma-floating-button/dist/css/bulma-floating-button.min.css'
import {HiPlus} from "react-icons/hi";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'
import RetrospectiveModal from "../components/layout/retrospective/RetrospectiveModal";
import {getDomain} from "../services/ConfigurationService"

export default class RetrospectivePage extends Component {

    static fetchRetroUrl = getDomain() + '/retrospectives/uid'
    static timespanUrl = getDomain() + '/retrospectives/timespan'
    static createRetroUrl = getDomain() + '/retrospectives/create'
    static deleteRetroUrl = getDomain() + '/retrospectives/delete'
    static updateRetroUrl = getDomain() + '/retrospectives/update'
    static fetchMonthsUrl = getDomain() + "/retrospectives/active-months"

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            retroInterval: 'WEEKLY',
            retros: [],
            startDate: moment().startOf("month").format('YYYY-MM-DD'),
            endDate: moment().add(1, "months").startOf('month').format('YYYY-MM-DD'),
            modalActive: false,
            newRetro: {
                intervalFrequency: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            datePicker: [new Date(), new Date()],
            isEditing: false,
            activeMonth: moment().startOf('month').format('YYYY-MM-DD'),
            activeMonths: []
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleMonthChange = this.handleMonthChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTabClick = this.handleTabClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleEdit(val1) {
        this.setState({isEditing: true})
        this.getRetrospective(val1)
    }

    handleDelete(val1) {
        this.deleteRetrospective(val1)
    }

    handleMonthChange(e) {
        this.setState({
            activeMonth: e.target.value,
            startDate: moment(e.target.value).format('YYYY-MM-DD'),
            endDate: moment(e.target.value).add(1, 'months').startOf('month').format('YYYY-MM-DD')
        }, () => this.getRetrospectives())
    }

    handleSubmit(val) {
        if (val.startDate.length === 0 && val.endDate.length === 0) {
            this.setState({isInvalidDate: true})
        } else {
            this.setState({newRetro: val}, () => {
                if (this.state.isEditing) {
                    this.updateRetrospective()
                } else {
                    this.createRetrospective()
                }

                this.toggleModal(this.state.modalActive)
                this.resetForm()
            })
        }
    }

    handleTabClick(val) {
        this.setState({retroInterval: val}, () => this.getRetrospectives())
    }

    toggleModal(shouldCancel) {
        const val = this.state.modalActive
        this.setState({modalActive: !val}, () => {
            if (shouldCancel) {
                this.resetForm()
            }
        })
    }


    //  GENERAL FUNCTIONS

    resetForm() {
        this.setState({
            newRetro: {
                intervalFrequency: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            isEditing: false,
            datePicker: [new Date(), new Date()]
        })
    }

    async createRetrospective() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.createRetroUrl, {
                method: 'POST',
                body: JSON.stringify({'retrospective': this.state.newRetro}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json()
            if (data.success) {
                await this.getRetrospectives()
            }
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    async deleteRetrospective(val1) {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.deleteRetroUrl + '?uid=' + val1, {method: 'DELETE'})
            const data = await response.json()
            if (data.success) {
                await this.getRetrospectives()
            }
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    async updateRetrospective() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.updateRetroUrl + '?uid=' + this.state.newRetro.uid, {
                method: 'PUT',
                body: JSON.stringify({'retrospective': this.state.newRetro}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json()
            if (data.success) {
                await this.getRetrospectives()
            }
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    async getRetrospective(val1) {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.fetchRetroUrl + '?uid=' + val1);
            const data = await response.json();

            this.setState({
                isLoading: false,
                newRetro: data.data,
                datePicker: [moment(data.data.startDate).toDate(), moment(data.data.endDate).toDate()]
            }, () => {
                this.toggleModal(false)
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    async getRetrospectives() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.timespanUrl + '?start=' + this.state.startDate + '&end=' + this.state.endDate + '&interval=' + this.state.retroInterval);
            const data = await response.json();

            this.setState({
                isLoading: false,
                retros: data.data,
            }, () => this.getActiveMonths())
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    async getActiveMonths() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.fetchMonthsUrl + '?includeStarterMonth=true');
            const data = await response.json();

            this.setState({
                isLoading: false,
                activeMonths: data.data,
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        let mainDisplay;
        if (this.state.retros && this.state.retros.length > 0) {
            let loop =
                this.state.retros.map((item, key) => {
                    return (
                        <div className="column is-12" key={key}>
                            <RetrospectiveComponent retro={item} editHandler={this.handleEdit}
                                                    deleteHandler={this.handleDelete}/>
                        </div>
                    )
                })

            mainDisplay =
                <div>
                    <div className="columns is-multiline">
                        {loop}
                    </div>
                </div>
        } else {
            mainDisplay =
                <div className="column is-12 has-text-centered">
                    <p>Looks like you don't have any retrospectives. You should add some! Reflecting on your previous performances is a great way to help set up future success.</p>
                </div>
        }


        return (
            <div className="min-height-for-footer">
                <HeroComponent title={"Retrospectives"}
                               subtitle={"Reflect on previous trading performances and track your progress and evolution"}/>
                <div className="container">
                    <div className="tabs is-centered">
                        <ul>
                            <li className={this.state.retroInterval === 'WEEKLY' ? ' is-active ' : ''}>
                                <a href="#" onClick={() => this.handleTabClick('WEEKLY')}><span>Weekly</span></a>
                            </li>
                            <li className={this.state.retroInterval === 'MONTHLY' ? ' is-active ' : ''}>
                                <a href="#" onClick={() => this.handleTabClick('MONTHLY')}><span>Monthly</span></a>
                            </li>
                        </ul>
                    </div>
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <h2 className="subtitle">{moment(this.state.startDate).format('MMMM YYYY')}</h2>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="select">
                                    <select onChange={this.handleMonthChange} value={this.state.activeMonth}>
                                        {
                                            this.state.activeMonths.map((item, key) => {
                                                return (
                                                    <option key={key} value={moment(item).format('YYYY-MM-DD')}>{moment(item).format('MMMM YYYY')}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {mainDisplay}
                </div>

                <button className="button is-floating is-info is-vcentered has-text-centered"
                        onClick={() => this.toggleModal(true)}>
                    <span className="is-size-3" style={{marginTop: "5px"}}>
                        <HiPlus/>
                    </span>
                </button>

                <RetrospectiveModal modalActive={this.state.modalActive}
                                    toggleModal={this.toggleModal}
                                    handleSubmit={this.handleSubmit}
                                    newRetro={this.state.newRetro}
                                    datePicker={this.state.datePicker}
                />
            </div>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getRetrospectives()
    }
}