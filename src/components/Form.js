import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Input from './Input';
import { required, nonEmpty, mustBeNumber, fiveCharacters } from '../validators';

class Form extends Component {

  onSubmit(values) {
    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.headers.has('content-type') && res.headers.get('content-type').startsWith('application/json')) {
            return res.json().then(err => Promise.reject(err));
          }
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        return;
      })
      .then(() => console.log('Submitted with values', values))
      .catch(err => {
        const { reason, message, location } = err;
        if (reason === 'ValidationError') {
          return Promise.reject(
            new SubmissionError({
              [location]: message
            })
          );
        }
        return Promise.reject(
          new SubmissionError({
            _error: 'Error submitting message'
          })
        );
      });
  }

  render() {

    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message-success">
          Message sumbitted successfully.
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message-error">
          {this.props.error}
        </div>
      );
    }

    return (
      <div>
        <h1>Report a problem with your delivery</h1>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {successMessage}
          {errorMessage}
          <label htmlFor="trackingNumber">Tracking Number</label>
          <Field name="trackingNumber" id="trackingNumber" type="text" component={Input} validate={[required, nonEmpty, mustBeNumber, fiveCharacters]} />
          <label htmlFor="issue">What is your issue?</label>
          <Field name="issue" id="issue" component="select">
            <option value=""></option>
            <option value="not-delivered">My delivery hasn't arrived</option>
            <option value="wrong-item">The wrong item was delivered</option>
            <option value="missing-part">Part of my order was missing</option>
            <option value="damaged">Some of my order arrived damaged</option>
            <option value="other">Other (give details below)</option>
          </Field>
          <label htmlFor="details">Give more details (optional)</label>
          <Field name="details" id="details" component="textarea" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'tracking'
})(Form);