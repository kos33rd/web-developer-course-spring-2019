import React from "react"
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import { CharacterCard } from "./character-card"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import TextField from "@material-ui/core/TextField"
import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"

import style from './characters-list.css'

export class CharactersList extends React.Component {

    state = {
        searchQuery: ''
    }

    componentDidMount() {
        this.loadCharacters()
    }

    loadCharacters = (name = '') => {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`)
            .then(response => {
                this.setState({ characters: response.data.results })
            })
    }

    handleChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
        this.loadCharacters(event.target.value)
    }

    render() {
        if (!this.state.characters) {
            return <h1>Loading...</h1>
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar className={style.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={style.title}>
                            Rick and Morty persons
                        </Typography>
                        <Paper elevation={1} className={style.search}>
                            <InputBase value={this.state.searchQuery} onChange={this.handleChange}/>
                        </Paper>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={16}>
                    {this.state.characters.map((character, idx) =>
                        <CharacterCard key={character.id} character={character}/>
                    )}
                </Grid>
            </div>
        )
    }
}
