import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import home from './Components/home/home'
import landing from './Components/landing/landing'

export default function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path='/' component={landing}/>
      <Route exact path='/home' component={home}/>
    </div>
    </Router>
  );
}
