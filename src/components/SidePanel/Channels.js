import React from 'react';
import firebase from '../../firebase';
import  { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends React.Component {
  state = {
    activeChannel: '',
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    fun_channels: [],
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    firstLoad: true
  }

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = []
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels}, () => this.setFirstChannel());
       console.log(loadedChannels);
    })
  }

  removeListeners = () => {
    this.state.channelsRef.off(); //.off() will take off the listeners when moving to another page
  }
  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if(this.state.firstLoad && this.state.channels.length > 0){
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({firstLoad: false})
  }
  addChannel = () => {
    //destructing
    const { channelsRef, channelName, channelDetails, user } =  this.state;
    const key = channelsRef.push().key; //this creates a new identifier for every object that is added

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,

      createdBy: {
           name: user.displayName,
           avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: ''});
        this.closeModal();
        console.log('channel added');
      })
      .catch(err => {
        console.error(err);
      })
  }
  closeModal = () => this.setState({modal: false})

  openModal = () => this.setState({modal: true})

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormVaild(this.state)) {
      this.addChannel();

      //console.log('channel added');
    }
  }
  displayInfo = channels => (
    channels.length > 0 && channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: 2.2 }}
        >
        ------{channel.details}
        </Menu.Item>
    ))

  )
  displayChannels = channels => (
    channels.length > 0 && channels.map(channel => (
       <Menu.Item
         key={channel.id}
         onClick={() => this.changeChannel(channel)}
         name={channel.name}
         style={{ opacity: 0.7, color: 'black'}}
         active={channel.id === this.state.activeChannel}
         >
           #{channel.name}
           --{channel.details}
         </Menu.Item>
    ))
  )

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel)
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  //to check if name and details are filled out
  isFormVaild = ({ channelName, channelDetails }) => channelName &&
  channelDetails;

  render(){

  {/*destructing*/}
  const { channels, fun_channels, modal } = this.state;

    return(
    <React.Fragment>
      <Menu.Menu style={{paddingBottom: '2em'}}>
        <Menu.Item>
          <span style={{color: 'black'}}>
            <Icon name="exchange" /> Channels
          </span>
           <code style={{color: 'black'}}>({ channels.length })</code><Icon name="add" onClick={this.openModal}/>
        </Menu.Item>
        {this.displayChannels(channels)}
        {/* {this.displayInfo(channels)} */}
        {/*<Menu.Item>
          <span>
            <Icon name="exchange" /> Fun Channels
          </span>
          ({ fun_channels.length }) <Icon name="add" onClick={this.openModal}/>
        </Menu.Item>
        {this.displayChannels(channels)}
        {/* {this.displayInfo(channels)} */}
        {/* Fun Channels */}
      </Menu.Menu>

      {/* Add Channel Model */}
      <Modal basic open={modal} onClose={this.closeModal} >

        <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="blue" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>

      </Modal>
    </React.Fragment>
    )
  }
}

export default connect(null,{setCurrentChannel})(Channels);
