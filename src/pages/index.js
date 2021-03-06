import React from 'react'
import Axios from 'axios';

import GamePicker from '../components/GamePicker'
import Layout from '../hoc/Layout'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      airDates: [], // TODO: get air_dates from questions in database
      curAirDate: '',
      curShowNum: '', // TODO: get showNum for showDate
    }
  }

  _isMounted = false

  componentDidMount() {
      this._isMounted = true
      this.getAirDates()
  }

  componentWillUnmount() { // TODO: set debuggers on various compoWillUn to see when & why they are unmounting
      this._isMounted = false
  }

  getAirDates = () => { // TODO: create query that selects all show_nums along with air_dates
    Axios.get('/.netlify/functions/getAirDates')
    .then(res => {
      this._isMounted && this.setState({ airDates: res.data, curAirDate: res.data[0] })
    }).catch(err => {
      console.error('API error', err)
    })
  }

  getShowNumByDate(airDate) {
    Axios.get('/.netlify/functions/getShowNumByDate',
      {
        params: {
          airDate
        }
      }
    )
    .then(res => {
      this._isMounted && this.setState({ curShowNum: res })
    }).catch(err => { console.error('API error', err)})
  }

  selectShowDate = ev => {
    this.setState({ curAirDate: ev.target.value })
  }

  submitShowDate = (airDate) => {
    this.getShowNumByDate(airDate)
  }

  render() {
    return (
      <Layout>
      <br/>
        <GamePicker
          airDates={ this.state.airDates }
          curAirDate={ this.state.curAirDate }
          handleSelect={ ev => this.selectShowDate(ev) }
          handleSubmit={ () => this.submitShowDate(this.state.curAirDate) }
        />
      </Layout>
    )
  }
}

export default Index
