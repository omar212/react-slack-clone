import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';


const isOwnMessage = (message, user) => {
  console.log("entered");
  return message.user.id === user.uid ? 'message__self' : '';
}

const timeFromNow = timestamp => moment(timestamp).fromNow();

const GetMessages = ({ message, user, pass }) => (

  <Comment>
    <Comment.Avatar src={message.user.avatar} />
        {pass}
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
  </Comment>
);

export default GetMessages;
