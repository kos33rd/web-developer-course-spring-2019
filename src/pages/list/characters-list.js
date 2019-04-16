import React from "react"
import { Grid } from '../../components/grid/grid'

import { CharacterCard } from "./character-card"

import style from './character-list.css'
import { connect } from "react-redux"
import { loadCharactersActionCreator } from "../../redux/actionCreators/loadCharacters"


class CharactersList extends React.Component {

    getQuery = (props) => props.location.pathname.replace('/characters', '').replace('/', '')

    componentDidMount() {
        if(this.props.characters.length < 1) {
            this.props.loadCharacters(this.getQuery(this.props))
        }
    }

    buildDetailsClickHandler = (character) => () => {
        this.props.history.push(`/character/${character.id}`)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.location.pathname !== this.props.location.pathname) {
            this.props.loadCharacters(this.getQuery(nextProps))
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
    characters: state.app.characters,
    loadFailed: state.app.charactersLoadingFailed
})

const mapDispatchToProps = (dispatch) => ({
    loadCharacters: (query) => dispatch(loadCharactersActionCreator(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
