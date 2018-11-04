import React from 'react'
import { Link } from 'gatsby'

import Question from '../components/question'
import AppBar from '../components/appBar'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

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

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <AppBar change={this.state.submittted} bank={this.state.bank} />
        <Question handleDelta={this.handleDelta} />
      </div>
    )
  }
}

export default withStyles(styles)(Index)
