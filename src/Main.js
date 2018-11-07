import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { Container, Button } from 'native-base'
import * as firebase from 'firebase'

export default class Main extends React.Component {

    state = { currentUser: null }
    componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('Loading');
        } catch (e) {
            console.log(e);
        }
    }

    test() {
        userID = firebase.auth().currentUser.uid
        firebase.database().ref('users/'+ userID).update(
            {
                angka : 3
            }
        )
    }

    render() {
        const { currentUser } = this.state
        return (
        <Container style = {styles.container}>
            <Text>Hello, this is the main page!</Text>
            <Text>Hi {currentUser && currentUser.email}!</Text>

            <Button style={{marginTop : 20}}
                full
                rounded
                primary
                onPress = {() => this.test()}
            >
                <Text style={{color:'white'}}>Add Firebase</Text>
            </Button>
            <Button style={{marginTop : 20}}
                full
                rounded
                primary
                onPress = {() => this.signOutUser()}
            >
                <Text style={{color:'white'}}>Logout</Text>
            </Button>

        </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding : 10
  },
});
