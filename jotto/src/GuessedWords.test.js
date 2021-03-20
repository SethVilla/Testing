import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from '../test/testUtils';
import guessedWordsContext from './contexts/guessedWordsContext';

import GuessedWords from './GuessedWords';

// const defaultProps ={
//     guessedWords: [{guessedWord: 'train', letterMatchCount: 3}]
// }

const setup = (guessedWords = []) => {
    const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()])
    guessedWordsContext.useGuessedWords = mockUseGuessedWords;
    // const setupProps = {...defaultProps, ...props};
    //return shallow(<GuessedWords {...setupProps}/>
    return shallow(<GuessedWords />)
}

describe("Guesswords test", () => {
    // describe("initialization tests", () => {
    //     it('does not throw warning with expected props', () => {
    //         checkProps(GuessedWords, defaultProps)
    //     })
    // })

    describe("if there are no words guessed", () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setup(
                []
            )
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
        let wrapper;
        const guessedWords = [
            {
                guessedWord: 'train', letterMatchCount: 3
            },
            {
                guessedWord: 'agile', letterMatchCount: 1
            },
            {
                guessedWord: 'party', letterMatchCount: 5
            }
        ];
        beforeEach(() => {
            wrapper = setup(guessedWords)
        })
        it("renders without error", () => {
            const component = findByTestAttr(wrapper, 'component-guessed-words');
            expect(component.length).toBe(1)
        })

        it("renders guessed words section", () => {
            const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words')
            expect(guessedWordsNode.length).toBe(1)
        })

        it('correct number of guessed words', () => {
            const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word')
            expect(guessedWordNodes.length).toBe(guessedWords.length)
        })

    })
})

describe("language Picker", () => {
    it("correctly renders guess instructions string in English by default", () => {
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
        expect(guessInstructions.text()).toBe('Try to guess the secret word!')
    })

    it("correctly renders guess instruction string in emoji", () => {
        const mockUseContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUseContext;
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
        expect(guessInstructions.text()).toBe('🤔🤫🔤')
    })
})

