import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { Segment, Input, Button } from 'semantic-ui-react';

class MessagesForm extends React.Component {

   state = {
     message: '',
     messagesRef: this.props.messagesRef,
     channel: this.props.currentChannel,
     user: this.props.currentUser,
     loading: false,
     errors: []
   }

   createMessage = () => {
       const message = {
         timestamp: firebase.database.ServerValue.TIMESTAMP,
         user: {
           id: this.state.user.uid,
           name: this.state.user.displayName,
           avatar: this.state.user.photoURL
         },
         content: this.state.message
       }
       console.log("message is: ", message);
       return message;
   }

   handleChange = event => {
     this.setState({ [event.target.name]: event.target.value });
   }

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel, user } = this.state;

    if(message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', errors: []})
         })
        .catch(err => {
             console.error(err);
             this.setState({
                 loading: false,
                 errors: this.state.errors.concat(err)
               })
        })
        //messagesRef.on("value", function(snapshot) {
            /* const parent = snapshot.val().child(channel.id);
            const child = Object.keys(parent);
            const small_child = child[0];
            const child_keys = Object.keys(child)
            const final_key = Object.keys(child_keys)
            const channel_id = channel.id;
            const user_id = user.uid;

            console.log("final_key: ", final_key);
            console.log("user id: ", user_id);
            console.log("channel id: ", channel_id);
            console.log("parent: ", parent);
            console.log("child: ",child);
            console.log("small_child: ", small_child);
            console.log("child_keys: ",child_keys);*/

            //for(var i = 0; i < keys.length; i++){
                //var k = keys[i];
                //var content = object[k].content;
                //var id = object[k].id;
                //console.log("keys: ", k);
                //console.log("content: ", content ,"\n id: ",id);
            //}
            // }, function (errorObject) {
            //    console.log("The read failed: " + errorObject.code);
            // });
      }
      else {
        this.setState({
            errors: this.state.errors.concat({ message: 'Add a message'})
        })
      }
   }

  render() {

    const { errors, message, loading } = this.state;

    return(
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          value = {message}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon={'add'} />}
          labelPosition="left"
          onChange={this.handleChange}
          className = {
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage} //calling it
            color="orange"
            content="Add Reply"
            disabled={loading}
            labelPosition="left"
            icon="edit"
            />
          <Button
            color="blue"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
              />
        </Button.Group>
      </Segment>
    )
 }
}


export default MessagesForm;
