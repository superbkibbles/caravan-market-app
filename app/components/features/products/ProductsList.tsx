import React, {Component} from 'react';
import {Link} from "react-router-dom";

import routes from '../../../constants/routes.json';
import classes from './index.css';

type Props = {
  products: any;
  auth: any;
  pageNum: number;
  getPageName: (name: string) => void;
  getProducts: (id: string) => void;
  getPaginationNum: (num: number) => void;
  location: any;
}

interface State {
  chunkArray: any;
  numOfItems: number;
  show: boolean;
  isHide: boolean;
  searchBy: string;
  inputValue: string;
  timeout: any;
  isHide2: boolean;
  sort: string;
}

class ProductsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chunkArray: [],
      numOfItems: 5,
      show: true,
      isHide: false,
      isHide2: false,
      searchBy: "trade_name",
      inputValue: "",
      timeout: 0,
      sort: ""
    };
  }

  componentDidMount(): void {
    this.checkPage();
    if(this.props.auth.authenticateUser && this.state.show) {
      this.props.getProducts(this.props.auth.authenticateUser.UsersId);
      this.chunkArray(this.props.products, this.state.numOfItems);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (prevState.show !== this.state.show) {
      this.props.getProducts(this.props.auth.authenticateUser.UsersId);
      this.chunkArray(this.props.products, this.state.numOfItems);
    }
    if (prevProps.products.length !== this.props.products.length && this.state.show) {
      this.props.getProducts(this.props.auth.authenticateUser.UsersId);
      this.chunkArray(this.props.products, this.state.numOfItems);
      }
    if (prevProps.location.pathname !== this.props.location.pathname)
      this.checkPage();
  }

  checkPage = () :void => {
    this.props.location.pathname === routes.PRODUCT_NEW ||
    this.props.location.pathname === routes.PRODUCT_EDIT?
      this.setState({show: false}):
      this.setState({show: true});
  };

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

  sort = (sortBy: string) => {
    let products:any = [];
    for(let i = 0; i < this.state.chunkArray.length; i++) {
      products = products.concat(this.state.chunkArray[i])
    }
    if (sortBy === "remain_amount" || sortBy === "sale_price" || sortBy === "purchase_price" || sortBy === "expire_date") {
      if (this.state.sort === "ascending") {
        products = products.sort((a: any, b: any) => Number(a[sortBy]) - Number(b[sortBy]));
        this.setState({sort: "descending"});
      } else {
        products = products.sort((a: any, b: any) => Number(b[sortBy]) - Number(a[sortBy]));
        this.setState({sort: "ascending"});
      }
    } else if (sortBy === "manufacture" || sortBy === "trade_name") {
      if (this.state.sort === "ascending") {
        products = products.sort((a: any, b:any) => b[sortBy].localeCompare(a[sortBy]));
        this.setState({sort: "descending"});
      } else {
        products = products.sort((a: any, b:any) => a[sortBy].localeCompare(b[sortBy]));
        this.setState({sort: "ascending"});
      }
    }
    this.chunkArray(products, this.state.numOfItems);
  };

  renderHead = () => {
    return (
      <tr>
        <th>
          #
        </th>
        <th style={{cursor: "pointer"}}  onClick={() => this.sort("trade_name")}>
          ITEM NAME
        </th>
        <th style={{cursor: "pointer"}} onClick={() => this.sort("manufacture")}>
          COUNTRY
        </th>
        {/*<th style={{cursor: "pointer"}} onClick={() => this.sort("product_dosage")}>*/}
        {/*  DOSE*/}
        {/*</th>*/}
        <th style={{cursor: "pointer"}} onClick={() => this.sort("sale_price")}>
          PRICE
        </th>
        <th style={{cursor: "pointer"}} onClick={() => this.sort("purchase_price")}>
          COST
        </th>
        <th  style={{cursor: "pointer"}} onClick={() => this.sort("expire_date")}>
          EXPIRE
        </th>
        <th style={{cursor: "pointer"}} onClick={() => this.sort("remain_amount")}>
          COUNT
        </th>
        <th style={{cursor: "pointer"}} className="text-center">
          ACTIONS
        </th>
      </tr>
    )
  };

  renderBody = () => {
    if(this.state.chunkArray.length > 0) {
      if(this.state.chunkArray[Number(this.props.pageNum) - 1]) {
        return this.state.chunkArray[Number(this.props.pageNum) - 1].map((item: any, i: number) => {
          const date = `${new Date(item.expire_date *1000).getFullYear()}/${new Date(item.expire_date *1000).getMonth() + 1}`;
          const id = i + 1;
          return (
            <tr key={item.item_id}>
              <td>
                {((this.props.pageNum - 1) * this.state.numOfItems) + id}
              </td>
              <td>
                {item.trade_name}
              </td>
              <td>
                {item.manufacture}
              </td>
              <td>
                {Number(item.sale_price).toFixed()}
              </td>
              <td>
                {Number(item.purchase_price).toFixed(2)}
              </td>
              <td>
                {date}
              </td>
              <td>
                {item.remain_amount}
              </td>
              <td className="text-center">
                <Link type="button" className="btn btn-primary" to={`/products/edit/${item.item_id}`}>
                  <i className="far fa-pen"/>
                </Link>
                <button type="button" className="btn btn-info">
                  <i className="fad fa-eye"/>
                </button>
                <Link className="btn btn-danger" to={`/logged/products/delete/${item.item_id}`}>
                  <i className="far fa-trash-alt"/>
                </Link>
              </td>
            </tr>
          )
        })
      }
    }
  };

  onPaginationClick = (i: number) => {
    this.props.getPaginationNum(i)
  };

  renderPagination = () => {
    const { pageNum } = this.props;
    if(this.props.products) {
      if (this.state.chunkArray. length > 0 ) {
        return(
          <>
            {pageNum > 3  &&
            <li className='page-item' onClick={() => this.onPaginationClick(1)}>
              <a className="page-link">
                1 ...
              </a>
            </li>
            }
            {pageNum - 1 > 0 &&
            <li className='page-item' onClick={() => this.onPaginationClick(pageNum - 1)}>
              <a className="page-link">
                {pageNum - 1}
              </a>
            </li>
            }
            <li className='page-item active' onClick={() => this.onPaginationClick(pageNum)}>
              <a className="page-link">
                { pageNum }
              </a>
            </li>
            {this.state.chunkArray[pageNum] &&
            <li className='page-item' onClick={() => this.onPaginationClick(pageNum + 1)}>
              <a className="page-link">
                {pageNum + 1}
              </a>
            </li>
            }
            {this.state.chunkArray[pageNum + 1] &&
            <li className='page-item' onClick={() => this.onPaginationClick(pageNum + 2)}>
              <a className="page-link">
                {pageNum + 2}
              </a>
            </li>
            }
            {pageNum  === 1 && this.state.chunkArray.length > 3 &&
            <li className='page-item' onClick={() => this.onPaginationClick(pageNum + 3)}>
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

  navigatePrev = () => {
    if(this.props.pageNum > 1) {
      const pageNum = this.props.pageNum - 1;
      this.props.getPaginationNum(pageNum)
    }
  };

  navigateFor = () =>{
    if (this.props.pageNum < this.state.chunkArray.length) {
      const pageNum = this.props.pageNum + 1;
      this.props.getPaginationNum(pageNum)
    }
  };

  onDropDownClick = (name: string) => {
    this.setState({searchBy: name});
    this.setState({isHide: false})
  };

  onInputChange = (e: any) => {
    const reports = this.props.products;
    if(reports.length > 0) {
      let value = e.target.value.replace(new RegExp("\\\\", "g"), "");
      this.checkValue(value, this.state.numOfItems)
    }
  };

  checkValue = (value: string, numOfItems: number) => {
    const reports = this.props.products;
    const searchBy = this.state.searchBy;
    this.setState({inputValue: value});

    let timeout;

    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }
    if (value.length > 0 && reports) {
      timeout = setTimeout(() => {
        this.onPaginationClick(1);
        this.setState({inputValue: value});
        let items = reports.filter((item: any) => {
          return item[searchBy].toLowerCase().search(value.toLowerCase()) !== -1;
        });
        this.chunkArray(items, numOfItems);
      }, 300);
      this.setState({timeout: timeout});
    } else {
      this.chunkArray(this.props.products, numOfItems);
      this.setState({inputValue: ""});
    }
  };

  onNumberClick = (num: number) => {
    this.setState({numOfItems: num});
    // this.chunkArray(this.props.products, num);
    this.checkValue(this.state.inputValue, num);
    this.setState({isHide2: false});
  };

  renderHeader () {
    const selectStyle = this.state.isHide ? "dropdown show": "dropdown";
    const dropMenue = this.state.isHide ? "dropdown-menu show" : "dropdown-menu";
    const selectStyle2 = this.state.isHide2 ? "dropdown show": "dropdown";
    const dropMenue2 = this.state.isHide2 ? "dropdown-menu show" : "dropdown-menu";
    return (
      <div style={{ marginBottom: '10px' }}>
        <div className="row">
          <div className="col-md-3 col-sm-4">

            <div className={selectStyle2} onClick={(e) => e.stopPropagation()}>
              <button
                className="btn btn-secondary dropdown-toggle navbar-brand" type="button"
                aria-expanded={this.state.isHide2}
                style={{
                  backgroundColor: "rgb(21, 33, 110)",
                  borderRadius: "60px",
                  color: "#fff",

                }}
                onClick={() => this.setState({isHide2: !this.state.isHide2})}
              >
                <span style={{fontSize: "0.5rem"}}>
                  {this.state.numOfItems}
                </span>
              </button>
              <div className={dropMenue2} style={{
                backgroundColor: "rgb(21, 33, 110)",
                // color: "rgb(21, 33, 110)",
              //  TODO DELETE HERE
                color: "red"
              }}>
                <div style={{ color: "#fff" }}>
                  <a className="dropdown-item" style={{cursor: "pointer"}}
                     onClick={() => this.onNumberClick(5)}>5</a>
                  <a className="dropdown-item" style={{cursor: "pointer"}}
                     onClick={() => this.onNumberClick(10)}>10</a>
                  <a className="dropdown-item" style={{cursor: "pointer"}}
                     onClick={() => this.onNumberClick(20)}>20</a>
                  <a className="dropdown-item" style={{cursor: "pointer"}}
                     onClick={() => this.onNumberClick(100)}>100</a>
                </div>
              </div>
            </div>

          </div>
          <div className="col-md-5 col-sm-8">
            <form>
              <div className="input-group" style={{marginTop: "8px"}}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="search for product"
                  onChange={this.onInputChange}
                  value={this.state.inputValue}
                  style={{backgroundColor: "#fff", height: "40px"}}
                />
                <div className="input-group-append" onClick={(e) => e.stopPropagation()}>
                  <div className="input-group-text"
                       style={{height: "40px", border: "none", padding: "0"}}>
                    <div className={selectStyle} style={{display: "inline"}}>
                      <button
                        className="btn btn-secondary dropdown-toggle navbar-brand" type="button"
                        aria-expanded={this.state.isHide}
                        style={{
                          backgroundColor: "#2CA8FF",
                          borderRadius: "0 30px 30px 0",
                          color: "#ffffff"
                        }}
                        onClick={() => this.setState({isHide: !this.state.isHide})}
                      >
                        {/*<span style={{fontSize: "0.5rem"}}>*/}
                          {this.state.searchBy == 'trade_name'? 'NAME': 'BARCODE'}
                        {/*</span>*/}
                      </button>
                      <div className={dropMenue} style={{ color: "#fff" }}>
                        <div style={{ color: "#000" }}>
                          <a className="dropdown-item" style={{cursor: "pointer"}}
                             onClick={() => this.onDropDownClick("trade_name")}>NAME</a>
                          <a className="dropdown-item" style={{cursor: "pointer"}}
                             onClick={() => this.onDropDownClick("barcode")}>BARCODE</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="text-right">
              <Link style={{borderRadius: "20px"}} className="btn btn-primary" to={routes.PRODUCT_NEW}>
                <i className="fal fa-plus-circle"/> Add Product</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.show) {
      return (
        <div
          onClick={() => {
            this.setState({isHide2: false});
            this.setState({isHide: false})
          }}
        >
          <div className={`row ${classes.page}`}>
            <div className="col-md-12">
              {this.renderHeader()}
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                      {this.renderHead()}
                      </thead>
                      <tbody>
                      {this.renderBody()}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-md-3 offset-5">
                      <ul className="pagination pagination-info">
                        <li className="page-item">
                          <div className="page-link" onClick={this.navigatePrev}>
													<span aria-hidden="true"><i
                            className="fa fa-angle-double-left" aria-hidden="true"/></span>
                          </div>
                        </li>
                        {this.renderPagination()}
                        <li className="page-item">
                          <div className="page-link" onClick={this.navigateFor}>
                            <span aria-hidden="true"><i className="fa fa-angle-double-right" aria-hidden="true"/></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return "";
  }
}


export default ProductsList;
