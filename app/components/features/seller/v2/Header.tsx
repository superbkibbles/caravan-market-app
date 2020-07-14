import React from 'react';
import {Link} from 'react-router-dom';


import routes from '../../../../constants/routes.json';
import logo from '../logo.png';

type Props = {
  onSignOut: () => void;
  userName: string;
};

type State = {
  expanded: boolean;
  screenWidth: number;
  userToggle: boolean;
};

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
      screenWidth: 1900,
      userToggle: false
    }
  }

  componentDidMount(): void {
    window.addEventListener("resize", () => {
      this.setState({screenWidth: window.innerWidth})
    });
    if(window.innerWidth > 914 ) {
      this.setState({expanded: false})
    }
  }

  componentDidUpdate(_: Props, prevState: State, ): void {
    if(prevState.screenWidth !== this.state.screenWidth) {
      if(window.innerWidth > 914 ) {
        this.setState({expanded: false})
      }
    }
  }


  onUserClick = () => {
    const toggle = this.state.userToggle;

    this.setState({userToggle: !toggle})
  };
  onToggleClick = () => {
    const expanded = this.state.expanded;

    this.setState({expanded: !expanded});
  };

  renderBrand = () => {
    if(!this.state.expanded) {
      return (
        <div className="row">
          <div className="col-md-6" style={{paddingRight: "0"}}>
            <img src={logo} style={{
              clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 55%)",
              height: this.state.expanded ? "0": "30px",
              opacity: this.state.expanded ? "0": "1"
            }} alt="logo"/>
          </div>
          <div style={{paddingLeft: "0", lineHeight: "1", letterSpacing: "2px"}} className={`col-md-6`}>
            <a>CARAVAN</a>
            <a style={{display: "block", fontWeight: "800"}}>COMMERCE</a>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{padding: "0", lineHeight: "1", letterSpacing: "2px", margin: "0"}}>
          <a>CARAVAN</a>
          <a style={{display: "block", fontWeight: "800"}}>COMMERCE</a>
        </div>
      )
    }
  };

  render() {
    const userToggle = this.state.userToggle ? "nav-item dropdown show" : "nav-item dropdown";
    const navBarClass = this.state.expanded ? "navbar navbar-expand-lg bg-info navbar-absolute bg-white":
      "navbar navbar-expand-lg bg-info navbar-absolute";
    const collapseClass = this.state.expanded ? "collapse navbar-collapse justify-content-end show":
      "collapse navbar-collapse justify-content-end";
    return (
      <div className="wrapper">
        <div className="main-panel" style={{width: "100%"}}>
          <nav className={navBarClass}>
            <div className="container-fluid">
              <div className="navbar-wrapper">
                <div className="navbar-brand" style={ !this.state.expanded ? {paddingLeft: "1rem"} : {
                  padding: "8px 11.2px",
                  margin: "0 3px 0 0"
                }}>
                  {this.renderBrand()}
                </div>
              </div>
              <button onClick={this.onToggleClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                      aria-controls="navigation-index" aria-expanded={this.state.expanded} aria-label="Toggle navigation">
                <span className="navbar-toggler-bar navbar-kebab"/>
                <span className="navbar-toggler-bar navbar-kebab"/>
                <span className="navbar-toggler-bar navbar-kebab"/>
              </button>
              <div className={collapseClass} id="navigation">
                <ul className="navbar-nav">
                  <li className={userToggle} onClick={this.onUserClick}>
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false" style={{cursor: "pointer"}}>
                      <p>
                        { this.props.userName }
                      </p>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" style={{ color: '#fff' }}>
                      <Link className="dropdown-item" to={routes.SELLER_REPORT} >Reports</Link>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                  <li className="nav-item" style={{cursor: "pointer"}} onClick={() => this.props.onSignOut()}>
                    <a className="nav-link">
                      <i style={{fontSize: "20px"}} className="far fa-sign-out"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Header;
