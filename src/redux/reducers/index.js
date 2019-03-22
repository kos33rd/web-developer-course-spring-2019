
const initialState = []

export const reducer = (oldStore = initialState, action) => {

    console.log('Reducer called with action', action)
    if(action.type === 'CHARACTERS_LIST_LOADED') {
        return action.characters
    }

    return oldStore
}
