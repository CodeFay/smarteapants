import React from 'react'

import Question from './question'

export default class QuizPage extends React.Component {
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

    render() {
        return (
            <Question
                handleTextInput={ event => this.props.handleTextInput(event) }
                handleAnswerSubmit={ event => this.props.handleAnswerSubmit(event) }
                handleDelta={ value => this.props.handleDelta(value) }
                getQuestions={ () => this.props.getQuestions() }
                // showQuestion={ (i) => this.state.showQuestion(i) }
                curQuestion={ this.props.curQuestion }
                textInput={ this.props.textInput }
                showAnswer={ this.props.showAnswer }
            />
        )
    }
}
