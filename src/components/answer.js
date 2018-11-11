import React, { Component } from 'react'
import Axios from 'axios'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

class Answer extends Component {
  state = {
    wikiBlurb: 'null',
    wikiLink: '',
    error: false
  }

  // https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Icarus

  componentDidMount() {
    Axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=' + encodeURIComponent(this.props.answer.replace('the ','').trim()) + '&limit=1')
      .then(response => {
            this.setState( {
              wikiBlurb: response.data[2],
              wikiLink: response.data[3]
            } );
          } )
      .catch( error => {
          this.setState ({ error: true})
      });
  }
  render() {
      return (
          <React.Fragment>
          <Typography
            component="h5"
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
          <a href={this.state.wikiLink}>{this.props.answer}</a>
          </Typography>
          <Typography
            component="body1"
            variant="body1"
            color="textPrimary"
            gutterBottom
          >
          {this.state.wikiBlurb}
          </Typography>
          </React.Fragment>
      )
  }
}

export default Answer
