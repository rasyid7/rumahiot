import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class SignUp extends React.Component {

    constructor(props){
      super(props)
  
      this.state = ({
        name: '',
        email: '',
        password: '',
        loading: false
      })
    }  
  
    signUpUser() {
  
      this.setState({ loading: true })
  
      const{name,email,password} = this.state
      
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
        const userID = firebase.auth().currentUser.uid
        this.setState({loading:false})
        firebase.database().ref('users/' + userID + '/id/').set(
          {
              name: name,
              age: 24
          }
        )
        this.props.navigation.navigate('Main')
      })
      .catch(() =>{
        alert('Authentication Error.')
        this.setState({loading:false})
      })
    }
  
  renderCurrentState() {

    if (this.state.loading){
      return(
        <View>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return(

    <Form>

      <Item floatingLabel>
        <Label>Name</Label>
        <Input
          autoCorrect = {false}
          autoCapitalize = "none"
          onChangeText = {(name) => this.setState({name})}
        />
      </Item>

      <Item floatingLabel>
        <Label>Email</Label>
        <Input
          autoCorrect = {false}
          autoCapitalize = "none"
          onChangeText = {(email) => this.setState({email})}
        />
      </Item>

      <Item floatingLabel>
        <Label>Password</Label>
        <Input
          secureTextEntry = {true}
          autoCorrect = {false}
          autoCapitalize = "none"
          onChangeText = {(password) => this.setState({password})}
        />
      </Item>

      <Button style={{marginTop : 20}}
        full
        rounded
        success
        onPress = {() => this.props.navigation.navigate('Login')}
      >
        <Text style={{color:'white'}}>Login</Text>
      </Button>

      <Button style={{marginTop : 20}}
        full
        rounded
        primary
        onPress = {() => this.signUpUser(this.state.email,this.state.password)}
      >
        <Text style={{color:'white'}}>Sign Up</Text>
      </Button>
    </Form>
    )
  }

  render() {
    return (
      <Container style = {styles.container}>
        {this.renderCurrentState()}
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