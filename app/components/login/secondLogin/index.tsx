import React, {Component} from "react";
import {History, LocationState} from 'history';
import { stateType } from '../../../reducers/types';

import { connect } from 'react-redux';
import Login from "../../../HOC/login/Login";
import requireAuth from "../../../HOC/authentication/requireAuth";
import routes from '../../../constants/routes.json';

type MyComponentProps = {
  history: History<LocationState>;
  auth: any;
  children: React.ReactNode
}

class SecondLogin extends Component<MyComponentProps, {}> {
	componentDidMount(): void {
	  const { auth, history } = this.props;
		if(auth.authenticateUser) {
			history.push(routes.DASHBOARD)
		}
	}

  render() {
		return (
			<Login>
				<div className="card-body">
					{this.props.children}
				</div>
			</Login>
		)
	}
}

function mapStateToProps(state: stateType) {
  return {
    auth: state.auth,
  };
}

export default requireAuth(connect(mapStateToProps)(SecondLogin), "authenticateStore", "/login");
