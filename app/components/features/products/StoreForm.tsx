import React, {Component} from 'react';
// @ts-ignore
import {Field, reduxForm} from "redux-form";

type Props = {
  onSave: (values: any) => void;
  initialValues: any;
  handleSubmit: (callback: any) => void
}

class StoreForm extends Component<Props, {}> {
  renderInput = (args: any) => {
    const { label, id, name, type, placeholder, input, meta, classes, notDisable } = args;
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
          disabled={notDisable}
        />
        {this.renderError(meta)}
      </div>
    )
  };
  renderTextArea = (args: any) => {
    const { label, id, name, placeholder, input, classes } = args;
    return (
      <div className="form-group col-md-12">
        <label htmlFor={id} style={{textTransform: "uppercase", color: "black", fontWeight: "700"}}>{label}</label>
        <textarea
          className={classes}
          id={id}
          placeholder={placeholder}
          name={name}
          {...input}
          autoComplete="off"
          rows="3"
        />
      </div>
    )
  };
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
  submitHandle = (formValues: any) => {
    this.props.onSave(formValues);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.submitHandle)}>
        <div className="form-row">
          <Field
            label="store name"
            id="inputStoreName"
            name="store"
            type="text"
            component={this.renderInput}
            placeholder="Enter the Store name"
            classes="form-control"
            notDisable={this.props.initialValues.store}
          />

          <Field
            label="store invoice number"
            id="inputStoreInvoiceNumber"
            name="store_invoice"
            type="number"
            component={this.renderInput}
            placeholder="Enter the Store invoice number"
            classes="form-control"
            notDisable={this.props.initialValues.store_invoice}
          />

          <Field
            label="NOTE"
            id="inputStoreNote"
            name="note"
            component={this.renderTextArea}
            placeholder="Enter your notes here"
            classes="form-control"
          />
        </div>
        <div className="card-footer text-right">
          <button className="btn btn-success btn-round btn-lg">
            <i style={{paddingRight: "10px", fontSize: "20px"}} className="fal fa-plus-circle"/> Save
          </button>
        </div>
      </form>
    );
  }
}

const validate = (formValues: any) => {
  let error = {
    store: "",
    store_invoice: ""
  };
  if(!formValues.store) {
    error.store = "Enter store name";
  }
  if(!formValues.store_invoice) {
    error.store_invoice = "Enter store invoice number";
  }
  return error
};

export default 	reduxForm({form: "productDetails", validate})(StoreForm);
