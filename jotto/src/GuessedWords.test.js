import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from '../test/testUtils';

import GuessedWords from './GuessedWords';
const defaultProps ={
    guessedWords: [{guessedWord: 'train', letterMatchCount: 3}]
}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessedWords {...setupProps}/>)
}

describe("Guesswords test", () => {
    describe("initialization tests", () => {
        it('does not throw warning with expected props', () => {
            checkProps(GuessedWords, defaultProps)
        })
    })

    describe("if there are no words guessed", () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setup({
                guessedWords : []
            })
        })

        it("renders without error", () => {
            const component = findByTestAttr(wrapper, 'component-guessed-words');
            expect(component.length).toBe(1)
        })

        it("renders instructions to guess a word", () => {
            const instructions = findByTestAttr(wrapper, 'guess-instructions' )
            expect(instructions.text().length).not.toBe(0)
        })
    })

    describe("if there are words guessed", () => {
        
    })
})


