import React from 'react'

import { Link } from 'gatsby'

export default class GamePicker extends React.Component {
    render() {
        return (
            <div>
                <select onChange={ ev => this.props.handleSelect(ev) }>
                    {
                        this.props.airDates.map(date => (<option key={ Date.parse(date) }>{ date }</option>))
                    }
                </select>
                <Link
                    onClick={ () => this.props.handleSubmit() }
                    to={ `/quiz/${this.props.curAirDate}` }
                    state={{ airDate: this.props.curAirDate  }}
                >Play!</Link>
            </div>
        )
    }
}
