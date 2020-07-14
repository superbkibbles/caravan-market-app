import React, { Component } from 'react';

// @ts-ignore
import { Field, reduxForm } from 'redux-form';
import { History, LocationState } from 'history';
import Login from '../../../HOC/login/Login';
import routes from '../../../constants/routes.json';

type MyComponentProps = {
  history: History<LocationState>;
  auth: any;
  firstLogin: (formValues: object, callBack: () => void) => void;
  handleSubmit: (submitHandle: any) => any;
};

class FirstLogin extends Component<MyComponentProps, {}> {
  componentDidMount(): void {
    const { auth, history } = this.props;
    if (auth.authenticateStore) {
      history.push(routes.USERS_LOGIN);
    }
  }

  renderInput = (reduxProps: any) => {
    const { icon, type, placeholder, name, input, meta, focus } = reduxProps;

    const styleClass =
      meta.touched && meta.error
        ? 'input-group input-lg'
        : 'input-group no-border input-lg';
    return (
      <>
        <div className={styleClass}>
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ borderColor: '#e44947' }}
            >
              <i style={{ marginRight: '10px' }} className={icon} />
            </span>
          </div>

          <input
            style={{ borderColor: '#e44947' }}
            type={type}
            className="form-control"
            placeholder={placeholder}
            name={name}
            {...input}
            autoComplete="off"
            autoFocus={focus}
          />
        </div>
      </>
    );
  };

  submitHandle = (formValues: any) => {
    const { firstLogin, history } = this.props;
    firstLogin(formValues, () => {
      history.push(routes.USERS_LOGIN);
    });
  };

  renderError() {
    const { auth } = this.props;
    if (auth.errorMessage) {
      return (
        <div
          style={{
            padding: '10px 0',
            backgroundColor: '#e44947',
            borderRadius: '20px',
            // color: "red",
            marginBottom: '10px'
          }}
        >
          {auth.errorMessage}
        </div>
      );
    }
    return '';
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Login>
        <div className="card-body">
          <form onSubmit={handleSubmit(this.submitHandle)}>
            <Field
              name="username"
              type="text"
              icon="now-ui-icons ui-1_email-85"
              component={this.renderInput}
              placeholder="Username"
              focus={true}
            />
            <Field
              name="password"
              type="password"
              icon="now-ui-icons objects_key-25"
              component={this.renderInput}
              placeholder="password"
              focus={false}
            />
            {this.renderError()}
            <div className="card-footer text-center">
              <button
                type="submit"
                className="btn btn-primary btn-round btn-lg btn-block"
              >
                Login!
              </button>
              <div style={{ transform: 'translateY(10px' }}>
                {/* <h6> */}
                {/*	<a className="link">Forgot password?</a> */}
                {/* </h6> */}
              </div>
            </div>
          </form>
        </div>
      </Login>
    );
  }
}


const validate = (formValues: any) => {
  const error = {
    username: '',
    password: '',
  };
  if (!formValues.username) {
    error.username = 'you must enter email';
  }
  if (!formValues.password) {
    error.password = 'you must enter the password';
  }
  return error;
};

export default reduxForm({ form: 'signIn', validate })(FirstLogin);
