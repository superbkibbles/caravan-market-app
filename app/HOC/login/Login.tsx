import React, { ReactNode } from 'react';

import Footer from './Footer';
// @ts-ignore
import backgroundImage from './login.jpg';
// @ts-ignore
import logo from './logo.png';

interface Props {
  children: ReactNode;
}

const Login: React.FC<Props> = (props: Props) => {
  // function Login(props: Props) {
  const { children } = props;
  return (
    <div className="login-page sidebar-collapse" >
      <div className="page-header clear-filter" filter-color="orange">
        <div
          className="page-header-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="content">
          <div className="container">
            <div className="col-md-4 ml-auto mr-auto">
              <div className="card card-login card-plain">
                <div className="form">
                  <div className="card-header text-center">
                    <div className="logo-container">
                      <img src={logo} alt="logo" />
                    </div>
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
