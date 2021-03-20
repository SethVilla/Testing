import React from 'react';
import {mount} from 'enzyme';

import {checkProps, findByTestAttr} from '../test/testUtils';
import languageContext from './contexts/languageContext'
import Input from './Input';

const setup = ({language, secretWord}) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
    return mount(
      <languageContext.Provider value={language}>
        <Input secretWord={secretWord}/>
      </languageContext.Provider>
    )
  }
  
  describe('app tests', () => {
    it("app renders without error", () => {
      const wrapper = setup({});
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    })

    it("does not throw warning with expected props", () => {
        checkProps(Input, {secretWord: 'party'})
    })
  });

  describe("state controlled input Field", () => {
      let mockSetCurrentGuess = jest.fn();
      let wrapper;
      beforeEach(()=>{
          mockSetCurrentGuess.mockClear();
          React.useState = jest.fn(() => ['', mockSetCurrentGuess])
          wrapper = setup({});

      })
      it('state updates with value of input box upon change', () => {
          const inputBox = findByTestAttr(wrapper, 'input-box');
          const mockEvent = {target : {value: 'train'}}
          inputBox.simulate('change', mockEvent)
          expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
      })

      it('field is cleared upon submit button clicked', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click', {preventDefault(){}})
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    })
  })

  describe("language picker", () => {
    let mockSetCurrentGuess = jest.fn();
    beforeEach(()=>{
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ['', mockSetCurrentGuess])
    })
    it("correctly renders submit string in english", () => {
      const wrapper = setup({language: "en"});
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.text()).toBe('Submit')
    })

    it("correctly renders congrats string in emoji", () => {
      const wrapper = setup({language: "emoji"});
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.text()).toBe('🚀');
    })
  })

