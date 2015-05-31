import React from 'react';
import Marty, { ApplicationContainer } from 'marty';
import AppView from './app';
import AppFlux from './flux';

const appFlux = new AppFlux();

React.render(
  <ApplicationContainer app={appFlux}>
    <AppView />
  </ApplicationContainer>,
  document.body
);

window.React = React;
window.Marty = Marty;
