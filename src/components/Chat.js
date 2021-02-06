import React from 'react';
import PropTypes from 'prop-types';

import {GiftedChat} from 'react-native-gifted-chat';

import Firebase from '../services/Firebase';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

class Chat extends React.Component {
  state = {
    messages: [],
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {
    Firebase.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }

  componentWillUnmount() {
    Firebase.closeChat();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
          Firebase.sendMessage(message);
        }}
        user={{
          _id: Firebase.getUid(),
          name: this.props.name,
        }}
      />
    );
  }
}

Chat.defaultProps = {
  name: 'John',
};

Chat.propTypes = {
  name: PropTypes.string,
};

export default Chat;
