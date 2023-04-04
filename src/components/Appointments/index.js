import {Component} from 'react'

import './index.css'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    starred: false,
    title: '',
    date: '',
    appointmentsList: [
      {
        id: uuidv4(),
        title: 'Scientist',
        upDate: '07 August 2022, Sunday',
        isFavoutite: false,
      },
    ],
  }

  onSubmitForm = event => {
    event.preventDefault()
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  updateInput = event => {
    this.setState({title: event.target.value})
  }

  updateAppointmentItem = () => {
    const {title, date} = this.state
    const upDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointmentItem = {
      id: uuidv4(),
      title,
      upDate,
      isFavoutite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmentItem],
      title: '',
      date: '',
    }))
  }

  updateIsFavouirte = id => {
    const {appointmentsList} = this.state
    const newList = appointmentsList.map(eachItem => {
      if (id === eachItem.id) {
        return {...eachItem, isFavoutite: !eachItem.isFavoutite}
      }
      return eachItem
    })
    this.setState({appointmentsList: newList})
  }

  updateStarredList = () => {
    const {appointmentsList} = this.state
    const starredList = appointmentsList.filter(
      eachItem => eachItem.isFavoutite === true,
    )
    this.setState({appointmentsList: starredList})
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {title, date, appointmentsList, starred} = this.state
    const starClass = starred ? 'highleghed' : 'starred'
    return (
      <div className="container">
        <div className="card">
          <div className="semi-card">
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="inputText">
                TITLE
              </label>
              <input
                placeholder="Title"
                type="text"
                id="inputText"
                className="input"
                onChange={this.updateInput}
                value={title}
              />
              <label className="label" htmlFor="inputDate" id="dateElement">
                DATE
              </label>
              <input
                type="date"
                id="inputDate"
                className="input"
                onChange={this.updateDate}
                value={date}
              />
              <button
                type="submit"
                className="button"
                onClick={this.updateAppointmentItem}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment"
              alt="appointments"
            />
          </div>
          <br />
          <div className="bottom">
            <h1 className="head">Appointments</h1>
            <button
              type="button"
              className={starClass}
              onClick={this.updateStarredList}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-items">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                details={eachAppointment}
                key={eachAppointment.id}
                updateIsFavouirte={this.updateIsFavouirte}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
