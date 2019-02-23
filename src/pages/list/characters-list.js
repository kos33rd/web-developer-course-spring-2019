import React from "react"
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import { CharacterCard } from "./character-card"

export class CharactersList extends React.Component {

    state = { }

    getQuery = (props) => props.location.pathname.replace('/characters', '').replace('/', '')

    componentDidMount() {
        this.loadCharacters(this.getQuery(this.props))
    }

    loadCharacters = (name = '') => {
        const searchQuery = name ? `?name=${name}` : ''
        this.setState({ error: void 0 })
        axios.get(`https://rickandmortyapi.com/api/character/${searchQuery}`)
            .then(response => {
                this.setState({ characters: response.data.results })
            })
            .catch((err) => {
                this.setState({
                    error: 'No results from API'
                })
            })
    }

    buildDetailsClickHandler = (character) => () => {
        this.props.history.push(`/character/${character.id}`)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.loadCharacters(this.getQuery(nextProps))
    }

    render() {

        if (this.state.error) {
            return <h3>{this.state.error}</h3>
        }

        if (!this.state.characters) {
            return <h1>Loading...</h1>
        }

        return (
            <div>
                <Grid container spacing={16}>
                    {this.state.characters.map((character) =>
                        <CharacterCard
                            key={character.id}
                            character={character}
                            handleDetailsClick={this.buildDetailsClickHandler(character)}
                        />
                    )}
                </Grid>
            </div>
        )
    }
}
