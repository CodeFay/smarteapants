import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import SmarteaMasthead from '../images/smartea2x.png'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

function ButtonAppBar(props) {
  const { classes, bank } = props
  return (
    <AppBar position="static" >
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item sm={5}>
            <Typography><img src={ SmarteaMasthead } /></Typography>
          </Grid>
          <div>
            <Grid>
              <Typography color="inherit" variant="h5">Bank: ${bank}</Typography>
            </Grid> 
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(ButtonAppBar)
