import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router';

import Checkout from '../modules/checkout';
import Resultado from '../modules/resultado';
import Timeline from '../modules/timeline';
import Stepper from '../organism/stepper';
import Mapa from '../modules/mapa';

export default () => (
  <Router history={hashHistory}>
    <Route path='/home' component={Stepper} />
    <Route path='/checkout' component={Checkout} />
    <Route path='/resultado' component={Resultado} />
		<Route path='/timeline' component={Timeline} />
		<Route path='/mapa' component={Mapa} />
    <Redirect from='*' to='/home' />
  </Router>
)