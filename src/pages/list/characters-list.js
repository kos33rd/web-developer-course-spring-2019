import React from "react"
import axios from 'axios'
import { Grid } from '../../components/grid/grid'

import { CharacterCard } from "./character-card"
import * as store from '../../store'

import style from './character-list.css'

export class CharactersList extends React.Component {

    state = {
        characters: store.getState()
    }

    getQuery = (props) => props.location.pathname.replace('/characters', '').replace('/', '')

    componentDidMount() {
        if(this.state.characters.length < 1) {
            this.loadCharacters(this.getQuery(this.props))
        }
    }

    loadCharacters = (name = '') => {
        const searchQuery = name ? `?name=${name}` : ''
        this.setState({ error: void 0 })
        axios.get(`https://rickandmortyapi.com/api/character/${searchQuery}`)
            .then(response => {
                this.setState({ characters: response.data.results })
                const action = store.charactersListLoaded(response.data.results)
                store.dispatch(action)
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
            <div className={style.body}>
                <h3 className={style.title}>Now with <span className={style.rainbow}>flexbox</span></h3>
                <Grid container>
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
