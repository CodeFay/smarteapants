import React from 'react'
import { Link } from 'gatsby'

import Question from '../components/question'
import AppBar from '../components/appBar'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
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
      bank: 0,
      submitted: 0,
      questions: [
        {
          data: {
            question: ''
          }
        }
      ]
    }
    this.handleDelta = this.handleDelta.bind(this)
  }

  handleDelta(value) {
    var delta = value > 0 ? 1 : -1
    console.log(delta)
    this.setState((state, props) => ({
      bank: state.bank + value,
      submitted: delta,
    }))
  }

  getQuestions = () => {
    return Axios.get('/.netlify/functions/getQuestions')
      .then(res => {
        console.log('API response', res)
        this.setState(state => {
          return { questions: res.data.data }
        })
      }).catch((err) => {
        console.log('API error', err)
      })
  }

  showQuestion = () => {
    const question = this.state.questions[0]
    console.log(question)
    return question
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <AppBar change={this.state.submittted} bank={this.state.bank} />
        <Question handleDelta={this.handleDelta} getQuestions={ () => this.getQuestions() } showQuestion={ () => this.showQuestion() }/>
      </div>
    )
  }
}

export default withStyles(styles)(Index)
