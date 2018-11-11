import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase'

class addItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = ({
            chipID: '',
            item: '',
            loading: false,
            state: false,
        })
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    addItem() {
        userID = firebase.auth().currentUser.uid
        chipID = this.state.chipID
        item = this.state.item

        if (chipID != '') {
            if (item == ''){
                item = 'New Device'
            }
            firebase.database().ref('users/' + userID + '/devices/' ).push(
                {
                    item: item,
                    state: false,
                    chipID: chipID
                }
            )
            this.setState({chipID:''})
            this.setState({item:''})
            alert('Device Has Been Added.')
        }
        else{
            alert('Please Input ChipID.')
        }
    }

    render() {

        return (
            <Container style={styles.container}>
                <Form>

                    <Text>This is the Page to Add new Item. You need to know the Chip ID</Text>

                    <Item floatingLabel>
                        <Label>Device Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(item) => this.setState({ item })}
                            value={this.state.item}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Chip ID</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(chipID) => this.setState({ chipID })}
                            value={this.state.chipID}
                        />
                    </Item>

                    <Button style={{ marginTop: 20 }}
                        full
                        rounded
                        success
                        onPress={() => this.addItem(this.state.chipID)}
                    >
                        <Text style={{ color: 'white' }}>Add Device</Text>
                    </Button>

                    <Button style={{ marginTop: 20 }}
                        full
                        rounded
                        primary
                        onPress={() => this.props.navigation.navigate('Main')}
                    >
                        <Text style={{ color: 'white' }}>Back</Text>
                    </Button>
                </Form>
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

export default addItem