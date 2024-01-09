import React, { Component } from 'react';
import UserPanel from './Components/UserPanel/UserPanel.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import Register from './Components/Register/Register.jsx';
import './App.css';

const initialState = {
  isLoggedIn: false,
  route: 'signin',
  user: {
    id: '', 
    firstName: '',
    username: '',
    overDueTasks: 0,
    completedTasks: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      firstName: user.firstname,
      username: user.username, 
      overDueTasks: user.overdue,
      completedTasks: user.completedtasks,
      joined: user.joined
    }}, () => console.log(this.state.user))
  }

  changeRoute = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isLoggedIn: true});
    }
    return this.setState({route: route});
  }

  render() {
    const { isLoggedIn, route, user } = this.state;
    return (
      <div className='App'>
        {
          route === 'home'
          ? <UserPanel user={user} changeRoute={this.changeRoute}/>
          : ( 
            route === 'signin'
            ? <SignIn 
              isLoggedIn={isLoggedIn} 
              changeRoute={this.changeRoute} 
              loadUser={this.loadUser} 
            />
            : <Register isLoggedIn={isLoggedIn} changeRoute={this.changeRoute} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
