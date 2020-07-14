import React, {Component} from 'react';
import {History, LocationState} from 'history';

import SecondLogin from './index';
import Spinner from '../../ui/spinner'
import styles from '../index.css';
import routes from '../../../constants/routes.json';


type MyComponentProps = {
  history: History<LocationState>;
  auth: any;
  getUsers: (id: number) => void;
  users: any;
  logoutStore: (callback: () => void) => void;
};

class ShowUsers extends Component<MyComponentProps, {}>{
	componentDidMount() {
	  const { auth, getUsers } = this.props;
		if(auth.authenticateStore) {
			getUsers(auth.authenticateStore.UsersId);
		}
	}

	navigate(user: any) {
	  const { history } = this.props;
		setTimeout(() => {
			history.push(`/login/users/${user.PharmacyUsersId}`)
		} , 200);
	}

	renderUsers = () => {
		if(this.props.users.users) {
			return (
				<>
					{
						this.props.users.users.map((user:any) => {
							return(
								<div
									key={user.PharmacyUsersId}
									style={{color: "white", textDecoration: "none"}}
									onClick={() => this.navigate(user)}
									>
									<div className={styles.users}>
										<div className={styles.user}>
											{user.UserName}
										</div>
									</div>
								</div>
							)
						})
					}
          <div className="card-footer text-center">
            <h6>
              <a onClick={this.logout} style={{cursor: "pointer"}} className="link">Logout</a>
            </h6>
          </div>
				</>
			);
		}
		return <Spinner height="50px" width="50px" />;
	};

	logout = () => {
	  this.props.logoutStore(() => {
	    this.props.history.push(routes.STORE_LOGIN);
    })
  };

	render(){
    return (
		  <SecondLogin history={this.props.history}>
        {this.renderUsers()}
      </SecondLogin>
		)
	}
}

export default ShowUsers;
