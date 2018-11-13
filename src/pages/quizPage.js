import React from 'react'

import Question from '../components/question'

export default class QuizPage extends React.Component {
    render() {
        return (
            <Question
                handleTextInput={ event => this.state.handleTextInput(event) }
                handleAnswerSubmit={ event => this.state.handleAnswerSubmit(event) }
                handleDelta={ value => this.state.handleDelta(value) }
                getQuestions={ () => this.state.getQuestions() }
                // showQuestion={ (i) => this.state.showQuestion(i) }
                curQuestion={ location.state.curQuestion }
                textInput={ location.state.textInput }
                showAnswer={ location.state.showAnswer }
            />
        )
    }
}
