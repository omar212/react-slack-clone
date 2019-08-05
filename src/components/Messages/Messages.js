import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessageForm';
import GetMessages from './GetMessage';


class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: [],
    messagesLoading: true
  }

  componentDidMount() {
    const { channel, user } = this.state;

    if(channel && user) {
      console.log("channel from the message component is", channel);
      console.log("user from the message component is", user);
      this.addListeners(channel.id)
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      const ob = snap.val();
      const content = ob.content;
      console.log("snap.val(): ", snap.val());
      console.log("content of snap is: ", content);
      loadedMessages.push(snap.val());
      console.log(loadedMessages);
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      console.log("loaded messages: ", this.state.messages);
    });
  };

  displayMessages = messages => {
    console.log("entered the display messages");
    messages.length > 0 && messages.map(message => (
      <React.Fragment>
      <h1>{message.content}</h1>
      <GetMessages
        pass = {<h1>hello</h1>}
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
      </React.Fragment>
    ))
  }
  render(){
    const { messagesRef, channel, user, messages } = this.state;

    return(
      <React.Fragment>
        <MessagesHeader />
      <Segment className="messages" style={{paddingRight: '520px'}}>
          <Comment.Group>
            {this.displayMessages(messages)}
          </Comment.Group>
      </Segment>
        <MessagesForm
            messagesRef={messagesRef}
            currentChannel={channel}
            currentUser={user}
         />
      </React.Fragment>
    );
  }
}

export default Messages;
