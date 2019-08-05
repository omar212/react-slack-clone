import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { Grid, Header, Dropdown, Image } from 'semantic-ui-react';


class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  }

  componentDidMount() {
    this.setState({ user: this.props.currentUser })
  }

  componentWilLRecieveProps(nextProps) {

  }
  dropdownOptions = () => [
    {
      key: "user",
      text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signOut",
      text: <span onClick={this.handleSignOut} >Sign Out</span>
    }
  ]

  handleSignOut = () => {
    firebase
     .auth()
     .signOut()
     .then(() => console.log('signed out!'));
  };

  render(){
    {/*destructing*/}
    const { user } = this.state
    return (
      <Grid style={{ background: 'orange'}}>
        <Grid.Column>
          <Grid.Row style = {{padding: '1.2em', margin: 0}}>
            {/* App Header*/}
            <Header inverted style={{paddingLeft: '45px'}} floated="left" as="h2">
              <Header.Content>OChat</Header.Content>
            </Header>
          {/* User Dropdown */}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown
              trigger = {
                <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                </span>
              }
              options = {this.dropdownOptions()}/>
          </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})


export default connect(mapStateToProps)(UserPanel);
