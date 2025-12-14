import logo from './logo.svg';

import { JSONInputComponent } from './components/json-input-component/JSONInputComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <JSONInputComponent/>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;
