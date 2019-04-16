import React from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import Checkbox from '@material-ui/core/Checkbox';

import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import style from "./characters-app-bar.css"
import * as actions from "./redux/actionCreators/searchParamsChange"

const CustomCheckbox = (props) => {
    return <Checkbox {...props} checked={props.input.value} onChange={props.input.onChange} />
}

const CustomInput = (props) => {
    return <InputBase {...props} value={props.input.value} onChange={props.input.onChange} />
}

class DumbCharactersAppBar extends React.Component {
    render() {
        console.log('Rendered with redux data', this.props.operationsCountFromRedux)
        const charactersCount = this.props.operationsCountFromRedux
        return (
            <AppBar position="static">
                <Toolbar className={style.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={style.title}>
                        Rick and Morty characters ({charactersCount})
                    </Typography>
                    <Typography variant="body1" color="inherit">
                        Alive only
                    </Typography>
                    <Field
                        name="aliveOnly"
                        component={CustomCheckbox}
                    />
                    <Paper elevation={1} className={style.search}>
                        <Field
                            name="query"
                            component={CustomInput}
                        />
                    </Paper>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    operationsCountFromRedux: state.app.characters.length
})

export default reduxForm({
    form: 'search',
    onChange: (values, dispatch) => dispatch(actions.searchParamsChange(values))
})(connect(mapStateToProps)(withRouter(DumbCharactersAppBar)))
