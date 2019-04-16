import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const combinedReducer = combineReducers({
    app: reducer,
    form: formReducer
});

export const store = createStore(
    combinedReducer,
    compose(
        applyMiddleware(thunk),
        composeWithDevTools()
    )
)
