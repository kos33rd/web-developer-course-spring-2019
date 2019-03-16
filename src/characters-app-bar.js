import React from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import { withRouter } from "react-router-dom"

import style from "./characters-app-bar.css"
import * as store from "./store"


class CharactersAppBar extends React.Component {

    constructor(props) {
        super(props)
        store.subscribe(this.reactToStoreUpdate)
    }

    reactToStoreUpdate = (characters) => {
        this.setState({ characters })
    }

    state = {
        searchQuery: this.props.location.pathname.replace('/characters', '').replace('/', ''),
        characters: []
    }

    handleChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
        this.props.history.replace(`/characters/${event.target.value}`)
    }

    render() {
        console.log('Rendered with state', this.state)
        const charactersCount = this.state.characters.length
        return (
            <AppBar position="static">
                <Toolbar className={style.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={style.title}>
                        Rick and Morty characters ({charactersCount})
                    </Typography>
                    <Paper elevation={1} className={style.search}>
                        <InputBase value={this.state.searchQuery} onChange={this.handleChange}/>
                    </Paper>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(CharactersAppBar)
