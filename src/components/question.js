import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: {
        category: "ESPN's TOP 10 ALL-TIME ATHLETES",
        air_date: '2004-12-31',
        question:
          "'No. 2: 1912 Olympian; football star at Carlisle Indian School; 6 MLB seasons with the Reds, Giants & Braves'",
        value: '$200',
        answer: 'Jim Thorpe',
        round: 'Jeopardy!',
        show_number: '4680',
      },
    }
  }

  render() {
    return (
      <main>
        <Paper>
          <Typography component="h1" variant="h4" align="center">
            Prompt
          </Typography>
          <Typography component="h1" variant="h6" align="center">
            {this.state.question.question}
          </Typography>
        </Paper>
      </main>
    )
  }
}

export default Question
