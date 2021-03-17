import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import checkPropTypes from 'check-prop-types';

import Congrats from './Congrats';
import {findByTestAttr} from '../test/testUtils'

Enzyme.configure({adapter: new Adapter()})

const defaultProps = {success: false};

// taking default first and be over ridden by props after
const setup = (props = {success: false}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Congrats {...setupProps}/>)
}

describe("is initialized", () => {
    it("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1)

    })

    it("renders no text when success prop is false", () => {
        const wrapper = setup({success: false});
        const component = findByTestAttr(wrapper, 'component-congrats');
        expect(component.text()).toBe('')
    })

    it('renders non-empty congrats message when success prop is true', () => {
        const wrapper = setup({success: true});
        const message = findByTestAttr(wrapper, 'congrats-message');
        expect(message.text().length).not.toBe(0);
    })

    it("does not throw warning with expected props", () => {
        const expectedProps = {success: false}
        // Pass propTypes Object
        // expected props
        // type prop
        // component name
        const propError = checkPropTypes(Congrats.propTypes, expectedProps, 'prop', Congrats.name)
        expect(propError).toBeUndefined();
    })
})