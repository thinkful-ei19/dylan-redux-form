import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './components/Form';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Form />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
