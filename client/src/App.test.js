import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from './Redux/store';
import App from './App';
import Home from './Components/home/home';
import Card from './Components/card/card';

test('Render START button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Get Started/i);
  expect(linkElement).toBeInTheDocument();
});


test('Render Header Title', () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
  const linkElement = screen.getByText(/Dogui Pedia/i);
  expect(linkElement).toBeInTheDocument();
});


test('Render Card Sample', () => {
  render(
    <Provider store={store}>
      <Router>
        <Card name='Lucky Dogui'/>
      </Router>
    </Provider>
  );
  const linkElement = screen.getByText(/Lucky Dogui/i);
  expect(linkElement).toBeInTheDocument();
});
