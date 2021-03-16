import './App.css';

function App() {
  return (
    <div className="App" data-test="component-app">
      <h1 data-test="counter-display"> the counter is 1</h1>
      <button data-test="increment-button">Increment Button</button>
    </div>
  );
}

export default App;
