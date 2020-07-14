import React, {Component} from 'react';
import {connect} from "react-redux";
import {History, LocationState} from 'history';

export default function(ChildComponent: any, authName:string, pushAwayTo: string) {
  type MyComponentProps = {
    history: History<LocationState>;
    authStore: string;
    auth: string;
  };
	class ComposedComponent extends Component<MyComponentProps, {}> {
		componentDidMount(): void {
			if(!this.props.authStore) {
				this.props.history.push("/login")
			}
			this.navigateAway()
		}

		componentDidUpdate(): void {
			if(!this.props.authStore) {
				this.props.history.push("/login")
			}
			this.navigateAway()
		}

		navigateAway(): void {
			if(!this.props.auth)
			{
				this.props.history.push(pushAwayTo);
			}
		}

		render() {
			return(
				<ChildComponent {...this.props}/>
			)
		}
	}

	const mapStateToMaps = (state: any) => {
		return {
			auth: state.auth[authName],
			authStore: state.auth.authenticateStore
		}
	};
	return connect(mapStateToMaps)(ComposedComponent);
}
