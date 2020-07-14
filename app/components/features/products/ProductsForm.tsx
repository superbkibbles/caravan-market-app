import React, {Component} from 'react';
// @ts-ignore
import {Field, reduxForm} from "redux-form";

type Props = {
  handleSubmit: (func: any) => void;
  onSubmit: any;
  initialValues: any;
  reset: () => void;
  renderButton: any;
};

class ProductsForm extends Component<Props, {}> {
  renderError(args: any){
    const { touched, error } = args;
    if (touched && error) {
      return (
        <div
          style={{
            padding: "5px 5px",
            color: "red"
          }}
        >
          {error}
        </div>
      )
    }
    return "";
  }

  renderInput = (args: any) => {
    const { label, id, name, type, placeholder, input, meta, classes } = args;
    const borderColor =  meta.touched && meta.error ? "#e44947": "";
    return (
      <div className="form-group col-md-6">
        <label htmlFor={id} style={{textTransform: "uppercase", color: "black", fontWeight: "700"}}>{label}</label>
        <input
          style={{borderColor: borderColor}}
          className={classes}
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          {...input}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    )
  };

  submitHandle = async (formValues: any) => {
    await this.props.onSubmit(formValues);
    this.props.reset()
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <form onSubmit={this.props.handleSubmit(this.submitHandle)}>
                  <div className="form-row">
                    <Field
                      label="Name"
                      id="inputTradeName"
                      name="trade_name"
                      type="text"
                      component={this.renderInput}
                      placeholder="Enter the trade name"
                      classes="form-control"
                    />

                    <Field
                      label="brand name"
                      id="inputBrandName"
                      name="brand"
                      type="text"
                      component={this.renderInput}
                      placeholder="Enter the brand name"
                      classes="form-control"
                    />

                    <Field
                      label="manufacture"
                      id="inputManufacture"
                      name="manufacture"
                      type="text"
                      component={this.renderInput}
                      placeholder="Enter the name of manufacture"
                      classes="form-control"
                    />
                    <Field
                      label="cost"
                      id="inputCost"
                      name="purchase_price"
                      type="number"
                      component={this.renderInput}
                      placeholder="Enter the cost of product"
                      classes="form-control"
                    />

                    <Field
                      label="price"
                      id="inputPrice"
                      name="sale_price"
                      type="number"
                      component={this.renderInput}
                      placeholder="Enter the price of product"
                      classes="form-control"
                    />

                    <Field
                      label="barcode"
                      id="inputBarcode"
                      name="barcode"
                      type="number"
                      component={this.renderInput}
                      placeholder="Enter barcode"
                      classes="form-control"
                    />
                    <Field
                      label="count"
                      id="inputCount"
                      name="purchase_amount"
                      type="number"
                      component={this.renderInput}
                      placeholder="Enter count"
                      classes="form-control"
                    />

                    <Field
                      label="free"
                      id="inputFree"
                      name="free"
                      type="number"
                      component={this.renderInput}
                      placeholder="Enter free pieces given"
                      classes="form-control"
                    />

                    <Field
                      label="free salesman"
                      id="inputSaleMan"
                      name="salesmen_free"
                      type="number"
                      component={this.renderInput}
                      placeholder="Enter salesman given pieces"
                      classes="form-control"
                    />

                    <Field
                      label="manufacture date"
                      id="inputManufactureDate"
                      name="manufacture_date"
                      type="date"
                      component={this.renderInput}
                      placeholder=""
                      classes="form-control"
                    />

                    <Field
                      label="expire date"
                      id="inputProductType"
                      name="expire_date"
                      type="date"
                      component={this.renderInput}
                      placeholder=""
                      classes="form-control"
                    />
                  </div>
                  <div className="card-footer text-right">
                    {this.props.renderButton()}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues: any) => {
  let error: any = {};
  if (!formValues.trade_name) {
    error.trade_name = "Enter the trade name of the product";
  }
  if (!formValues.brand) {
    error.brand = "Enter the brand name of the product";
  }
  if (!formValues.manufacture) {
    error.manufacture = "Enter manufacture name";
  }
  if (!formValues.sale_price) {
    error.sale_price = "Enter the price of the product";
  }
  if (!formValues.purchase_amount) {
    error.purchase_amount = "Enter the count of the product";
  }
  if (!formValues.purchase_price) {
    error.purchase_price = "Enter the count of the product";
  }
  if (!formValues.barcode) {
    error.barcode = "Enter the barcode of the product";
  }
  if(!formValues.manufacture_date) {
    error.manufacture_date = "Enter manufacture date";
  }
  if(!formValues.expire_date) {
    error.expire_date = "Enter expiry date";
  }
  if(!formValues.free) {
    error.free = "Enter free brought pieces";
  }
  if(!formValues.salesmen_free) {
    error.salesmen_free = "Enter free pieces given from the salesman";
  }
  if (formValues.purchase_price <= 0) {
    error.purchase_price = "enter number bigger than 0";
  }
  if(new Date(formValues.manufacture_date).getTime()/1000 > new Date().getTime()/1000) {
    error.manufacture_date = "not valid manufacture date";
  }
  if(new Date(formValues.expire_date).getTime()/1000 < new Date().getTime()/1000) {
    error.expire_date = "not valid expiry date";
  }
  if (formValues.price <= 0) {
    error.price = "enter number bigger than 0";
  }
  return error;
};

export default reduxForm({form: "productForm", validate, enableReinitialize: true})(ProductsForm);
