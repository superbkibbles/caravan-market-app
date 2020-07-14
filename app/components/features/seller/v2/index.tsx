/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { History, LocationState } from 'history';
// TODO might change background to this one #462a2a

import Ads from '../../../../HOC/ads';
import FindProducts from './FindProducts';
import Cart from './Cart';
import Checkout from './Checkout';
import Header from './Header';
import routes from '../../../../constants/routes.json';

type Props = {
  products: any;
  auth: any;
  sellInvoice: number;
  history: History<LocationState>;
  getProducts: (id: string) => void;
  getSellInvoice: (storeId: string, userId: string) => void;
  logoutUser: (callback: () => void) => void;
  sellProducts: (detail: any, sell: any) => void;
};

type State = {
  products: any;
  productsCopy: any;
  isHide: boolean;
  addedItems: any;
  totalCount: number;
  totalCash: number;
  clickedItem: any;
  totalDiscount: number;
  soldTimes: number;
  UserName: string;
};

class Seller extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],
      productsCopy: [],
      isHide: false,
      addedItems: [],
      totalCount: 0,
      totalCash: 0,
      clickedItem: {},
      totalDiscount: 0,
      soldTimes: 0,
      UserName: ''
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onKeyDown.bind(this));
    if (this.props.auth.authenticateUser) {
      if (this.props.auth.authenticateUser.AuthorizationType !== 'Pharmacist') {
        this.props.history.push('/');
      }
      this.setState({UserName: this.props.auth.authenticateUser.UserName});
      this.props.getProducts(this.props.auth.authenticateUser.UsersId);
      this.props.getSellInvoice(
        this.props.auth.authenticateUser.UsersId,
        this.props.auth.authenticateUser.PharmacyUsersId
      );
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.products.length !== this.props.products.length) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { products } = this.props;

    products.forEach((item: any) => {
      item.count = 0;
    });
    products.forEach((item: any) => {
      item.lastCount = 0;
    });
    this.setState({products: products});
    this.setState({ productsCopy: products });
  };

  onKeyDown(e: any) {
    if (e.keyCode === 32) {
      console.log('add more Product');
    }
    if (e.keyCode === 43) {
      console.log('plus num of product');
    }
    if (e.keyCode === 95) {
      console.log('minimise num of product');
    }
  }

  clickHandler = (value: boolean) => {
    this.setState({ isHide: value });
  };

  onAddHandler = (item: any) => {
    if (item.hasOwnProperty('item_id')) {
      if (item.remain_amount - item.count >= 0) {
        if (this.state.addedItems.length > 0) {
          let exist = false;
          for (let i = 0; i < this.state.addedItems.length; i++) {
            if (item.item_id === this.state.addedItems[i].item_id) {
              exist = !exist;
            }
          }
          if (!exist) this.addItem(item);
        } else {
          this.addItem(item);
        }
      }
    }
  };

  addItem = (item: any) => {
    const items = this.state.addedItems;
    const { count } = item;
    const products = this.state.productsCopy.filter(
      (product: any) => product.item_id !== item.item_id
    );
    let { totalCount } = this.state;
    let { totalCash } = this.state;

    totalCount = totalCount + count - item.lastCount;
    items.push(item);
    totalCash = Number(
      totalCash + item.sale_price * ((item.count - item.lastCount))
    );

    this.setState({ productsCopy: products });
    this.setState({totalCash: totalCash});
    this.setState({ addedItems: items });
    this.setState({totalCount: totalCount});
    this.setState({ totalDiscount: 0 });
  };

  incrementCount = (id: number) => {
    const items = this.state.addedItems;
    let { totalCount } = this.state;
    let { totalCash } = this.state;

    if (items[id].remain_amount > items[id].count) {
      items[id].count++;
      totalCount = this.state.totalCount + 1;
      totalCash = Number(totalCash + items[id].sale_price * 1);
    }

    this.setState({totalCash: totalCash});

    this.setState({totalCount: totalCount});
    this.setState({ addedItems: items });
  };

  decrementCount = (id: number) => {
    const items = this.state.addedItems;
    let { totalCount } = this.state;
    let { totalCash } = this.state;

    if (items[id].count - items[id].lastCount > 1) {
      totalCount = this.state.totalCount - 1;
      totalCash = Number(totalCash - items[id].sale_price * 1);
      items[id].count--;
    }

    this.setState({totalCash: totalCash});
    this.setState({totalCount: totalCount});
    this.setState({ addedItems: items });
  };
  onCheckoutClick = () => {
    const addedProducts = this.state.addedItems;
    if (addedProducts.length > 0) {
      const saleDetails = {
        id: 0,
        sale_invoice: 0,
        total_price: 0,
        user_id: 0,
        discount: 0,
        note: ''
      };
      saleDetails.id = this.props.auth.authenticateUser.UsersId;
      saleDetails.sale_invoice = this.props.sellInvoice + this.state.soldTimes;
      saleDetails.user_id = this.props.auth.authenticateUser.PharmacyUsersId;
      saleDetails.total_price = Number(this.state.totalCash.toFixed(2));
      saleDetails.discount = this.state.totalDiscount;
      saleDetails.note = '';
      const sale = addedProducts.map((item: any) => {
        const details = {
          id: 0,
          item_id: 0,
          sale_amount: 0,
          sale_invoice: 0,
          total_price: 0
        };
        details.id = this.props.auth.authenticateUser.UsersId;
        details.item_id = item.item_id;
        details.sale_amount = item.count - item.lastCount;
        details.sale_invoice = this.props.sellInvoice + this.state.soldTimes;
        details.total_price = Number((item.sale_price * (item.count - item.lastCount)).toFixed(2)
        );
        return details;
      });
      this.props.sellProducts(saleDetails, sale);

      const { productsCopy } = this.state;
      const copy = productsCopy;
      addedProducts.forEach((item: any) => {
        item.lastCount = item.count;
        copy.push(item);
      });
      this.setState({ products: copy });
      this.setState({ addedItems: [] });
      this.setState({clickedItem: {}});
      this.setState({ totalCount: 0 });
      this.setState({ totalCash: 0 });
      this.setState(prevState => ({
        soldTimes: prevState.soldTimes + 1
      }));
    }
  };

  deleteItem = (item: any) => {
    const { productsCopy } = this.state;
    const filtered = this.state.addedItems.filter(
      (it: any) => it.item_id !== item.item_id
    );
    let totalCash = this.state.totalCash;

    totalCash = totalCash - (item.sale_price * (item.count - item.lastCount));

    const ITEM = item;
    ITEM.count = ITEM.lastCount;
    productsCopy.push(item);


    this.setState({productsCopy: productsCopy});
    this.setState({ addedItems: filtered });
    this.setState({ totalCount: 0 });
    this.setState({ totalCash: totalCash });
  };

  // sign out
  onSignOut = () => {
    this.props.logoutUser(() => {
      this.props.history.push(routes.USERS_LOGIN);
    });
  };

  onDiscountChange = (value: number) => {
    this.setState({ totalDiscount: value });
  };

  render() {
    const { UserName } = this.state;
    return (
      <Header userName={ UserName } onSignOut={this.onSignOut}>
        <Ads/>
        <div className="content" style={{ fontSize: '0.7rem' }}>
          <div className="row">
            <div className="col-md-12">
              <div
                className="card"
                // style={{background: "#2f1717"}}
                // style={{ background: 'rgb(93, 35, 35)' }}
                // style={{ background: '#18CD9A' }}
                style={{backgroundImage: "linear-gradient(to right bottom , #18CD9A, #2f1717)" }}
              >
                <div className="card-body">
                  <div
                    onClick={() =>
                      this.state.isHide && this.setState({ isHide: false })
                    }
                  >
                    <FindProducts
                      // clickedItem={this.state.clickedItem}
                      // onClickItem={(item: any) => this.setState({clickedItem: {...item}})}
                      products={this.state.products}
                      isHide={this.state.isHide}
                      clickHandler={value => this.clickHandler(value)}
                      onAddHandler={item => this.onAddHandler(item)}
                    />
                    <Cart
                      onDelete={item => this.deleteItem(item)}
                      decrement={id => this.decrementCount(id)}
                      increment={id => this.incrementCount(id)}
                      items={this.state.addedItems}
                    />
                    <Checkout
                      onCheckout={() => this.onCheckoutClick()}
                      totalCash={this.state.totalCash}
                      onDiscountChange={value => this.onDiscountChange(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

export default Seller;
