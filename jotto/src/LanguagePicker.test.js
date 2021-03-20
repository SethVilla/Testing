import React from 'react';
// no life cycle methods dont need mount 
import {shallow} from 'enzyme';
import { checkProps, findByTestAttr } from '../test/testUtils';
import LanguagePicker from './LanguagePicker'
const mockSetLanguage = jest.fn()
const setup = () => {
    return shallow(<LanguagePicker setLanguage={mockSetLanguage}/>)
}

describe("initialization test", () => {
    it("renders without error", () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-language-picker');
        expect(component.exists()).toBe(true);

    })

    it("does not throw warning with expected props", () => {
        checkProps(LanguagePicker, {setLanguage: jest.fn()})
    })

    it("renders non-zero language icons", () => {
        const wrapper = setup();
        const languageIcons = findByTestAttr(wrapper, "language-icon");
        expect(languageIcons.length).toBeGreaterThan(0);

    })

    it("calls setLanguage Prop upon click", () => {
        const wrapper = setup();
        const languageIcons = findByTestAttr(wrapper, 'language-icon')
        const firstIcon = languageIcons.first();
        firstIcon.simulate('click');
        expect(mockSetLanguage).toHaveBeenCalled();
    })
})