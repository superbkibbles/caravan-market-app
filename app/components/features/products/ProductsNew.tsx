import React, {Component} from 'react';
import { History, LocationState } from 'history';
import moment from 'moment';

import routes from '../../../constants/routes.json'
import ProductsForm from "./ProductsForm";
import StoreForm from "./StoreForm";
import classes from "./index.css";

type Props = {
  getPageName: (name: string) => void;
  auth: any;
  createProductDetails: (values: any, products: any, callback: () => void) => void;
  buyInvoice: number;
  getBuyInvoice: (pharmacyId: string) => void;
  history: History<LocationState>;
  getProducts: (usersId: number) => void;
  products: any;
  getAllPharmaciesItems: (id: number) => void;
};

interface State {
  addedProducts: any;
  totalCash: number;
  isHide: boolean;
  searchBy: string;
  value: string;
  foundProducts: any;
  timeout: any;
  inputValue: string;
  clickedItem: any;
}

class ProductNew extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      addedProducts: [],
      totalCash: 0,
      isHide: false,
      searchBy: "barcode",
      value: "",
      foundProducts: [],
      timeout: 0,
      inputValue: "",
      clickedItem: {}
    }
  }

  componentDidMount(): void {
    const { auth, getPageName, getBuyInvoice, getAllPharmaciesItems } = this.props;
    getPageName("products | new");
    if(auth.authenticateUser) {
      getBuyInvoice(auth.authenticateUser.UsersId);
      getAllPharmaciesItems(auth.authenticateUser.UsersId);
    }
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 300);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { auth } = this.props;
    if(auth.authenticateUser) {
      if(prevProps.products.length !== this.props.products.length) {
        this.props.getAllPharmaciesItems(auth.authenticateUser.UsersId);
      }
    }
  }

  submitHandle = (formValues: any) => {
    const values = formValues;

    values.manufacture_date = new Date(formValues.manufacture_date).getTime() / 1000;
    values.expire_date = new Date(formValues.expire_date).getTime() / 1000;
    values.purchase_invoice = this.props.buyInvoice;
    values.id = this.props.auth.authenticateUser.UsersId;

    this.setState(prevState => ({
      addedProducts: [...prevState.addedProducts, {...values}],
      totalCash: Number(prevState.totalCash + (values.purchase_price * values.purchase_amount))
    }));
    this.setState({clickedItem: []});
    setTimeout(() => {
      window.scrollBy(0, 2000);
    }, 500);
  };

  renderButton() {
    return (
      <button type="submit" className="btn btn-success btn-round btn-lg">
        <i style={{paddingRight: "10px", fontSize: "20px"}} className="fal fa-plus-circle"/> Add
      </button>
    )
  }

  renderHeader = () => {
    if(this.props.buyInvoice) {
      return (
        <div className="text-center" style={{fontSize: "1.65em", fontWeight: "700", marginBottom: "30px"}}>
          # {this.props.buyInvoice}
        </div>
      )
    }
    return "";
  };

  renderHead = () => {
    return (
      <tr>
        <th>
          #
        </th>
        <th>
          ITEM NAME
        </th>
        <th>
          COUNTRY
        </th>
        <th>
          cost
        </th>
        <th>
          COUNT
        </th>
        <th className="text-center">
          Actions
        </th>
      </tr>
    )
  };

  onDelete = (i: number) => {
    this.setState(prevState => ({
      addedProducts: prevState.addedProducts.filter((_: number, id: number) => id !== i),
      totalCash: Number(prevState.totalCash - (prevState.addedProducts[i].purchase_price * prevState.addedProducts[i].purchase_amount))
    }));
  };

  renderBody = () => {
    if(this.state.addedProducts.length > 0) {
      return this.state.addedProducts.map((item: any, i: number) => {
        return (
          <tr key={i}>
            <td>
              {i + 1}
            </td>
            <td>
              {item.trade_name}
            </td>
            <td>
              {item.manufacture}
            </td>
            <td>
              {item.purchase_price}
            </td>
            <td>
              {item.purchase_amount}
            </td>
            <td className="text-center">
              <button onClick={() => this.onDelete(i)} className="btn btn-danger">
                <i className="far fa-trash-alt"/>
              </button>
            </td>
          </tr>
        )
      })
    }
  };

  onSave = (formValues: any) => {
    const values = formValues;
    values.purchase_invoice = this.props.buyInvoice;
    values.id = this.props.auth.authenticateUser.UsersId;
    values.total_invoice_price = this.state.totalCash;
    if(!values.note) {
      values.note ="";
    }
    if(formValues.total_invoice_price && formValues.id) {
      this.props.createProductDetails(values, this.state.addedProducts, () => {
        this.props.history.push(routes.PRODUCTS);
      });
    }
  };

  renderFooter = () => {
    if(this.state.addedProducts.length > 0) {
      return (
        <div className="container-fluid">
          <StoreForm
            onSave={this.onSave}
            initialValues = {{
              store: "",
              store_invoice: ""
            }}
          />
        </div>
      )
    }
    return "";
  };

  handleChange = (e: any) => {
    const products = this.props.products;
    if(products.length > 0) {
      let value = e.target.value.replace(new RegExp("\\\\", "g"), "");
      const searchBy = this.state.searchBy;
      this.setState({value: value});

      let timeout;
      if (this.state.timeout) {
        clearTimeout(this.state.timeout)
      }
      if (value.length > 0 && products) {
        timeout = setTimeout(() => {
          this.setState({inputValue: value});
          let items = products.filter((item: any) => {
            return item[searchBy].toLowerCase().search(value.toLowerCase()) !== -1;
          });
          this.setState({foundProducts: items});
        }, 300  );
        this.setState({timeout: timeout});
      } else {
        this.setState({foundProducts: []});
        this.setState({inputValue: ""});
      }
    }
  };

  renderFound = () => {
    return (
      <div className="container">
        {this.state.foundProducts.map((item: any) => {
          const time = item.expire_date * 1000;
          const date = `${new Date(time).getFullYear()}/${new Date(time).getMonth() + 1}`;
          return(
            <div onClick={() => this.onItemClick(item)} key={item.id} className={classes.hoveredItem}>
              <div className="row">
                <p className="col-md-5">{item.trade_name}</p>
                <p className="col-md-5">{item.sale_price}</p>
                <p className="col-md-2">{date}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  };

  onItemClick = (item: any) => {
    this.setState({clickedItem: item});
    this.setState({inputValue: ""});
    this.setState({foundProducts: []})
  };


  renderNotFound() {
    return (
      <div className="container">
        <h4 style={{marginTop: "15px"}}>Oops! Item not found</h4>
      </div>
    )
  }

  renderFoundProducts = ()=> {
    if(this.state.inputValue.length > 0) {
      if(this.state.foundProducts.length === 1 && this.state.searchBy === "barcode") {
        this.onItemClick(this.state.foundProducts[0]);
      }
      return (
        <div style={{
          maxHeight: "300px",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#fff",
          width: "100%",
          overflowY: "auto",
          zIndex: 1,
          position: "absolute",
          top: "60px",
          boxShadow: "5px -5px 20px rgba(0,0,0, 0.2)"
        }}>
          {
            this.state.foundProducts.length > 0 ? this.renderFound(): this.renderNotFound()
          }
        </div>
      )
    }
    return "";
  };

  onDropDownClick = (by: string) => {
    this.setState({searchBy: by});
    this.setState({isHide: false});
  };


  renderInput = () => {
    const selectStyle = this.state.isHide ? "dropdown show": "dropdown";
    const dropMenue = this.state.isHide ? "dropdown-menu show" : "dropdown-menu";
    return  (
      <div style={{padding: '0 30%', marginBottom: '20px' }}>
        <div className="input-group" style={{marginTop: "10px"}}>
          <input
            type="text"
            className="form-control"
            placeholder={`search by ${this.state.searchBy}`}
            style={{height: "40px", background: "#fff"}}
            value={this.state.value}
            onChange={(e) => this.handleChange(e)}
          />
          {this.renderFoundProducts()}
          <div className="input-group-append">
            <div className="input-group-text" style={{height: "40px", border: "none", padding: "0"}}>
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
                  {this.state.searchBy == 'trade_name'? 'NAME': 'BARCODE'}
                </button>
                <div className={dropMenue} style={{ color: '#fff' }}>
                  <div style={{ color: '#000' }}>
                    <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.onDropDownClick("trade_name")}>NAME</a>
                    <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.onDropDownClick("barcode")}>BARCODE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
  render() {
    return (
      <div className={classes.page}>
        {this.renderInput()}
       <ProductsForm
          onSubmit={this.submitHandle}
          renderButton={() => this.renderButton()}
          initialValues={this.state.clickedItem.trade_name && {
            ...this.state.clickedItem,
            manufacture_date: moment(this.state.clickedItem.manufacture_date * 1000).format('YYYY-MM-DD'),
            expire_date: moment(this.state.clickedItem.expire_date * 1000).format('YYYY-MM-DD')
          }}
        />
        {
          this.state.addedProducts.length > 0 &&
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  {this.renderHeader()}
                  <table className="table">
                    <thead>
                    {this.renderHead()}
                    </thead>
                    <tbody>
                    {this.renderBody()}
                    </tbody>
                  </table>
                  {this.renderFooter()}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ProductNew;
