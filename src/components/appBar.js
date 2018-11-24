import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          SmarTea Pants
        </Typography>
        <div>
          <Typography color="inherit">Bank: ${bank}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(ButtonAppBar)
