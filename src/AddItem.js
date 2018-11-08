import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase'

export default class addItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = ({
            chipID: '',
            item: '',
            loading: false
        })
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    addItem() {
        userID = firebase.auth().currentUser.uid
        chipID = this.state.chipID

        if (chipID != '') {
            firebase.database().ref('users/' + userID + '/devices/' + chipID).set(
                {
                    item: 'New Item'
                }
            )
        }
        else{
            alert('Please Input ChipID.')
        }
        this.props.navigation.navigate('Main')
    }

    render() {

        return (
            <Container style={styles.container}>
                <Form>

                    <Text>This is the Page to Add new Item. You need to know the Chip ID</Text>

                    <Item floatingLabel>
                        <Label>Chip ID</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(chipID) => this.setState({ chipID })}
                        />
                    </Item>

                    <Button style={{ marginTop: 20 }}
                        full
                        rounded
                        success
                        onPress={() => this.addItem(this.state.chipID)}
                    >
                        <Text style={{ color: 'white' }}>Add Chip ID</Text>
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
