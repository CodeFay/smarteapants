import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import Img from "gatsby-image";
// import Logo from '../assets/images/smartea_logo_white.png'

const styles = {
  root: {
    flexGrow: 1,
  }
}
// <img src={Logo}/>
// <Img
// title="Logo image"
// alt="SmarTea Pants logo"
// fluid={logoImage}
// />

function Navigation(props) {
  const { classes, bank } = props
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.root}>
            SmarTea Pants
        </Typography>
        <div>
          <Typography color='inherit'>Bank: ${bank}</Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Navigation)
