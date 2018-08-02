import React from 'react';
import dva from 'dva';
import { Router } from 'dva/router';
import logger from 'redux-logger';
import createLoading from 'dva-loading';
import Routes from './routes';
import * as models from './models';

const option = {};

if (process.env.NODE_ENV === 'development') {
  option.onAction = logger;
}

const app = dva(option);
app.use(createLoading());

Object.keys(models).forEach(key => app.model(models[key]));

app.router(({ history }) => (
  <Router history={history}>
    <React.Fragment>
      <Routes />
    </React.Fragment>
  </Router>
));

app.start('#root');
