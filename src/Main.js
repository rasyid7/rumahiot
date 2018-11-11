import React from 'react';
import { StyleSheet, Text, Switch, View, ListView } from 'react-native';
import { Container, Button, Left, Header, Icon } from 'native-base'
import * as firebase from 'firebase'
import { DrawerNavigator } from 'react-navigation'

import addItem from './AddItem'

class Main extends React.Component {

    constructor() {

        super()
        this.state = {
            currentUser: null,
            listDevices: [],
        }
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        const userID = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userID + '/devices/').on('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                items.push({
                    chipID: child.val().chipID,
                    item: child.val().item,
                    state: child.val().state,
                    key: child.key
                })
            })
            if (this._isMounted) {
                this.setState({ listDevices: items })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    ToggleSwitch(value, key) {

        const userID = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + userID + '/devices/').child(key).update({ state: value });
        console.log(value + ' ' + key)
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { currentUser } = this.state

        var ld = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        var cld = ld.cloneWithRows(this.state.listDevices)

        return (

            <Container style={styles.container}>
                <Text>Hello, this is the main page!</Text>
                <Text>Hi {currentUser && currentUser.email}!</Text>

                <Button style={{ marginTop: 20 }}
                    full
                    rounded
                    primary
                    onPress={() => this.props.navigation.navigate('addItem')}
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

                <View>
                    <ListView enableEmptySections={true}
                        dataSource={cld}
                        renderRow={
                            (rowData) => <Text style={{ marginTop: 20 }}>{rowData.item}
                                <Switch
                                    onValueChange={(value) => this.ToggleSwitch(value, rowData.key)}
                                    value={rowData.state}
                                /></Text>
                        }
                    >

                    </ListView>
                </View>
            </Container>
        )
    }
}

const Drawer = DrawerNavigator({

    Main: {
      screen: Main,
      navigationOptions: {
          title: 'Dashboard',
      }
    },
    Settings: {
      screen: addItem
    },
  })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
});

export default Drawer