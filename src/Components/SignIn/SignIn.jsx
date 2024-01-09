import React, { Component } from 'react';
import logo from '../../img/logo2.png';
import iconUser from '../../img/iconUser.png';
import pswIcon from '../../img/pswicon.png';
import './SignIn.css';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    
    handleUsernameInput = (event) => {
        return this.setState({username: event.target.value});
    }

    handlePasswordInput = (event) => {
        return this.setState({password: event.target.value});
    }

    handleLoginBtn = () => {
        try {
            return fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
                .then(response => response.json())
                .then( user => {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.changeRoute('home');
                    } else {
                        alert('User or password not matching');
                    }
                })
                .catch(err => console.log(err, 'Unable to sign in!'))
         } catch (err) {
            console.error(err);
            alert('Something went wrong, sorry!');
        }
    }

    render() {
        const {username, password} = this.state;
        return (
           <div className='form-wrapper'>
                <div className="form">
                    <div className="form-header">
                        <h1>Welcome</h1>
                         <img src={logo} alt="things to do logo" />
                    </div>
                    <div className="form-content">
                        <div className="input-box">
                            <img src={iconUser} alt=" static user icon" />
                            <input 
                                type="text" 
                                name="uname" 
                                id="uname"
                                onChange={this.handleUsernameInput}
                            />
                            <label htmlFor="uname" className={(username.length > 0) ? 'filled' : ''}><b>Username</b></label>
                        </div>
                        <div className="input-box">
                            <img src={pswIcon} alt=" static user icon" />
                            <input 
                                type="password" 
                                name="psw" 
                                id="psw"
                                onChange={this.handlePasswordInput}
                            />
                            <label htmlFor="psw" className={password.length ? 'filled' : ''}><b>Password</b></label>
                        </div>
                        <button 
                            className="login-btn"
                            onClick={this.handleLoginBtn}
                        >
                            Login
                        </button>
                    </div>
                    <div className="psw">Don't have an account? <strong onClick={() => this.props.changeRoute('register')}>Register</strong></div>
                </div>
           </div>
        );
    }
}

export default SignIn;