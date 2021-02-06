// import firebase from 'firebase';

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';

class Backend {
  uid = '';
  messagesRef: null;
  // initialize firebase backend
  constructor() {
    const config = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
    };
    firebase.initializeApp(config);
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        auth()
          .signInAnonymously()
          .catch((error) => {
            alert(error.message);
          });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from backend
  loadMessages(callback) {
    this.messagesRef = database().ref('messages/');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send messages to the backend
  sendMessage(message) {
    for (let i = 0; i < message.lenght; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: database().ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
