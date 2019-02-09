import {Component} from "react";
import {PhaseEnumValue} from "tableau";
import * as React from "react";
import Container from "react-bootstrap/Container";
import {Auth} from "./Auth";
import {Confirm} from "./Confirm";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {OauthCallback} from "./OauthCallback";
import {CloverCredentials, getCredentialsFromLocation} from "../CloverCredentials";

export interface AppProps {
  phase: PhaseEnumValue
  callback: (creds: CloverCredentials) => void
}

export class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.state = {};
  }

  confirmCallback = (creds: CloverCredentials) => {
    this.props.callback(creds);
  };

  render() {
    return (
      <Container className="mt-3">
        <HashRouter hashType={"slash"}>
          <Switch>
            <Route exact path="/authorize" component={Auth}/>
            <Route exact path="/oauth_callback" component={OauthCallback}/>
            <Route exact path="/confirm"
                   render={(props) => <Confirm {...props} callback={this.confirmCallback}/>}/>
            <Route render={() => <Redirect to="/authorize"/>}/>
          </Switch>
        </HashRouter>
      </Container>
    );
  }
}