// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';

// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App'; // Adjust the path accordingly
import store from './redux/store'; // Adjust the path accordingly
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the main component
AppRegistry.registerComponent('AgentApp', () => Main);
