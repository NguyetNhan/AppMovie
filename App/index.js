/**
 * @format
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { name as appName } from './app.json';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducer from './src/reducers/allReducer';

import rootSaga from './src/sagas/rootSaga';


// khai báo các màn hình

import ListFilm from './src/home/containers/ListFilmContainer';
import Login from './src/login/containers/LoginContainer';
import Register from './src/register/containers/RegisterContainer';
import DetailFilm from './src/detail_film/containers/DetailFilm';
import ForgetPassword from './src/forget_password/containers/ForgetPasswordContainer';

const AppNavigator = createStackNavigator({
  ListFilm: {
    screen: ListFilm,
  },
  DetailFilm: {
    screen: DetailFilm,
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      header: null,
    },
  },
},
  {
    initialRouteName: 'ListFilm',
  });

//  thay thế màn hình
/* const prevGetStateForActionAppNavigator = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionAppNavigator(action, state);
} */


const sagaMiddleware = createSagaMiddleware();

let store = createStore(allReducer, applyMiddleware(sagaMiddleware));

let Navigation = createAppContainer(AppNavigator);
sagaMiddleware.run(rootSaga);
export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);