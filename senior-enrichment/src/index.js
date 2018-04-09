import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux'; //subscribe & unsubscribe from store

import App from './App';

const root = document.getElementById('root');
render(( 
    <Provider store={ store }>
        <App />
    </Provider>
), root);