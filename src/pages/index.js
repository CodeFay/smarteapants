import React from 'react'

import GamePicker from '../components/gamePicker'
import Layout from '../components/layout'

import Axios from 'axios';

// import { withStyles } from '@material-ui/core/styles' // TODO: figure out Material-UI

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      airDates: [], // TODO: get air_dates from questions in database
      curShowDate: '',
      curShowNum: '4860', // TODO: get showNum for showDate
    }
  }

  _isMounted = false

  componentDidMount() {
      this._isMounted = true
      this.getAirDates()
  }

  componentWillUnmount() {
      this._isMounted = false
  }

  getAirDates = () => {
    Axios.get('/.netlify/functions/getAirDates')
    .then(res => {
      console.log(res)
      this._isMounted && this.setState({ airDates: res.data })
    }).catch(err => {
      console.error('API error', err)
    })
  }

  pickShowDate = ev => {
    this.setState({ curShowDate: ev.target.value })
  }

  render() {
    return (
      <Layout>
          <GamePicker
            airDates={ this.state.airDates }
            curShowNum={ this.state.curShowNum }
            handleSelect={ ev => this.pickShowDate(ev) }
          />
      </Layout>
    )
  }
}

export default Index
