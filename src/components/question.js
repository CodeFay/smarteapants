import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Answer from '../components/answer'

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
  render() {
    const curQuestion = this.props.curQuestion
    const questionString = curQuestion.question.length
    const { classes } = this.props
    return (
      <form className={classes.layout} onSubmit={this.props.handleAnswerSubmit}>
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
                <Grid item>{ curQuestion.category }</Grid>
                <Grid item>{ curQuestion.value || '$100' }</Grid>
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
            {curQuestion.question.substring(1,questionString-1) }
          </Typography>
          <TextField
            onChange={ this.props.handleTextInput }
            id="answer-input"
            label="Answer"
            style={{ margin: 0 }}
            fullWidth
            margin="normal"
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            value={ this.props.textInput }
          />
        </Paper>
        { this.props.showAnswer ? <Answer answer={ curQuestion.answer } /> : null }
      </form>
    )
  }
}

export default withStyles(styles)(Question)
