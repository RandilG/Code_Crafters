/**
 * @format
 */

import { Provider } from "react-native-paper"

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


// /**
//  * @format
//  */

// import * as React from 'react';
// import {AppRegistry} from 'react-native';
// import {Provider} from 'react-redux'
// import App from './App';
// import {name as appName} from './app.json';
// import store from './Redux/Store'

// const provider = () => {
//   return(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
// }

// AppRegistry.registerComponent(appName, () => provider);

