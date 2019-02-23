import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { CharactersList } from "./pages/list/characters-list"
import { CharacterDetails } from "./pages/details/character-details"

import CharactersAppBar from "./characters-app-bar"

ReactDOM.render(
    <BrowserRouter>
        <main>
            <CharactersAppBar/>
            <Switch>
                <Route path="/characters" component={CharactersList}/>
                <Route path="/character/:id" component={CharacterDetails}/>
                <Redirect from="*" to="/characters"/>
            </Switch>
        </main>
    </BrowserRouter>,
    document.getElementById('app')
);
