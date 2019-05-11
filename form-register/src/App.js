import React from 'react';
import axios from 'axios';

require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

export default class Register extends React.Component {
  state = {
    name: '',
    email: '',
    handphone: '',
    gender: '',
    password: '',
    password_repeat: ''
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangeHandphone = event => {
    this.setState({ handphone: event.target.value });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleChangePasswordRepeat = event => {
    this.setState({ password_repeat: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`${API_URL}/auth/register`, {
        name: this.state.name,
        email: this.state.email,
        handphone: this.state.handphone,
        gender: this.state.gender,
        password: this.state.password,
        password_repeat: this.state.password_repeat
      })
      .then(res => {
        if (res.data.status === 'ok') {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.data.message);
        }
      });
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-control" id="name" placeholder="Name" onChange={this.handleChangeName}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" id="email" placeholder="Email" onChange={this.handleChangeEmail}/>
            </div>
            <div className="form-group">
              <label htmlFor="handphone">Handphone</label>
              <input type="text" name="handphone" className="form-control" id="handphone" placeholder="Handphone" onChange={this.handleChangeHandphone}/>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label><br/>
              <input type="radio" name="gender" value="1" id="gender" placeholder="Gender" onChange={this.handleChangeGender}/> Male &nbsp;
              <input type="radio" name="gender" value="2" id="gender" placeholder="Gender" onChange={this.handleChangeGender}/> Female
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChangePassword}/>
            </div>
            <div className="form-group">
              <label htmlFor="password_repeat">Password Repeat</label>
              <input type="password" name="password_repeat" className="form-control" id="password_repeat" placeholder="Password Repeat" onChange={this.handleChangePasswordRepeat}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
