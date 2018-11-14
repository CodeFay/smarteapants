import React from 'react'

import Layout from '../components/layout'
import Question from '../components/question'

import Axios from 'axios'

export default class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textInput: '',
            bank: 0,
            submitted: 0,
            questions: [
              {
                data: {
                  question: '',
                  category: '',
                  value: '',
                  answer: ''
                }
              }
            ],
            curQuestion: 0,
            wrongAnswer: false
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state.showNum)
            this.getQuestions(this.props.location.state.showNum, data => {
                this.setState({ questions: data })
            })
    }

    getQuestions = (showNum, callback) => {
        return Axios.get('/.netlify/functions/getQuestions',
            {
                params: { showNum }
            })
            .then(async (res) => {
                await callback(res.data)
            }).catch((err) => {
                console.log('API error', err)
            })
    }

    handleTextInput = event => {
        this.setState({ textInput: event.target.value })
    }
      
    handleAnswerSubmit = event => {
        const curIndex = this.state.curQuestion
        const curQuestion = this.state.questions[curIndex].data
        event.preventDefault()
        if (this.state.input.length === 0 || this.state.wrongAnswer) { // no answer
          this.incCurQuestion()
          this.setState({ input: '' })
          return
        } else if (this.state.input === curQuestion.answer) { // right answer
          let value = curQuestion.value
           ? +(curQuestion.value.substring(1))
           : 100
          this.handleDelta(value)
          this.incCurQuestion()
          this.setState({ input: '' })
        } else { // wrong answer
          let value = -(curQuestion.value
           ? (curQuestion.value.substring(1))
           : 100)
          this.handleDelta(value)
          this.setState({ input: '', wrongAnswer: true })
        }
    }
    
    handleDelta = value => {
        var delta = value > 0 ? 1 : -1
        this.setState((state, props) => ({
          bank: state.bank + value,
          submitted: delta,
        }))
    }

    incrCurQuestion = () => {
        this.setState( state => {
          return {
            curQuestion: ++state.curQuestion,
            wrongAnswer: false
          }
        })
    }

    render() {
        return (
            <Layout>
                <Question
                    handleTextInput={ event => this.handleTextInput(event) }
                    handleAnswerSubmit={ event => this.handleAnswerSubmit(event) }
                    handleDelta={ value => this.handleDelta(value) }
                    curQuestion={ this.state.questions[this.state.curQuestion].data }
                    textInput={ this.state.textInput }
                    showAnswer={ this.state.showAnswer }
                />
            </Layout>
        )
    }
}
