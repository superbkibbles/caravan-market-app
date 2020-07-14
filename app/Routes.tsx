import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';


// Seller
import SellerV2Page from './containers/seller/v2/index';

// Login
import FirstLogin from './containers/login/FirstLoginPage';
import ShowUsersPage from "./containers/login/ShowUsersPage";
import LoginUserPage from "./containers/login/LoginUserPage";

// dashboard
import Dashboard from "./containers/dashboard";

// products
import ProductsList from "./containers/products/ProductsListPage";
import ProductsDeletePage from "./containers/products/ProductsDeletePage";
import ProductsNewPage from "./containers/products/ProductsNewPage";

// reports
import ReportPage from "./containers/report/ReportPage";
import ReportBuyPage from "./containers/report/ReportBuyPage";
import ReportSellPage from "./containers/report/ReportSellPage";
import buyingReportPage from './containers/report/report/BuyingPage';
import sellingReportPage from './containers/report/report/SellingPage';

import Layout from "./HOC/layout";
import { History, LocationState } from 'history';

// stores
import Stores from './containers/stores/index';

type Props = {
  history: History<LocationState>;
}

export default () => {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} exact component={HomePage} />
        <Route path={routes.STORE_LOGIN} exact component={FirstLogin} />
        <Route path={routes.USERS_LOGIN} exact component={ShowUsersPage} />
        <Route path={routes.USER_LOGIN} exact component={LoginUserPage} />

        <Route path={routes.SELLER_V2} exact component={SellerV2Page} />
        <Route path={routes.SELLER_REPORT} exact component={ReportSellPage} />

        <Route path={"/logged"} component={(ownProps: Props) => {
          return (
            <Layout history={ownProps.history}>
              <div className="content">
                <Route path={routes.DASHBOARD} exact component={Dashboard} />
                {/*products*/}
                <Route path={routes.PRODUCTS} component={ProductsList} />
                <Route path={routes.PRODUCT_DELETE} exact component={ProductsDeletePage} />
                <Route path={routes.PRODUCT_NEW} exact component={ProductsNewPage} />
              {/*  reports*/}
                <Route path={routes.REPORTS} exact component={ReportPage} />
                <Route path={routes.REPORTS_BUYING} exact component={ReportBuyPage} />
                <Route path={routes.REPORTS_SELLING} exact component={ReportSellPage} />
                <Route path={routes.REPORT_BUYING} exact component={buyingReportPage} />
                <Route path={routes.REPORT_SELLING} exact component={sellingReportPage} />

                <Route path={routes.STORES} exact component={Stores} />
              </div>
            </Layout>
            )
        }}/>
      </Switch>
    </App>
  );
}
