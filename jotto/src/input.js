import React from 'react';
import PropTypes from 'prop-types';
import {stringsModule} from './helpers/strings';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import { getLetterMatchCount } from './helpers';

const Input = ({secretWord}) => {
const language = React.useContext(languageContext);
const [success, setSuccess] = successContext.useSuccess()
const [currentGuess, setCurrentGuess] = React.useState('');
const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();


if(success){
    return null
}
    return (
        <div data-test='component-input'>
            <form>
                <input
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={(event)=> setCurrentGuess(event.target.value)}
                />
                <button data-test="submit-button"
                onClick={(event)=> {
                    event.preventDefault();
                    const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
                    const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];
                    setGuessedWords(newGuessedWords);
                    if (currentGuess === secretWord) {
                        setSuccess(true);
                      }
                    setCurrentGuess("")}}
                    className="btn btn-primary mb-2"
                >
                   {stringsModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;