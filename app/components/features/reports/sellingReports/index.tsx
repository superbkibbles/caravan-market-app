import React, {Component} from 'react';
import { History, LocationState } from 'history';

import classes from "./index.css";
import routes from '../../../../constants/routes.json';
import Header from "../../seller/v2/Header";

type Props = {
  getPageName: (pageName: string) => void;
  auth: any;
  getSellingReports: (id: string) => void;
  reports: any;
  history: History<LocationState>;
  logoutUser: (callback: () => void) => void;
};

type State = {
  reports: any;
  timeout: any;
  inputValue: string;
  searchBy: string;
  chunkArray: any;
  pageNum: number;
}

class ShowReports extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reports: [],
      timeout: 0,
      inputValue: "",
      searchBy: "invoice_number",
      chunkArray: [],
      pageNum: 1
    };
  }
  componentDidMount() {
    this.props.getPageName("reports | selling");
    if(this.props.auth.authenticateUser) {
      this.props.getSellingReports(this.props.auth.authenticateUser.UsersId);
      this.setState({reports: this.props.reports});
      this.chunkArray(this.props.reports, 8);
    }
  }
  componentDidUpdate(prevProps: Props) {
    if(prevProps.reports.length !== this.props.reports.length) {
      this.setState({reports: this.props.reports});
      this.chunkArray(this.props.reports, 8);
    }
  }

  chunkArray = (myArray: any, chunk_size: number): void => {
    let arrayLength = myArray.length;
    let tempArray = [];
    let myChunk;

    for (let index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index+chunk_size);
      tempArray.push(myChunk);
    }

    this.setState({chunkArray: tempArray});
  };

  onInputChange = (e: any) => {
    const reports = this.props.reports;
    if(reports.length > 0) {
      let value = e.target.value.replace(new RegExp("\\\\", "g"), "");
      this.checkValue(value, 8)
    }
  };

  checkValue = (value: string, numOfItems: number) => {
    const reports = this.props.reports;
    const searchBy = this.state.searchBy;
    this.setState({inputValue: value});

    let timeout;

    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }
    if (value.length > 0 && reports) {
      timeout = setTimeout(() => {
        this.setState({pageNum: 1});
        this.setState({inputValue: value});
        let items = reports.filter((item: any) => {
          return item[searchBy].toLowerCase().search(value.toLowerCase()) !== -1;
        });
        this.chunkArray(items, numOfItems);
      }, 300);
      this.setState({timeout: timeout});
    } else {
      this.chunkArray(this.props.reports, numOfItems);
      this.setState({inputValue: ""});
    }
  };

  renderHeader = () => {
    return (
      <div className="card" style={{borderRadius: "5px", boxShadow: "0 5px 25px rgba(0, 169, 206, 0.3)"}}>
        <div className="card-body" style={{backgroundColor: "#00A9CE", color: "rgba(255, 255, 255, 0.9)", borderRadius: "5px"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-4 ml-auto mr-auto">
                <div className="form">
                  <div style={{margin: "0 auto"}}>
                    <form>
                      <div className="input-group no-border">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search for report"
                          onChange={this.onInputChange}
                          value={this.state.inputValue}
                          style={{backgroundColor: "#fff"}}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  onReportClick = (invoice: number, total: number): void => {
    this.props.history.push(`/logged/reports/selling/${invoice}/${total}`);
  };

  renderContent = () => {
    if (this.state.chunkArray.length > 0) {
      if(this.state.chunkArray[Number(this.state.pageNum) - 1]) {
        return (
          <div className="container">
            <div className="row">
              {this.state.chunkArray[this.state.pageNum - 1].map((report: any) => {
                const date = `${new Date(report.sale_date *1000).getFullYear()}/
                ${new Date(report.sale_date *1000).getMonth() + 1}/
                ${new Date(report.sale_date *1000).getDate()}`;
                return (
                  <div
                    id={classes.buyingReport}
                    key={report.invoice_number}
                    className="col-lg-3 col-md-4 col-xs-12"
                  >
                    <div className={`card ${classes.report}`}
                         onClick={() => this.onReportClick(report.invoice_number, report.total_invoice_price)}
                    >
                      <div className="card-body" style={{minHeight: "120px"}}>
                        <div className="text-center" style={{fontWeight: "700"}}>
                          #{report.invoice_number}
                        </div>
                        <hr className="reportHr"/>
                        <div className="text-center">
                          <strong>User</strong>: {report.pharmacy_user}
                          <span style={{display: "block"}}> <strong>Price</strong>: {Number(report.total_invoice_price).toFixed(2)}</span>
                          <span style={{display: "block"}}> <strong>Discount</strong>: {Number(report.discount).toFixed(2)}</span>
                          <span style={{display: "block"}}> <strong>Date</strong>: {date}</span>
                        </div>
                        <hr className="reportHr"/>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
      return "";
    }
    return "";
  };

  navigatePrev = () => {
    if(this.state.pageNum > 1) {
      this.setState({pageNum: this.state.pageNum - 1})
    }
  };

  navigateFor = () =>{
    if (this.state.pageNum < this.state.chunkArray.length) {
      this.setState({pageNum: this.state.pageNum + 1})
    }
  };

  renderNumber = () => {
    const { pageNum } = this.state;
    if(this.props.reports) {
      if (this.state.chunkArray. length > 0 ) {
        return(
          <>
            {pageNum > 3  &&
            <li className='page-item' onClick={() => this.setState({pageNum:1 })}>
              <a className="page-link">
                1 ...
              </a>
            </li>
            }
            {pageNum - 1 > 0 &&
            <li className='page-item' onClick={() => this.setState({pageNum: pageNum - 1})}>
              <a className="page-link">
                {pageNum - 1}
              </a>
            </li>
            }
            <li className='page-item active' onClick={() => this.setState({pageNum: pageNum})}>
              <a className="page-link">
                { pageNum }
              </a>
            </li>
            {this.state.chunkArray[pageNum] &&
            <li className='page-item' onClick={() => this.setState({pageNum: pageNum + 1})}>
              <a className="page-link">
                {pageNum + 1}
              </a>
            </li>
            }
            {this.state.chunkArray[pageNum + 1] &&
            <li className='page-item' onClick={() => this.setState({pageNum: pageNum + 2})}>
              <a className="page-link">
                {pageNum + 2}
              </a>
            </li>
            }
            {pageNum  === 1 && this.state.chunkArray.length > 3 &&
            <li className='page-item' onClick={() => this.setState({pageNum: pageNum + 3})}>
              <a className="page-link">
                {pageNum + 3}
              </a>
            </li>}
          </>
        )
      }
      return "";
    } else {
      return "";
    }
  };

  renderPagination = () => {
    return (
      <div className="row">
        <div className="col-md-3 offset-5">
          <ul className="pagination pagination-info">
            <li className="page-item">
              <div className="page-link" onClick={this.navigatePrev}>
													<span aria-hidden="true"><i
                            className="fa fa-angle-double-left" aria-hidden="true"/></span>
              </div>
            </li>
            {this.renderNumber()}
            <li className="page-item">
              <div className="page-link" onClick={this.navigateFor}>
                <span aria-hidden="true"><i className="fa fa-angle-double-right" aria-hidden="true"/></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  };

  onSignOut = () => {
    this.props.logoutUser(() => {
      this.props.history.push(routes.USERS_LOGIN)
    })
  };

  render() {
    if(this.props.history.location.pathname == routes.SELLER_REPORT) {
      return (
        <Header onSignOut={this.onSignOut}>
          <div className="content">
            <div className={`row ${classes.fadeReportsIn}`}>
              <div className="col-md-12">
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderPagination()}
              </div>
            </div>
          </div>
        </Header>
      );
    }
    return (
      <div className={`row ${classes.fadeReportsIn}`}>
        <div className="col-md-12">
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

export default ShowReports;
