import React from "react";
import {connect} from "react-redux";
import {stateType} from "../../reducers/types";
import { History, LocationState } from 'history';
import requireAuth from '../authentication/requireAuth';

import Header from '../../containers/header';
import SideBar from '../../containers/slideBar';
import SaveChanges from "../../components/ui/saveChanges/SaveChanges";
import {buyOfflineProducts} from "../../actions/products";

type Props = {
  auth: any;
  history: History<LocationState>;
  isToggle: boolean;
  children: React.ReactNode;
  buyOfflineProducts: () => void;
};

class Layout extends React.Component<Props, {}> {
  componentDidMount(): void {
  const { auth, history } = this.props;
    if(auth) {
      if(auth.AuthorizationType !== "Manager") {
        history.push("/seller/v2")
      }
    }
  }

  render() {
    let width = this.props.isToggle ? "": "100%";
    return (
      <div className="wrapper">
        <SideBar />
        <div className="main-panel" style={{width: width, backgroundColor: "rgba(5, 5, 5)"}} id="main-panel">
          <Header history={this.props.history} />
          { localStorage.getItem("buyingProducts") && <SaveChanges onSave={this.props.buyOfflineProducts}/> }
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: stateType) => {
  return{
    isToggle: state.isToggled.toggled,
    auth: state.auth.authenticateUser
  }
};

export default requireAuth(connect(mapStateToProps, {buyOfflineProducts})(Layout), "authenticateUser", "/login/users");
