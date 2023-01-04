import React, {Component} from "react";
import Retrospective from "../components/retrospective/Retrospective";
import {CoreConstants} from "../constants/coreConstants";
import moment from "moment";
import {HiPlus} from "react-icons/hi";
import 'bulma-floating-button/dist/css/bulma-floating-button.min.css'
import RetrospectiveModal from "../components/retrospective/RetrospectiveModal";
import {Helmet} from "react-helmet";

export default class RetrospectivesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            end: moment().startOf('month').add(1, 'months').add(1, 'days').format(CoreConstants.DateTime.ISODateFormat),
            selectedInterval: 'WEEKLY',
            activeMonths: [],
            currentMonth: moment().startOf('month').format(CoreConstants.DateTime.ISODateFormat),
            activeYears: [],
            currentYear: moment().startOf('year').format(CoreConstants.DateTime.ISODateFormat),
            retros: [],

            //  modal
            modalActive: false,
            newRetro: {
                intervalFrequency: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            datePicker: [new Date(), new Date()],
            isEditing: false,
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleMonthChange = this.handleMonthChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.selectTab = this.selectTab.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleMonthChange(e) {
        this.setState({
            currentMonth: e.target.value,
            start: moment(e.target.value).format(CoreConstants.DateTime.ISODateFormat),
            end: moment(e.target.value).add(1, 'months').format(CoreConstants.DateTime.ISODateFormat),
        }, () => this.getRetrospectives())
    }

    handleYearChange(e) {
        this.setState({
            currentYear: e.target.value,
            start: moment(e.target.value).format(CoreConstants.DateTime.ISODateFormat),
            end: moment(e.target.value).add(1, 'years').format(CoreConstants.DateTime.ISODateFormat),
        }, () => this.getRetrospectives())
    }

    selectTab(val) {
        this.setState({selectedInterval: val}, () => this.getRetrospectives())
    }

    toggleModal(shouldCancel) {
        const val = this.state.modalActive
        this.setState({modalActive: !val}, () => {
            if (shouldCancel) {
                this.resetForm()
            }
        })
    }

    async handleEdit(val1) {
        this.setState({isEditing: true})
        await this.getRetrospective(val1)
    }

    async handleDelete(val1) {
        await this.deleteRetrospective(val1)
    }

    async handleSubmit(val) {
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
            datePicker: [new Date(), new Date()],
            isInvalidDate: false
        })
    }

    async createRetrospective() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.Create,
                {
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
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.Delete
                    .replace('{uid}', val1), {method: 'DELETE'})
            const data = await response.json()
            if (data.success) {
                await this.getRetrospectives()
            }
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }

    async getActiveMonths() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.ActiveMonths
                    .replace('{year}', moment(this.state.currentYear).format('YYYY'))
                    .replace('{includeStarterMonth}', 'true')
            )

            const data = await response.json()
            this.setState({
                activeMonths: data.data,
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }

    async getActiveYears() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.ActiveYears
            )

            const data = await response.json()
            this.setState({
                activeYears: data.data,
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }

    async getRetrospective(val1) {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.Get
                    .replace('{uid}', val1)
            );
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
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.List
                    .replace('{start}', this.state.start)
                    .replace('{end}', this.state.end)
                    .replace('{interval}', this.state.selectedInterval)
            )

            const data = await response.json()
            this.setState({
                retros: data.data,
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            isLoading: false,
        })
    }

    async updateRetrospective() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(
                CoreConstants.ApiUrls.Retrospective.Edit
                    .replace('{uid}', this.state.newRetro.uid),
                {
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


    //  RENDER FUNCTION

    render() {
        let emptyText = null
        if (!this.state.retros || this.state.retros.length === 0) {
            emptyText =
                <div className="container has-text-centered">
                    <p>Looks like you don't have any retrospectives.</p>
                    <p>Take a moment to add one by reflecting on previous performances!</p>
                </div>
        }


        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Retrospectives</title>
                </Helmet>
                <div className="retrospectives-page">
                    <div className="container">
                        <div className="tabs is-boxed is-centered">
                            <ul>
                                <li className={(this.state.selectedInterval === 'WEEKLY' ? ' is-active ' : '')}>
                                    <a onClick={() => this.selectTab('WEEKLY')}>Weekly</a>
                                </li>
                                <li className={(this.state.selectedInterval === 'MONTHLY' ? ' is-active ' : '')}>
                                    <a onClick={() => this.selectTab('MONTHLY')}>Monthly</a>
                                </li>
                            </ul>
                        </div>
                        <div className="columns is-multiline is-mobile is-vcentered">
                            <div className="column is-12">
                                <div className="field is-grouped is-grouped-right">
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.currentYear} onChange={this.handleYearChange}>
                                                {
                                                    this.state.activeYears && this.state.activeYears.map((item, key) => {
                                                        const val = moment(item)
                                                        return (
                                                            <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                    key={key}>
                                                                {val.format(CoreConstants.DateTime.ISOYearFormat)}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.currentMonth} onChange={this.handleMonthChange}>
                                                {
                                                    this.state.activeMonths && this.state.activeMonths.map((item, key) => {
                                                        const val = moment(item)
                                                        return (
                                                            <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                    key={key}>
                                                                {val.format(CoreConstants.DateTime.ISOMonthFormat)}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.retros && this.state.retros.map((item, key) => {
                                    return (
                                        <div className="column is-12" key={key}>
                                            <Retrospective
                                                interval={this.state.selectedInterval}
                                                showTotals={true}
                                                isLoading={this.state.isLoading}
                                                retro={item}
                                                editHandler={this.handleEdit}
                                                deleteHandler={this.handleDelete}
                                                showCrud={true}
                                            />
                                        </div>
                                    )
                                })
                            }
                            {emptyText}
                        </div>
                    </div>

                    <button className="button is-floating is-primary is-vcentered has-text-centered"
                            onClick={() => this.toggleModal(true)}>
                    <span className="is-size-3" style={{marginTop: "5px"}}>
                        <HiPlus/>
                    </span>
                    </button>

                    <RetrospectiveModal
                        modalActive={this.state.modalActive}
                        toggleModal={this.toggleModal}
                        handleSubmit={this.handleSubmit}
                        newRetro={this.state.newRetro}
                        datePicker={this.state.datePicker}
                    />
                </div>
            </>
        );
    }


    //  LIFECYCLE FUNCTIONS

    async componentDidMount() {
        await this.getActiveYears()
        await this.getActiveMonths()
        await this.getRetrospectives()
    }
}