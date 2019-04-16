import axios from "axios"
import * as actionCreators from "./index"


export const loadCharactersActionCreator = (values = {}) => (dispatch) => {
    const { query, aliveOnly } = values

    const queryParams = []

    if (query) {
        queryParams.push(`name=${query}`)
    }

    if (aliveOnly) {
        queryParams.push('status=alive')
    }

    const searchQuery = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

    axios.get(`https://rickandmortyapi.com/api/character/${searchQuery}`)
        .then(response => {
            dispatch(actionCreators.charactersListLoaded(response.data.results))
        })
        .catch((err) => {
            dispatch(actionCreators.charactersListLoadFailed())
        })
}
