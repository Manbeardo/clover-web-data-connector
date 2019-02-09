import * as React from "react";
import {Component} from "react";
import Button from "react-bootstrap/Button";
import {CloverCredentials, getCredentialsFromLocation} from "../CloverCredentials";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import {SyncLoader} from "react-spinners";
import {cloverClient} from "../CloverClient";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import errorImage from "../assets/error.jpg";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

export interface ConfirmProps extends RouteComponentProps {
  callback: (creds: CloverCredentials) => void
}

interface GetMerchantResponse {
  name: string
  id?: string
  website?: string
  phoneNumber?: string
}

interface ConfirmState {
  creds: CloverCredentials
  merchantInfo?: GetMerchantResponse
  error: boolean
}

export class Confirm extends Component<ConfirmProps, ConfirmState> {
  constructor(props: ConfirmProps) {
    super(props);
    this.state = {
      creds: getCredentialsFromLocation(props.location),
      error: false,
    };

    cloverClient.get<GetMerchantResponse>(`/v3/merchants/${this.state.creds.merchantID}`, {
      creds: this.state.creds,
    }).then((resp) => this.setState({
      merchantInfo: resp,
    })).catch((err) => {
      console.error(err);
      this.setState({error: true});
    });
  }

  submit = () => {
    this.props.callback(this.state.creds);
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <Alert variant="danger">
            There was an error connecting to Clover.&nbsp;
            <Alert.Link><Link to="/authorize">Try connecting again.</Link></Alert.Link>
          </Alert>
          <Image src={errorImage} fluid/>
        </div>);
    }

    let listEntries = [];
    let merchant = this.state.merchantInfo;
    if (merchant) {
      if (merchant.name) {
        listEntries.push(<ListGroup.Item key="name"><b>Name:</b> {merchant.name}</ListGroup.Item>);
      }
      if (merchant.id) {
        listEntries.push(<ListGroup.Item key="id"><b>ID:</b> {merchant.id}</ListGroup.Item>);
      }
      if (merchant.website) {
        listEntries.push(<ListGroup.Item key="website"><b>Website:</b> {merchant.website}</ListGroup.Item>);
      }
      if (listEntries.length === 0) {
        listEntries.push(<ListGroup.Item key="unknown">???</ListGroup.Item>);
      }
      return (
        <div>
          <Alert variant="primary">
            Please confirm your business details
          </Alert>
          <ListGroup>
            {listEntries}
          </ListGroup>
          <ButtonToolbar className="mt-3">
            <Button className="mr-1" variant="primary" onClick={this.submit}>Looks good!</Button>
            <Link to="/authorize"><Button className="ml-1" variant="secondary">Back</Button></Link>
          </ButtonToolbar>
        </div>
      );
    }

    return (
      <SyncLoader/>
    );
  }
}