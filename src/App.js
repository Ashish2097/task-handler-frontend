import logo from './logo.svg';
import './App.css';
import Main from '../src/components/pages/Main';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;
