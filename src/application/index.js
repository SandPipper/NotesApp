import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import registerServiceWorker from './register-service-worker';

import 'assets/sass/style.scss';
import Root from './routes/Root.jsx';
import createStore from './store';
import { initializeAction } from './services/Application/aids/actions';

// media-query rules for window.matchMedia()
const mediaQuery = [
    {
        id: 'large',
        minWidth: 992,
    },
    {
        id: 'medium',
        minWidth: 768,
    },
    {
        id: 'small',
        minWidth: 640,
    },
];

const store = createStore({});

const render = Component =>
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>,
        document.getElementById('root'),
    );

if (module.hot) module.hot.accept('./routes/Root', () => render(Root));

store.dispatch(initializeAction({
    media: mediaQuery,
}));

registerServiceWorker();
render(Root);