import React from 'react'
import { Link } from 'gatsby'

const GamePicker = props => (
    <div>
        <select>
            {
                props.airDates.map(date => (<option key={ Date.parse(date) }>{ date }</option>))
            }
        </select>
        <Link
            to='/quizPage/'
            state={{ 
                curQuestion: props.curQuestion,
                showAnswer: props.showAnswer,
                textInput: props.textInput,
                handleTextInput: ev => props.handleChange(ev),                
                handleAnswerSubmit: ev => props.handleSubmit(ev),
                handleDelta: value => props.handleDelta(value),
                getQuestions: () => props.getQuestions(),
                // showQuestion: i => props.showQuestion(i)
            }}
        >Play!</Link>
    </div>
)

export default GamePicker