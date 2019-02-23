import style from "./pages/list/characters-list.css"
import React from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import { withRouter } from "react-router-dom"

class CharactersAppBar extends React.Component {
    state = {
        searchQuery: this.props.location.pathname.replace('/characters', '').replace('/', '')
    }

    handleChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
        this.props.history.replace(`/characters/${event.target.value}`)
    }

    render() {
        return (
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
        )
    }
}

export default withRouter(CharactersAppBar)
