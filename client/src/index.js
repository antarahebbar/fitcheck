import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import './index.css';

// State management tool
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// Connect to dev by root
ReactDOM.render(
<Provider store = {store} ><App /></Provider>, 
document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals