import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import { SwitchNavigator } from 'react-navigation'

import Main from './src/Main'
import Auth from './src/user/Auth'
import Loading from './src/Loading'

const firebaseConfig = {
  apiKey: "AIzaSyBwIKkPKiujU9oULyJ9ZPt8WibmGCql_oQ",
  authDomain: "rumahiot-dev.firebaseapp.com",
  databaseURL: "https://rumahiot-dev.firebaseio.com",
  projectId: "rumahiot-dev",
  storageBucket: "rumahiot-dev.appspot.com",
  messagingSenderId: "150807865456"
}

firebase.initializeApp(firebaseConfig);

const App = SwitchNavigator(
  {
    Loading,
    Auth,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App