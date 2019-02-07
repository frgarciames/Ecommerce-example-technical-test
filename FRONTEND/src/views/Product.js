import React, { Component } from 'react';

export default class Product extends Component {

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id)
  }

  render() {
    return (
      <p>Product page</p>
    )
  }
}