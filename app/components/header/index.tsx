import React from 'react';
import { History, LocationState } from 'history';
import routes from '../../constants/routes.json';

import ToggleBar from "./ToggleBar";

type Props = {
  closeSlider: any;
  openSlider: any;
  isToggle: boolean;
  logoutUser: any;
  currentPage: string;
  history: History<LocationState>;
}

const Header:React.FC<Props> = (props) =>  {
  const { currentPage, closeSlider, openSlider, isToggle, logoutUser, history } = props;
  return (
    <nav className="navbar navbar-expand-lg bg-dark-1 navbar-absolute">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <ToggleBar closeSlider={closeSlider} openSlider={openSlider} isToggle={isToggle} />
          <a className="navbar-brand" style={{paddingLeft: "1rem"}}>{currentPage}</a>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-bar navbar-kebab"/>
          <span className="navbar-toggler-bar navbar-kebab"/>
          <span className="navbar-toggler-bar navbar-kebab"/>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navigation">
          {/*<form>*/}
          {/*	<div className="input-group no-border">*/}
          {/*		<input type="text" value="" className="form-control" placeholder="Search..." />*/}
          {/*		<div className="input-group-append">*/}
          {/*			<div className="input-group-text">*/}
          {/*				<i className="now-ui-icons ui-1_zoom-bold"/>*/}
          {/*			</div>*/}
          {/*		</div>*/}
          {/*	</div>*/}
          {/*</form>*/}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <i className="now-ui-icons media-2_sound-wave"/>
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                <i className="now-ui-icons location_world"/>
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item">Action</a>
                <a className="dropdown-item">Another action</a>
                <a className="dropdown-item">Something else here</a>
              </div>
            </li>
            <li className="nav-item" style={{cursor: "pointer"}} onClick={() => logoutUser(() => {
              history.push(routes.USERS_LOGIN)
            })}>
              <a className="nav-link">
                <i style={{fontSize: "20px"}} className="far fa-sign-out"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
