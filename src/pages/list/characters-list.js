import React from "react"
import axios from 'axios'
import { Grid } from '../../components/grid/grid'

import { CharacterCard } from "./character-card"

import style from './character-list.css'
import * as actionCreators from "../../redux/actionCreators"
import { connect } from "react-redux"

class CharactersList extends React.Component {

    getQuery = (props) => props.location.pathname.replace('/characters', '').replace('/', '')

    componentDidMount() {
        if(this.props.characters.length < 1) {
            this.loadCharacters(this.getQuery(this.props))
        }
    }

    loadCharacters = (name = '') => {
        const searchQuery = name ? `?name=${name}` : ''
        axios.get(`https://rickandmortyapi.com/api/character/${searchQuery}`)
            .then(response => {
                this.props.charactersListLoaded(response.data.results)
            })
            .catch((err) => {
                this.props.charactersListLoadFailed()
            })
    }

    buildDetailsClickHandler = (character) => () => {
        this.props.history.push(`/character/${character.id}`)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.location.pathname !== this.props.location.pathname) {
            this.loadCharacters(this.getQuery(nextProps))
        }
    }

    render() {
        if (this.props.loadFailed) {
            return <h3>Error loading data from API</h3>
        }

        return (
            <div className={style.body}>
                <h3 className={style.title}>Now with <span className={style.rainbow}>flexbox</span></h3>
                <Grid container>
                    {this.props.characters.map((character) =>
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

const mapStateToProps = (state) => ({
    characters: state.characters,
    loadFailed: state.charactersLoadingFailed
})

const mapDispatchToProps = (dispatch) => ({
    charactersListLoaded: (characters) => {
        dispatch(actionCreators.charactersListLoaded(characters))
    },
    charactersListLoadFailed: () => {
        dispatch(actionCreators.charactersListLoadFailed())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
