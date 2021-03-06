import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import firebase from 'firebase';
import App from './containers/App';
import Blog from './containers/Blog';
import New from './containers/New';
import rootReducer from './reducers';
import rootSaga from './sagas';
import firebaseConfig from './config/firebase';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

/**
 * You can save your config settings in a firebase config file
 * `config/firebase.js` or
 * uncomment the code block below and fill in the details:
 */

// firebase.initializeApp({
//    apiKey: '<YOUR API KEY>',
//    authDomain: '<YOUR APP NAME>.firebaseapp.com',
//    databaseURL: 'https://<YOUR APP NAME>.firebaseio.com',
//    storageBucket: '<YOUR APP NAME>.appspot.com'
// });

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Blog} />
                <Route path="new" component={New} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

