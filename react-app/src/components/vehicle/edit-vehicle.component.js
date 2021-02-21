import { Component, Fragment } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ContentService from '../../services/content.service';
import VehicleService from '../../services/vehicle.service';
import { currencyFormat } from '../../util/StringFormatter';
import AlertBanner from '../alert/alert-banner.component';

class EditVehicle extends Component {

  constructor(props) {
    super(props);

    console.log(this.props.match.params.modelEditionId);

    this.getContent = this.getContent.bind(this);
    this.getVehicleDetailsToEdit = this.getVehicleDetailsToEdit.bind(this);
    this.onChangeModelEditionBasePrice = this.onChangeModelEditionBasePrice.bind(this);
    this.onChangeModelEditionDescription = this.onChangeModelEditionDescription.bind(this);
    this.saveVehicleDetails = this.saveVehicleDetails.bind(this);
    this.setAlertDetail = this.setAlertDetail.bind(this);
    this.setSubmitted = this.setSubmitted.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValidated = this.setValidated.bind(this);

    const labels = this.getContent();
    this.state = {
      labels: labels,
      validated: false,
      submitted: false,
      alertDetails: {}
    };
  }

  componentDidMount() {
    this.getVehicleDetailsToEdit();
  }

  getContent() {
    return ContentService.getFormLabels();
  }

  getVehicleDetailsToEdit() {
    VehicleService.getEditionById(this.props.match.params.modelEditionId)
      .then(response => {
        this.setState({
          data: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        this.setAlertDetail("danger", e.response.data.message);
      });;
  }

  onChangeModelEditionBasePrice(event) {
    this.setState(prevState => {
      const { value } = event.target;
      const newState = {
        data: {...prevState.data, basePrice: value}
      };
      console.log(newState);
      return newState;
    });
  }

  onChangeModelEditionDescription(event) {
    this.setState(prevState => {
      const { value } = event.target;
      const newState = {
        data: {...prevState.data, description: value}
      };
      console.log(newState);
      return newState;
    });
  }

  saveVehicleDetails() {
    VehicleService.editVehicle(this.props.match.params.modelEditionId, this.state.data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setSubmitted(true);
        }
      })
      .catch(e => {
        console.log(e.response);
        this.setValidated(false);
        this.setAlertDetail("danger", e.response.data.message);
      });
  }

  setAlertDetail(variant, message) {
    this.setState(prevState => {
      const newState = {
        alertDetails: {
          variant: variant,
          message: message
        }
      };
      console.log(newState);
      return newState;
    });
  }

  setSubmitted(submitted) {
    this.setState({
      submitted: submitted
    });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      this.saveVehicleDetails();
    }

    this.setValidated(true);
  }

  setValidated(validated) {
    this.setState({
      validated: validated
    });
  }

  render() {
    const { labels, data, validated, submitted, alertDetails } = this.state;

    return (
      <Fragment>
        {submitted && <Redirect to="/" push />}
        {alertDetails.message && <AlertBanner variant={alertDetails.variant} message={alertDetails.message}/>}
        {data && <div>
          <h1>Edit vehicle</h1>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <EditRow label={labels.makeLabel} value={data.make.name} />
            <EditRow label={labels.modelLabel} value={data.model.name} />
            <EditRow label={labels.modelEditionLabel} value={data.name} />
            <Form.Group as={Row} controlId="form-model-edition-base-price">
              <Col md="2" xs="5">
                <Form.Label className="h6">{labels.basePriceLabel}</Form.Label>
              </Col>
              <Col md="10" xs="12">
                <Form.Control required type="text"
                  name="modelEditionBasePrice" value={data.basePrice}
                  onChange={this.onChangeModelEditionBasePrice}
                  placeholder="Please enter base price for the model" />
              </Col>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row} controlId="form-model-edition-description">
              <Col md="2" xs="5">
                <Form.Label className="h6">{labels.descriptionLabel}</Form.Label>
              </Col>
              <Col md="10" xs="12">
                <Form.Control required as="textarea" rows={3}
                  name="modelEditionDescription" value={data.description}
                  onChange={this.onChangeModelEditionDescription}
                  placeholder="Please enter description for the model" />
              </Col>
            </Form.Group>
            {data.modelOptions.length > 0 && <p className="h4 mt-3 mb-3">{labels.optionsTitle}</p>}
            {data.modelOptions.map((option, idx) => {
              return (
                <OptionRow key={idx} label={option.name} value={currencyFormat(option.price)} />
              );
            })}
            <Row className="mt-3">
              <Col md="2" xs="3">
                <Button variant="dark" type="submit">{labels.saveButtonText}</Button>
              </Col>
              <Col md="2" xs="3">
                <Button variant="light" as="a" href="/">{labels.cancelButtonText}</Button>
              </Col>
            </Row>
          </Form>
        </div>}
      </Fragment>
    );
  }
}

function EditRow(props) {
  return (
    <Fragment>
      <Row>
        <Col md="2" xs="5" className="h5">{props.label}</Col>
        <Col md="10" xs="7">{props.value}</Col>
      </Row>
    </Fragment>
  )
}

function OptionRow(props) {
  return (
    <Fragment>
      <Row>
        <Col md="3" xs="5" className="h6">{props.label}</Col>
        <Col md="9" xs="7">{props.value}</Col>
      </Row>
    </Fragment>
  )
}

export default EditVehicle;