import React from 'react';
import { StyleSheet, Text, Switch } from 'react-native';
import { Container, Button } from 'native-base'
import * as firebase from 'firebase'
export default class Main extends React.Component {

    constructor() {

        super()
        this.state = {
            currentUser: null,
            switchVal: false,
            devicename: 'test',
            chipid: 123456
        }

        // this.database = this.Main.database().ref().child('devices')
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        const userID = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userID + '/devices/' + this.state.chipid).on('value', (snapshot) => {
            devicename = (snapshot.val().item)
            console.log(devicename)
            this.setState({
                devicename: devicename
            })
        })
    }

    ToggleSwitch(value) {

        const userID = firebase.auth().currentUser.uid
        this.setState({
            switchVal: value,
        })
        firebase.database().ref('users/' + userID + '/devices/' + this.state.chipid).update({
            state: !this.state.switchVal
        });
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('Loading');
        } catch (e) {
            console.log(e);
        }
    }

    addItem() {
        this.props.navigation.navigate('addItem');
    }

    render() {
        const { currentUser } = this.state
        return (
            <Container style={styles.container}>
                <Text>Hello, this is the main page!</Text>
                <Text>Hi {currentUser && currentUser.email}!</Text>

                <Text>{this.state.devicename}</Text>

                <Switch
                    onValueChange={(value) => this.ToggleSwitch(value)}
                    value={this.state.switchVal}
                />

                <Button style={{ marginTop: 20 }}
                    full
                    rounded
                    primary
                    onPress={() => this.addItem()}
                >
                    <Text style={{ color: 'white' }}>Add Item</Text>
                </Button>
                <Button style={{ marginTop: 20 }}
                    full
                    rounded
                    primary
                    onPress={() => this.signOutUser()}
                >
                    <Text style={{ color: 'white' }}>Logout</Text>
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
        padding: 10
    },
});
