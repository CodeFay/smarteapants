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

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        // if (this.props.location.state && this.props.location.state.airDate) {
            this.getQuestions(this.props.location.state.airDate) // TODO: figure out a reliable way to get at the value `airDate`
        // } else {
        //     console.log(this.parseParamsFromPath(this.props['*']))
        //     this.getQuestions(this.parseParamsFromPath(this.props['*']))
        // }
    }

    componentWillUnmount() { // TODO: put a debugger here to try and figure out with this thing is randomly unmounting
        this._isMounted = false;
    }

    parseParamsFromPath(path) {
        const params = path.replace('quiz/', '')
        return params.split('/')[0] // only the first param is of interest
    }

    getQuestions = airDate => {
        return Axios.get('/.netlify/functions/getQuestions',
            {
                params: { airDate },
            })
            .then((res) => {
                this._isMounted && this.setState({ questions: res.data })
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
        if (this.state.textInput.length === 0 || this.state.wrongAnswer) { // no answer
          this.incCurQuestion()
          this.setState({ textInput: '' })
          return
        } else if (this.state.textInput === curQuestion.answer) { // right answer
          let value = curQuestion.value
           ? +(curQuestion.value.substring(1))
           : 100
          this.handleDelta(value)
          this.incCurQuestion()
          this.setState({ textInput: '' })
        } else { // wrong answer
          let value = -(curQuestion.value
           ? (curQuestion.value.substring(1))
           : 100)
          this.handleDelta(value)
          this.setState({ textInput: '', wrongAnswer: true })
        }
    }
    
    handleDelta = value => {
        var delta = value > 0 ? 1 : -1
        this.setState((state, props) => ({
          bank: state.bank + value,
          submitted: delta,
        }))
    }

    incCurQuestion = () => {
        this.setState( state => {
          return {
            curQuestion: ++state.curQuestion,
            wrongAnswer: false
          }
        })
    }

    render() {
        return (
            <Layout bank={ this.state.bank }>
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
