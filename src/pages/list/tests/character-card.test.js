import React from 'react'
import { CharacterCard } from '../character-card'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


import { shallow, mount, render } from 'enzyme';

test('Grid renders as container', () => {

    const shallowComponent = shallow(<CharacterCard character={{origin: ''}} handleDetailsClick={() =>{}} />)
    const mountComponent = mount(<CharacterCard character={{origin: ''}} handleDetailsClick={() =>{}} />)
    expect(shallowComponent).toBeDefined()
    expect(shallowComponent.debug()).toMatchSnapshot()

    // Test lifecycle method calls and all possible component states
    // console.log(shallowComponent.debug())
    // console.log(mountComponent.debug())

})
