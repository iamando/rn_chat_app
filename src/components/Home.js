import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import {Actions} from 'react-native-router-flux';

class Home extends React.Component {
  state = {
    name: '',
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name :</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="John Doe"
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          value={this.state.name}
        />
        <TouchableOpacity
          onPress={() => {
            Actions.chat({
              name: this.state.name,
            });
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  nameInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    padding: 5,
    paddingLeft: 15,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 20,
    color: 'blue',
  },
});

export default Home;
