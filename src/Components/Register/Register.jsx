import React, { Component } from 'react';
import logo from '../../img/logo2.png';
import iconUser from '../../img/iconUser.png';
import pswIcon from '../../img/pswicon.png';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            username: '',
            password:''
        }
    }

    handleFirstnameInput = (event) => {
        return this.setState({firstName: event.target.value});
    }

    handleUsernameInput = (event) => {
        return this.setState({username: event.target.value});
    }

    handlePasswordInput = (event) => {
        return this.setState({password: event.target.value});
    }

    handleRegisterButton = () => {
        try {
            return fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    firstname: this.state.firstName,
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.changeRoute('home');
                } else {
                    alert('This username already exists !')
                }
            })
            .catch(err => console.log(err))
        } catch (err) {
            console.error(err);
            alert('Something went wrong, sorry! Please try again!');
        }
    }
    
    render() {
        const {firstName, username, password} = this.state;
        return (
            <div className='form-wrapper'>
                <div className="form">
                    <div className="form-header">
                        <h1>Register</h1>
                         <img src={logo} alt="things to do logo" />
                    </div>
                    <div className="form-content">
                        <div className="input-box">
                            <img src={iconUser} alt=" static user icon" />
                            <input 
                                type="text" 
                                name="fname" 
                                id="fname"
                                onChange={this.handleFirstnameInput}
                            />
                            <label htmlFor="fname" className={(firstName.length > 0) ? 'filled' : ''}><b>First name</b></label>
                        </div>
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
                            onClick={this.handleRegisterButton}
                        >
                            Register
                        </button>
                    </div>
                    <div className="psw">Already have an account? <strong onClick={() => this.props.changeRoute('signin')}>Login</strong></div>
                </div>
           </div>
        );
    }
}

export default Register;