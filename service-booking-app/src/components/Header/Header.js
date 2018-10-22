import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="sub-header">
        <Link to={this.props.goBackLink} className="icon-back" />
        <h2>{this.props.headerTitle}</h2>
        {this.props.children}
      </header>
    );
  }
}
