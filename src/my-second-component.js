import React from "react"
import axios from 'axios'

export class MySecondComponent extends React.Component {

    state = { count: this.props.initialCount }

    componentDidMount() {
        axios
            .get('https://rickandmortyapi.com/api/character/')
            .then(response => {
                console.log('Axios returned', response.data.results)
            })
    }

    render() {
        return (
            <div>
                <span style={{ color: this.props.color }}>
                    Count: {this.state.count}
                </span>
            </div>
        )
    }
}
