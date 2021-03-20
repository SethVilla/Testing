import React from 'react';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import './App.css';
import hookactions from './actions/hookactions';
import Input from './input';
import languageContext from './contexts/languageContext'
import LanguagePicker from './LanguagePicker'

/**
 * 
 * @param {object} state existing state
 * @param {object} action contains type and payload for the state update
 * @returns {object}
 */
const reducer = (state, action) => {
  console.log(state, action )
  switch (action.type){
    case "setSecretWord":
      return {...state, secretWord: action.payload}
    case "setLanguage":
      return {...state, language: action.payload}
    default:
      throw new Error(`invalid action type: ${action.type}`)
  }
}

const App = () =>  {
  const [state, dispatch] = React.useReducer(reducer, {secretWord: "", language: 'en' })
  const setSecretWord = (secretWord) => dispatch({type: "setSecretWord", payload: secretWord})
  const setLanguage = (language) => dispatch({type: 'setLanguage', payload: language})
React.useEffect(() => {
  hookactions.getSecretWord(setSecretWord);
}, [])

if(!state.secretWord){
  return (
    <div className="container" data-test='spinner'>
      <div className="spinner-border" role="status">
        <span className="sr-only">
          Loading ...
        </span>
        <p>
          Loading Secret Word
        </p>
      </div>
    </div>
  )
}

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
      <Input secretWord={state.secretWord}/>
      {/* <Congrats success={true}/>
      <GuessedWords guessedWords={[
        {guessedWord: 'train', letterMatchCount: 3}
      ]}/> */}
      </languageContext.Provider>
    </div>
  );
}

export default App;
