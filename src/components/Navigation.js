import React from 'react'
import Img from 'gatsby-image'

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
// SmarTea Pants

function Navigation(props) {
  const { classes, bank } = props
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.root}>
          <Img
          title="SmarTea Pants logo"
          alt="SmarTea Pants logo"
          fluid={props.logoImage}
          style={{ width: '50%', margin: '10px 0px 0px 0px'}} 
          />
        </Typography>
        <Typography color='inherit'>Bank: ${bank}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Navigation)
