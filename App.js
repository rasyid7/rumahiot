import * as firebase from 'firebase'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import Main from './src/Main'
import Login from './src/user/Login'
import SignUp from './src/user/SignUp'
import Loading from './src/Loading'
import addItem from './src/AddItem'

const firebaseConfig = {
  apiKey: "AIzaSyBwIKkPKiujU9oULyJ9ZPt8WibmGCql_oQ",
  authDomain: "rumahiot-dev.firebaseapp.com",
  databaseURL: "https://rumahiot-dev.firebaseio.com",
  projectId: "rumahiot-dev",
  storageBucket: "rumahiot-dev.appspot.com",
  messagingSenderId: "150807865456"
}

firebase.initializeApp(firebaseConfig);

const App = StackNavigator(
  {
    Loading: {screen: Loading},
    Login: {screen: Login, navigationOptions: {
      title: 'Login',
      headerLeft: null,
      gesturesEnabled: false
  }},
    SignUp: {screen: SignUp, navigationOptions: {
      title: 'SignUp'
  }},
    Main: {screen: Main, navigationOptions: {
      title: 'Dashboard',
      headerLeft: null,
      gesturesEnabled: false
  }},
    addItem: {screen: addItem}
  },
  {
    initialRouteName: 'Loading'
  }
)

export default App