import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from
'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
//import Register from './Register';


class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  };


  displayErrors = errors => errors.map((error, i) =>
  <p key={i}>{error.message}</p>);

  //object destructing

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormVaild(this.state)){
      this.setState({ errors: [], loading: true});
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errors: this.state.concat(err),
            loading: false
          });
        });
  }
};

  isFormVaild = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName))
    ?
    "error" : "";

  }

  render(){
    const {
      email,
      password,
      errors,
      loading
    } = this.state;

    return(
      <Grid textAlign = "center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="code branch" color="violet" />
          Login to OChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>


                  <Form.Input
                    fluid name="email"
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    className={this.handleInputError(errors, 'email')}
                    value={email}
                    type = "email"
                  />

                  <Form.Input
                    fluid name="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="password"
                    onChange={this.handleChange}
                    className={this.handleInputError(errors, 'password')}
                    value={password}
                    type = "password"
                  />

                <Button
                  disabled={loading}
                  className={ loading? 'loading': ''}
                  color= "violet"
                  fluid size="large">
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
             )}
            <Message> Don't have an account? <Link to="/Register">Register</Link></Message>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Login;
