import { loadCharactersActionCreator } from "./loadCharacters"


export const searchParamsChange = (values) => (dispatch) => {

    // TODO: debounce
    dispatch(loadCharactersActionCreator(values))

    if (values.query) {
        window.history.pushState(null, values.query, `/characters/${values.query}`)
    }

}
