import React from 'react';
// @ts-ignore
import {Field, reduxForm} from "redux-form";
import { History, LocationState } from 'history';
import {Link} from 'react-router-dom';
import routes from '../../../constants/routes.json';

import SecondLogin from "./index";

interface Props {
  authStore: {
    UsersId: string
  };
  history: History<LocationState>;
  getUsers: any;
  authError: string;
  secondLogin: any;
  users: any;
  match: any;
  handleSubmit: any;
}

interface State {
  user: any
}

class LoginUser extends React.Component<Props, State> {
	constructor(props:Props) {
		super(props);
		this.state =  {
			user: {}
		}
	}

	componentDidMount(): void {
		this.props.getUsers(this.props.authStore.UsersId);
		this.setUpUser();
	}

	componentDidUpdate(prevProps: any): void {
		if(prevProps.users.users !== this.props.users.users) {
			this.setUpUser();
		}
	}

	setUpUser = () => {
	  const { match, history, users } = this.props;
		const id = match.params.id;
		if(users.users) {
      const user = users.users.filter((user: any) => user.PharmacyUsersId == id);
      if(user.length > 0) {
        this.setState({user: user[0]});
      } else {
        history.push("/store")
      }
    }
	};

	renderError(){
		if (this.props.authError) {
			return (
				<div
					style={{
						padding: "10px 0",
						backgroundColor: "#e44947",
						borderRadius: "20px",
						// color: "red",
						marginBottom: "10px"
					}}
				>
					{/*{error}*/}
					{this.props.authError}
				</div>
			)
		}
		return '';
	}

	renderInput = (args: any) => {
	  const {icon, type, placeholder, name, input, meta} = args;
		const styleClass = meta.touched && meta.error ? "input-group input-lg": "input-group no-border input-lg";
		return (
			<>
				<div className={styleClass}>
					<div className="input-group-prepend">
					<span className="input-group-text" 	style={{borderColor: "#e44947"}}
					>
						<i style={{marginRight: "10px"}} className={icon}/>
					</span>
					</div>

					<input
						style={{borderColor: "#e44947"}}
						type={type}
						className="form-control"
						placeholder={placeholder}
						name={name}
						{...input}
						autoComplete="off"
						autoFocus
					/>
				</div>
				{/*{this.renderError(meta)}*/}
			</>
		)
	};

	submitHandle = (formValues: any) => {
		this.props.secondLogin({...formValues, username: this.state.user.UserName, id: this.props.authStore.UsersId}, () =>{
		  this.props.history.push(routes.DASHBOARD);
    })
	};

	render() {
		return (
			<SecondLogin history={this.props.history}>
				<h1>{this.state.user &&
				this.state.user.UserName}</h1>
				<form onSubmit={this.props.handleSubmit(this.submitHandle)}>
					<Field
						name="password"
						type="password"
						icon="now-ui-icons objects_key-25"
						component={this.renderInput}
						placeholder="password"
					/>
					{this.renderError()}
					<div className="card-footer text-center">
						<button type="submit" className="btn btn-info btn-round btn-lg btn-block">Login!</button>
						<div style={{transform: "translateY(10px"}}>
							<h6>
								<Link to={routes.USERS_LOGIN} className="link">Go Back</Link>
							</h6>
						</div>
					</div>
				</form>
			</SecondLogin>
		);
	}

}

const validate = (formValues: {password: string}) => {
	let error = {
	  password: ''
  };
	if(!formValues.password) {
		error.password = "you must enter the password"
	}
	return error;
};

export default reduxForm({form: "signUser", validate: validate})(LoginUser);
