import * as React from "react";
import {Component, FormEvent} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Route, RouteComponentProps, Switch} from "react-router";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

interface AuthState {
  manualLogin: boolean
  formValues: { [key: string]: string }
}

export class Auth extends Component<RouteComponentProps, AuthState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      manualLogin: false,
      formValues: {
        "merchant_id": "",
        "access_token": "",
        "environment": "prod",
      },
    };
  }

  updateInput = (event: FormEvent<any>) => {
    const target = event.target as HTMLInputElement;
    this.setState((state) => {
      return {
        formValues: {
          ...state.formValues,
          [target.id]: target.value,
        },
      };
    });
  };

  submit = (e: FormEvent) => {
    e.stopPropagation();

    let formValues = this.state.formValues;
    let params = new URLSearchParams();
    for (let key in formValues) {
      params.append(key, formValues[key]);
    }
    console.log(params.toString());
    this.props.history.push(`/oauth_callback?${params.toString()}`);
  };

  manualForm = () => {
    return (
      <Form onSubmit={this.submit}>
        <Form.Group controlId="merchant_id">
          <Form.Label>Merchant ID</Form.Label>
          <Form.Control type="text" value={this.state.formValues["merchant_id"]} onChange={this.updateInput}/>
        </Form.Group>
        <Form.Group controlId="access_token">
          <Form.Label>Access Token</Form.Label>
          <Form.Control type="text" value={this.state.formValues["access_token"]} onChange={this.updateInput}/>
        </Form.Group>
        <Form.Group controlId="environment">
          <Form.Label>Environment</Form.Label>
          <Form.Control as="select" value={this.state.formValues["environment"]} onChange={this.updateInput}>
            <option value="prod">prod (www.clover.com)</option>
            <option value="sandbox">sandbox (sandbox.dev.clover.com)</option>
          </Form.Control>
        </Form.Group>
        <Button className="mr-1" variant="primary" type="submit">
          Login
        </Button>
        <Button className="ml-1" variant="secondary" onClick={() => this.setState({manualLogin: false})}>Back</Button>
      </Form>
    );
  };

  buttons = () => {
    return (
      <div>
        <h2>Clover POS Web Data Connector</h2>
        <ButtonToolbar>
          <Button className="mr-1" variant="primary" href="https://clover-wdc.manbeardo.com/connect?environment=prod">
            Login with Clover
          </Button>
          <Button className="mx-1" variant="secondary"
                  href="https://clover-wdc.manbeardo.com/connect?environment=sandbox">
            Login with Clover (Sandbox)
          </Button>
          <Button className="ml-1" variant="secondary" onClick={() => this.setState({manualLogin: true})}>
            Login manually
          </Button>
        </ButtonToolbar>
      </div>
    );
  };

  render(): React.ReactNode {
    if (this.state.manualLogin) {
      return this.manualForm()
    }
    return this.buttons();
  }
}