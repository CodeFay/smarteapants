import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Axios from 'axios'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height: '90vh',
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  grid: {
    flexGrow: 1,
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: {
        category: "ESPN's TOP 10 ALL-TIME ATHLETES",
        air_date: '2004-12-31',
        question:
          "'No. 2: 1912 Olympian; football star at Carlisle Indian School; 6 MLB seasons with the Reds, Giants & Braves'",
        value: '$200',
        answer: 'Jim Thorpe',
        round: 'Jeopardy!',
        show_number: '4680',
      },
      input: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({
      input: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    if (this.state.input.length === 0) {
      return
    } else if (this.state.input === this.state.question.answer) {
      let value = parseInt(this.state.question.value.substring(1))
      this.props.handleDelta(value)
    } else {
      let value = parseInt(this.state.question.value.substring(1)) * -1
      this.props.handleDelta(value)
    }
  }

  getQuestions = () => {
    return Axios.get('/.netlify/functions/getQuestions')
      .then(res => {
        console.log('API response', res)
        return res
      }).catch((err) => {
        console.log('API error', err)
      })
  }

  render() {
    const { classes } = this.props
    return (
      <form className={classes.layout} onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Grid container className={classes.grid}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={16}
                alignItems="center"
                direction="row"
                justify="space-between"
              >
                <Grid item>{this.state.question.category}</Grid>
                <Grid item>{this.state.question.value}</Grid>
              </Grid>
            </Grid>
          </Grid>

          <Typography
            component="h5"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {this.state.question.question}
          </Typography>
          <TextField
            onChange={this.handleChange}
            id="answer-input"
            label="Answer"
            style={{ margin: 0 }}
            fullWidth
            margin="normal"
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>
      </form>
    )
  }
}

export default withStyles(styles)(Question)
