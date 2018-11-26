import React from 'react';
import { Link } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  card: {
    width: '80%',
    margin: 'auto',
    // textAlign: 'center'
  },
  title: {
    fontSize: '1.5em',
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '80%',
  }
})
class GamePicker extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Select a show date
            </Typography>
            <FormControl className={classes.formControl}>
              <Select native onChange={ ev => this.props.handleSelect(ev) }>
              {
                this.props.airDates.map(date => (<option key={ Date.parse(date) }>{ date }</option>))
              }
              </Select>
            </FormControl>
              <Link
              onClick={ () => this.props.handleSubmit() }
              to={ `/quiz/${this.props.curAirDate}` }
              state={{ airDate: this.props.curAirDate  }}
              ><Button variant="contained" size="small" color="primary" className={classes.button}> Play!</Button></Link>
          </CardContent>
        </Card>
        <br/>
        <Card className={classes.card}>
          <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Endless game mode (coming soon)
          </Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(GamePicker);
