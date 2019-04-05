import React from 'react'
import { Grid } from '../grid'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';

test('Grid renders as container', () => {

    const component = shallow(
        <Grid container>
            <Grid item>Test</Grid>
        </Grid>)
    expect(component).toBeDefined()

    // console.log(component.debug())

})

test('Grid renders as item', () => {

    const component = shallow(
        <Grid item>
            <Grid item>Test</Grid>
        </Grid>)
    expect(component).toBeDefined()

    // console.log(component.debug())

})
