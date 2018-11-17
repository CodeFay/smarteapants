import React from 'react'
import { Link } from 'gatsby'

export default class GamePicker extends React.Component {
    render() {
        return (
            <div>
                <select>
                    {
                        this.props.airDates.map(date => (<option key={ Date.parse(date) }>{ date }</option>))
                    }
                </select>
                <Link
                    to={ `/quiz/${this.props.curShowNum}` }
                    state={{ showNum: this.props.curShowNum  }}
                >Play!</Link>
            </div>
        )
    }
}
