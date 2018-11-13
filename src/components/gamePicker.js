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
            to={ `/quiz/${props.curShowNum}` }
            state={{ showNum: props.curShowNum  }}
        >Play!</Link>
    </div>
)

export default GamePicker