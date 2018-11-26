import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import "./layout.css"

import Img from 'gatsby-image'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        logoImage: file(relativePath: {eq: "smartea_logo_white.png"}) {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
    }

    render={data => (
       <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: '1'}}>
            <Img
            title="SmarTea Pants logo"
            alt="SmarTea Pants logo"
            fluid={data.logoImage.childImageSharp.fluid}
            style={{ width: '50%', margin: '10px 0'}}
            />
          </Typography>
          <Typography color='inherit'>Bank: ${props.bank}</Typography>
        </Toolbar>
      </AppBar>
      {props.children}
      </div>
    )}
  />
)
