import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../actions/auth";

import Logo from "../util/images/clgLogo.jpg";
import { history } from "../helpers/history";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px',
  },
  card: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  profileImg: {
    width: '96px',
    height: '96px',
    margin: '0 auto 10px',
    display: 'block',
    borderRadius: '50%',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formGroup2: {
    marginBottom: '15px',
    marginTop: '50px'
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  btnPrimaryHover: {
    backgroundColor: '#0056b3',
  },
  alertDanger: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid transparent',
    borderRadius: '4px',
  },
  spinnerBorder: {
    width: '1.25rem',
    height: '1.25rem',
    borderWidth: '2px',
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          history.push("/dashboard");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleClick = () => {
    history.push("/register");
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/main" />;
    }

    return (
      <div style={styles.container} >
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              className="profile-img-card"
              src={Logo}
              height={"150px"}
              width={"150px"}
              alt="Logo"
              style={styles.profileImg}
            />
          </div>
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div style={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div style={styles.formGroup}>
              <button
                className="btn btn-primary btn-block"
                style={styles.btnPrimary}
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm" style={styles.spinnerBorder}></span>
                )}
                <span>Login</span>
              </button>
            </div>
              
            <div style={styles.formGroup2}>
              <div>Don't have a account! Sign up here.</div>
              <button
                className="btn btn-primary btn-block"
                style={styles.btnPrimary}
                disabled={this.state.loading}
                onClick={this.handleClick}
              >
                <span>Sign Up</span>
              </button>
            </div>

            {message && (
              <div style={styles.alertDanger} role="alert">
                {message}
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
