import React from 'react'

import AppBar from './appBar'

import { withStyles } from '@material-ui/core/styles' // TODO: figure out Material-UI

const Layout = props => (
  <div className={ props.classes.container }>
    <AppBar />
    { props.children }
  </div>
)

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

export default withStyles(styles)(Layout)
