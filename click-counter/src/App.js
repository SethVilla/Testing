import React, {useState} from 'react';
import './App.css';

const errorMessage = 'You cannot be below 0';

function App() {
  const [count, setCount] = useState(0);
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  return (
    <div className="App" data-test="component-app">
      <h1 data-test="counter-display"> the counter is {' '}
      <span data-test='count'>{count}</span>
      </h1>
      <button data-test="increment-button"
      onClick={()=> {
        setCount(count + 1)
        setIsErrorMessage(false)
        }}>Increment Button</button>
      <button data-test="decrement-button" onClick={() => {
        if(!count){
          setIsErrorMessage(true);
        }
        setCount(count > 0 ? count - 1 : 0)
        }}>Decrement</button>
      {isErrorMessage ? <div data-test="error-message">{errorMessage}</div> : null}
    </div>
  );
}

export default App;
