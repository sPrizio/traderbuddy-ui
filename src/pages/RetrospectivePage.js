import React, {Component} from "react";
import HeroComponent from "../components/layout/HeroComponent";
import RetrospectiveComponent from "../components/layout/retrospective/RetrospectiveComponent";
import moment from "moment";
import 'bulma-floating-button/dist/css/bulma-floating-button.min.css'
import {HiPlus} from "react-icons/hi";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'
import RetrospectiveModal from "../components/layout/retrospective/RetrospectiveModal";

export default class RetrospectivePage extends Component {

    static fetchRetroUrl = 'http://localhost:8080/api/v1/retrospectives/unique'
    static timespanUrl = 'http://localhost:8080/api/v1/retrospectives/timespan'
    static createRetroUrl = 'http://localhost:8080/api/v1/retrospectives/create'
    static updateRetroUrl = 'http://localhost:8080/api/v1/retrospectives/update'

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            retroInterval: 'WEEKLY',
            retros: [],
            startDate: moment().subtract(2, "months").format('YYYY-MM-DD'),
            endDate: moment().add(1, "weeks").format('YYYY-MM-DD'),
            modalActive: false,
            textAreaValue: '',
            keyPoint: false,
            newRetro: {
                intervalFrequency: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            isInvalidText: false,
            isInvalidDate: false,
            datePicker: [new Date(), new Date()],
            isEditing: false
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }


    //  HANDLER FUNCTIONS

    handleEdit(val1, val2, val3) {
        this.setState({isEditing: true})
        this.getRetrospective(val1, val2, val3)
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
            textAreaValue: '',
            keyPoint: false,
            newRetro: {
                intervalFrequency: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            isInvalidText: false,
            isInvalidDate: false,
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

    async updateRetrospective() {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.updateRetroUrl + '?start=' + this.state.newRetro.startDate + '&end=' + this.state.newRetro.endDate + '&interval=' + this.state.newRetro.intervalFrequency, {
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

    async getRetrospective(val1, val2, val3) {
        try {
            this.setState({isLoading: true})
            const response = await fetch(RetrospectivePage.fetchRetroUrl + '?start=' + val1 + '&end=' + val2 + '&interval=' + val3);
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
            })
        } catch (e) {
            this.setState({isLoading: false})
            console.log(e)
        }
    }


    //  RENDER FUNCTION

    render() {
        return (
            <div className="min-height-for-footer">
                <HeroComponent title={"Retrospectives"}
                               subtitle={"Reflect on previous trading performances and track your progress and evolution"}/>
                <div className="container">
                    <div className="columns is-multiline">
                        {
                            this.state.retros ?
                            this.state.retros.map((item, key) => {
                                return (
                                    <div className="column is-12" key={key}>
                                        <RetrospectiveComponent retro={item} editHandler={this.handleEdit} />
                                    </div>
                                )
                            })
                                :
                                <div className="column is-12 has-text-centered">
                                    <p>Looks like you don't have any retrospectives. You should add some! Reflecting on your previous performances is a great way to help set up future success.</p>
                                </div>
                        }
                    </div>
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