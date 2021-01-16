import React, { Component } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import SignUpPage from './SignUpPage';
import HomePage from './Homepage';



class App extends Component {

  constructor(props){

    super(props);
    this.state = {
      login: true,
      signUp: false,
      forgot: false,
      logged: false
    }

    this.changeSignUp = this.changeSignUp.bind(this);
    this.changeForgot = this.changeForgot.bind(this);
    this.changeLogged = this.changeLogged.bind(this);
    this.changeLogin = this.changeLogin.bind(this);

  }

  changeSignUp() {
    this.setState({
      login: false,
      signUp: true,
      forgot: false,
      logged: false
    });
  }

  changeForgot() {
    this.setState({
      login: false,
      signUp: false,
      forgot: true,
      logged: false
    });
  }

  changeLogged() {
    this.setState({
      login: false,
      signUp: false,
      forgot: false,
      logged: true
    });
  }

  changeLogin() {
    this.setState({
      login: true,
      signUp: false,
      forgot: false,
      logged: false
    });
  }
  
  render() {
    let page;

    if(this.state.login){
      page = <LoginPage changeSignUp={this.changeSignUp} changeForgot={this.changeForgot} changeLogged={this.changeLogged}/>;
    }
    else if(this.state.signUp){
      page = <SignUpPage changeLogin={this.changeLogin}/>;
    }
    else if(this.state.forgot){
      page = <ForgotPassword changeLogin={this.changeLogin}/>;
    }
    else if(this.state.logged){
      page = <HomePage />;
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

export default App;
