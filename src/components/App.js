import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import Messages from './Messages/Messages';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import MetaPanel from './MetaPanel/MetaPanel';
import './App.css';

              /****    destructing     *****/
const App = ({ currentUser, currentChannel }) => (
  <Grid column="equal" className="app" style={{background: '#eee'}}>
    <ColorPanel />
    <SidePanel
      key={currentUser && currentUser.uid}
      currentUser={currentUser} />

    <Grid.Column style={{ marginLeft:  320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser= {currentUser}
      />
    </Grid.Column>

    <Grid.Column width={4} style={{ marginLeft:  450 }}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(App);
