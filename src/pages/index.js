import React from 'react'

import Question from '../components/question'
import AppBar from '../components/appBar'

import { withStyles } from '@material-ui/core/styles'

import Axios from 'axios'

let backgroundColor = ''

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      bank: 0,
      submitted: 0,
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

  handleChange = event => {
    this.setState({
      input: event.target.value,
    })
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

  showQuestion = (i) => {
    const question = this.state.questions[i]
    return question
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <AppBar change={this.state.submittted} bank={this.state.bank} />
        <Question
          handleChange={ event => this.handleChange(event) }
          handleSubmit={ event => this.handleSubmit(event) }
          handleDelta={ value => this.handleDelta(value) }
          getQuestions={ () => this.getQuestions() }
          showQuestion={ (i) => this.showQuestion(i) }
          curQuestion={ this.state.curQuestion }
          input={ this.state.input }
          showAnswer={ this.state.wrongAnswer }
        />
      </div>
    )
  }
}

export default withStyles(styles)(Index)
