

const subscribers = []

let store = []

export const charactersListLoaded = (characters) => ({
    type: 'CHARACTERS_LIST_LOADED',
    characters
})

const reducer = (action, oldStore) => {

    if(action.type === 'CHARACTERS_LIST_LOADED') {
        return action.characters
    }
    return oldStore
}

export const dispatch = (action) => {
    console.log('Dispatched action:', action)
    store = reducer(action, store)
    subscribers.forEach((subscriber) => {
        subscriber(store)
    })
}

export const getState = () => store

export const subscribe = (fn) => {
    subscribers.push(fn)
}
