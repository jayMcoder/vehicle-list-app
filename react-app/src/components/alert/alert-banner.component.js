import { Component } from 'react';
import { Alert } from 'react-bootstrap';

class AlertBanner extends Component {

  render() {
    return(
      <Alert variant={this.props.variant}>
        {this.props.message}
      </Alert>
    );
  }
}

export default AlertBanner;