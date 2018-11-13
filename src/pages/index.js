import React from 'react'

import GamePicker from '../components/gamePicker'
import Layout from '../components/layout'

// import { withStyles } from '@material-ui/core/styles' // TODO: figure out Material-UI

import Axios from 'axios'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      airDates: [], // TODO: get air_dates from questions in database
      curShowDate: '',
      curShowNum: '4860', // TODO: get showNum for showDate
    }
  }

  pickShowDate = ev => {
    this.setState({ curShowDate: ev.target.value })
  }

  handleChange = event => {
    this.setState({ input: event.target.value })
  }
  
  handleSubmit = event => {
    const curIndex = this.state.curQuestion
    const curQuestion = this.state.questions[curIndex].data
    event.preventDefault()
    if (this.state.input.length === 0 || this.state.wrongAnswer) { // no answer
      this.incCurQuestion()
      this.setState({ input: '' })
      return
    } else if (this.state.input === curQuestion.answer) { // right answer
      let value = curQuestion.value
       ? +(curQuestion.value.substring(1))
       : 100
      this.handleDelta(value)
      this.incCurQuestion()
      this.setState({ input: '' })
    } else { // wrong answer
      let value = -(curQuestion.value
       ? (curQuestion.value.substring(1))
       : 100)
      this.handleDelta(value)
      this.setState({ input: '', wrongAnswer: true })
    }
  }

  incCurQuestion = () => {
    this.setState( state => {
      return {
        curQuestion: ++state.curQuestion,
        wrongAnswer: false
      }
    })
  }

  handleDelta = (value) => {
    var delta = value > 0 ? 1 : -1
    this.setState((state, props) => ({
      bank: state.bank + value,
      submitted: delta,
    }))
  }

  getQuestions = () => {
    return Axios.get('/.netlify/functions/getQuestions')
      .then(res => {
        this.setState({ questions: res.data.data })
      }).catch((err) => {
        console.log('API error', err)
      })
  }

  // showQuestion = i => {
  //   return this.state.questions[i]
  // }

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
