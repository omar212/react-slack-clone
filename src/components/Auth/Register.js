import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from
'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5'; //used for hash messages

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    age: '0',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('Users')
  };

  isFormVaild = () =>{
    let errors = [];
    let error;

    if(this.isFormEmpty(this.state)){
      error = { message: 'Fill in all feilds'};
      this.setState({ errors: errors.concat(error) });
      return false;

    }else if(!this.isPasswordValid(this.state)){
      error = { message: 'Password is invalid'};
      this.setState({ errors: errors.concat(error) });
      return false;

    } else {
      return true;
    }
  }

  isFormEmpty = ({ username, email, age, password, passwordConfirmation }) => {
    return !username.length || !email.length ||
           !password.length || !passwordConfirmation.length || !age.length
    //takes the length of the value that is typed in and turns into its opposite boolean
    // value
    //so if length = 0 it will return true indiciating that form is not completely filled out
  }


  isPasswordValid = ({password, passwordConfirmation }) => {
    if(password.length < 6  || passwordConfirmation.length < 6){
      return false
    } else if(password !== passwordConfirmation){
      return false;
    } else {
      return true;
    }
  }

  displayErrors = errors => errors.map((error, i) =>
  <p key={i}>{error.message}</p>);

  //object destructing

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormVaild()){
      this.setState({ errors: [], loading: true});

      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        })
        .then(() => {
          this.saveUser(createdUser).then(() => {
            console.log("user saved");
          })
            this.setState({ loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ errors: this.state.errors.concat(err), loading: false });
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: this.state.errors.concat(err), loading: false });
      })
  };
}

saveUser = createdUser => {
  return this.state.userRef.child(createdUser.user.uid).set({
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL
  })
}
  handleInputError = (errors, inputName) => {
    return errors.some(errors =>
      errors.message.toLowerCase().includes(inputName))
    ?
    "error" : ""

  }

  render(){
    const {
      username,
      email,
      age,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return(
      <Grid textAlign = "center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="american sign language interpreting" color="orange" />
              Register for  OChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
                  <Form.Input
                    fluid name="username"
                    icon="user"
                    iconPosition="left"
                    placeholder="username"
                    onChange={this.handleChange}
                    //The some() method tests whether
                    //at least one element in the array passes
                    //the test implemented by the provided function
                    //the classname checks to see if email is included in the error message
                    className={this.handleInputError(errors, 'username')}
                    value={username}
                    type = "text"
                  />

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
                    fluid name="age"
                    icon="universal access"
                    iconPosition="left"
                    placeholder="age"
                    onChange={this.handleChange}
                    className={this.handleInputError(errors, 'age')}
                    value={age}
                    type = "number"
                    min="0"
                    max="81"
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

                  <Form.Input
                    fluid name="passwordConfirmation"
                    icon="repeat"
                    iconPosition="left"
                    placeholder="password confirmation"
                    onChange={this.handleChange}
                    className={this.handleInputError(errors, 'password')}
                    value={passwordConfirmation}
                    type = "password"
                  />



                <Button
                  disabled={loading}
                  className={ loading? 'loading': ''}
                  color= "orange"
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
            <Message> Already a user? <Link to="/login">Login</Link></Message>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Register;
