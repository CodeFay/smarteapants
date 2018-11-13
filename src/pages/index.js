import React from 'react'

import AppBar from '../components/appBar'
import GamePicker from '../components/gamePicker'

import { withStyles } from '@material-ui/core/styles' // TODO: figure out Material-UI

import Axios from 'axios'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textInput: '',
      bank: 0,
      submitted: 0,
      airDates: [], // TODO: get air_dates from questions in database
      curShowDate: '',
      curShowNum: '4860', // TODO: get showNum for showDate
      questions: [
        {
          data: {
            question: '',
            category: '',
            value: '',
            answer: ''
          }
        }
      ],
      curQuestion: 0,
      wrongAnswer: false
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
    const { classes } = this.props
    return (
      <div className={ classes.container }>
        <AppBar change={this.state.submittted} bank={this.state.bank} />
        <GamePicker
          airDates={ this.state.airDates }
          curShowNum={ this.state.curShowNum }
          curQuestion={ this.state.curQuestion }
          showAnswer={ this.state.wrongAnswer }
          textInput={ this.state.textInput }
          handleSelect={ ev => this.pickShowDate(ev) }
          handleTextInput={ ev => this.handleChange(ev) }
          handleAnswerSubmit={ ev => this.handleSubmit(ev) }
          handleDelta={ value => this.handleDelta(value) }
          getQuestions={ () => this.getQuestions(this.state.curShowNum) }
        />
      </div>
    )
  }
}

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

export default withStyles(styles)(Index)
