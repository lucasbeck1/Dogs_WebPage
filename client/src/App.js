import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './Components/home/home'
import Landing from './Components/landing/landing'

export default function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
    </div>
    </Router>
  );
}
