import React, { Fragment } from "react"
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import { CharacterCard } from "./character-card"

export class CharactersList extends React.Component {

    state = { }

    componentDidMount() {
        axios
            .get('https://rickandmortyapi.com/api/character/')
            .then(response => {
                this.setState({
                    characters: response.data.results
                })
            })
    }

    render() {

        if(!this.state.characters) {
            return <h1>Loading</h1>
        }

        return (
            <Grid container spacing={16}>
                {this.state.characters.map(character =>
                    <CharacterCard key={character.name} character={character} />
                )}
            </Grid>
        )
    }
}
