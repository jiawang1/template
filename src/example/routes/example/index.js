import React from 'react';
import { Route } from 'dva/router';
import ExamplePage from './ExamplePage';

export default () => <Route path="/" exact render={() => <ExamplePage />} />;
