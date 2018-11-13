import React from 'react'

import Layout from '../components/layout'
import Quiz from '../components/quiz'

export default class QuizPage extends React.Component {
    render() {
        return (
            <Layout>
                <Quiz
                    curQuestion={ this.state.questions[this.state.curQuestion].data }
                    showAnswer={ this.state.showAnswer }
                    textInput={ this.state.textInput }
                    handleTextInput={ ev => this.handleChange(ev) }
                    handleAnswerSubmit={ ev => this.handleSubmit(ev)}
                    handleDelta={ value => this.handleDelta(value) }
                    getQuestions={ () => this.getQuestions() }
                />
            </Layout>
        )
    }
}