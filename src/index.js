import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import Register from './components/Auth/Register';
import Login  from './components/Auth/Login';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';
import rootReducer from './reducers/index';
import 'semantic-ui-css/semantic.min.css'
import Spinner from './Spinner';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser, clearUser } from './actions'

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  /* this is a listener from fireb  ase*/
  componentDidMount() {
    console.log(this.props.isLoading);
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    })
  }
  render(){
      return this.props.isLoading ? <Spinner /> : (
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
      )
  }
}
//to get loading data
const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const  RootWithAuth = withRouter(
    connect(
      mapStateToProps,
      { setUser, clearUser }
    )(Root)
  );
/*You can get access to the history object's properties
  and the closest <Route>'s match via the withRouter higher-order
  component. withRouter will pass updated match, location, and history
  props to the wrapped component whenever it renders.*/
ReactDOM.render(
  /*Provide will provide our global start to any component8*/
   <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
