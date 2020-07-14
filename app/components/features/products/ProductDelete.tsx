import React, {Component} from 'react';
import {History, LocationState} from 'history'

import Modal from "../../ui/Modal";

type Props = {
  auth: any;
  products: any;
  getProducts: (id: string) => void;
  deleteProduct: (id: string) => void;
  history: History<LocationState>;
  match: any;
}

interface State {
  fadeStyle: string;
  show: boolean;
  item: any
}

class ProductDelete extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fadeStyle: "modalFadein",
      show: true,
      item: {}
    }
  }

  componentDidMount() {
    if(this.props.auth.authenticateUser) {
      this.props.getProducts(this.props.auth.authenticateUser.UsersId);
      this.setState({item: this.props.products[this.props.match.params.id]})
    }
  }

  onDismiss () {
    this.setState({fadeStyle: "modalFadeout"});
    this.setState({show: false});
    setTimeout(() => {
      this.props.history.push("/logged/products");
    }, 500)
  }

  deleteItem = () => {
    this.props.deleteProduct(this.props.match.params.id);
    this.onDismiss()
  };

  renderFooter() {
    return (
      <>
        <button className="btn btn-secondary" onClick={() => this.onDismiss()}>close</button>
        <button className="btn btn-danger" onClick={() => this.deleteItem()}>delete Item</button>
      </>
    )
  }

  renderTitle() {
    return(
      <h5 className="modal-title">Delete item</h5>
    )
  }

  renderBody = () => {
    if(this.props.products[this.props.match.params.id]) {
      const item = this.props.products[this.props.match.params.id];
      return (
        <p>Are you sure you want to delete <strong>{item.trade_name}</strong> - <strong>{item.scientific_name}</strong> ?</p>
      )
    } else {
      return <p>loading</p>
    }
  };
  render() {
    return (
        <Modal
          deleteItem={() => this.deleteItem()}
          show={this.state.show}
          fadeStyle={this.state.fadeStyle}
          onDismiss={() => this.onDismiss()}
          renderTitle={this.renderTitle}
          renderBody={this.renderBody}
          renderFooter={this.renderFooter}
        />
    )
  }
}

export default ProductDelete;
