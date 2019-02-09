import {Component} from "react";
import {Redirect, RouteComponentProps} from "react-router";
import * as React from "react";

export class OauthCallback extends Component<RouteComponentProps> {
  render() {
    return <Redirect to={`/confirm${this.props.location.search}`}/>;
  }
}