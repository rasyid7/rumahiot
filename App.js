import * as firebase from 'firebase'
import { SwitchNavigator } from 'react-navigation'

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

const App = SwitchNavigator(
  {
    Loading,
    Login,
    SignUp,
    Main,
    addItem
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App