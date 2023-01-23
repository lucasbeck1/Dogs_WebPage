import "./App.css";
//import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Components/home/home";
import Landing from "./Components/landing/landing";
import CreateForm from "./Components/createForm/createForm";
import Detail from "./Components/detail/detail";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateForm} />
        <Route exact path="/detail/:id" component={Detail} />
      </div>
    </Router>
  );
}
