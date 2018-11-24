import React from 'react'

import Navigation from '../components/Navigation'

import { withStyles } from '@material-ui/core/styles' // TODO: figure out Material-UI

const Layout = (props) => {
  return (
    <div className={ props.classes.container }>
    <Navigation bank={ props.bank } />
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



// export const query = graphql`
//   query {
//     file(relativePath: { eq: "smartea_logo_white.png" }) {
//       childImageSharp {
//         fluid(maxWidth: 700) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `
