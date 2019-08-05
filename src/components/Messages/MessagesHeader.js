import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

/* clearing: helps to float items from one to another*/
class MessagesHeader extends React.Component {
  render() {
    return (
      <Segment clearing style={{paddingRight: '520px'}}>
       {/*Channel Title*/}
        <Header
            fluid="true"
            as="h2"
            floated="left"
            style={{marginBottom: 0}}
         >
          <span>
          Channel
          <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2 users</Header.Subheader>
        </Header>

        {/*Channel Search Input*/}
        <Header float="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
          </Header>
      </Segment>
    )
  }
}

export default MessagesHeader;
