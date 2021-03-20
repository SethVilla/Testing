import React from 'react';
import {shallow, mount} from 'enzyme';
import Congrats from './Congrats';
import {findByTestAttr} from '../test/testUtils';
import languageContext from './contexts/languageContext'
import successContext from './contexts/successContext'


// taking default first and be over ridden by props after
const setup = ({success, language}) => {
    language = language || 'en';
    success = success || false;
    return mount(<languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats/>
        </successContext.SuccessProvider>
    </languageContext.Provider>)
}

describe("is initialized", () => {
    it("renders without error", () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1)

    })

    it("renders no text when success is false", () => {
        const wrapper = setup({success: false});
        const component = findByTestAttr(wrapper, 'component-congrats');
        expect(component.text()).toBe('')
    })

    it('renders non-empty congrats message when success is true', () => {
        const wrapper = setup({success: true});
        const message = findByTestAttr(wrapper, 'congrats-message');
        expect(message.text().length).not.toBe(0);
    })

    // it("does not throw warning with expected props", () => {
    //     const expectedProps = {success: false}
    //     checkProps(Congrats, expectedProps)
    // })
})

describe("language Picker", () => {

    it('correctly renders congrats string in English', () => {
        const wrapper = setup({success: true});
        expect(wrapper.text()).toBe("Congratulations! You guessed the word!")
    })

    it("correctly renders congrats string in emoji", () => {
        const wrapper = setup({success: true, language: 'emoji'});
        expect(wrapper.text()).toBe('🎯🎉')

    })

})