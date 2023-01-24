import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;




// -- Otra forma de configurar store --
// - Hay que hacer una instalacion más e importalo pero nos ahorra escritura
// - Para el composeWithDevTools:
// - npm install redux-devtools-extension
/* 
import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
*/


// -- Forma más óptima de configurar store  --
// - Es mas simple para configurar más de 1 reducer
// - Hay que hacer una instalacion más e importalo
// - npm install @reduxjs/toolkit
/* 
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';

export default configureStore({
  reducer:{reducerOne: rootReducer}
})
*/
// Redux toolkit nos provee de los siguintes metodos:
// createStore()
// createReducer()
// createAction()
// createSlice()
