// Do we need the Layout component?  Unclear why we have it

import React from 'react'

import Navigation from '../components/Navigation'

import { withStyles } from '@material-ui/core/styles' // TODO: figure out Material-UI

const Layout = (props) => {
  return (
    <div className={ props.classes.container }>
    <Navigation
      logoImage={props.logoImage}
      bank={ props.bank } />
    { props.children }
    </div>
  )
}

const styles = () => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    })

export default withStyles(styles)(Layout)
//TODO: why do we use withStyles? Is there a way to clean up styling / move to other file?
