import { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { PlusCircle, X } from 'react-bootstrap-icons';
import ContentService from '../../services/content.service';
import VehicleService from '../../services/vehicle.service';
import AlertBanner from '../alert/alert-banner.component';

class AddVehicle extends Component {

  constructor(props) {
    super(props);

    this.setContent = this.getContent.bind(this);
    this.setDefaultData = this.getDefaultData.bind(this);
    this.saveVehicleDetails = this.saveVehicleDetails.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.onChangeMakeName = this.onChangeMakeName.bind(this);
    this.onChangeModelName = this.onChangeModelName.bind(this);
    this.onChangeModelEditionName = this.onChangeModelEditionName.bind(this);
    this.onChangeModelEditionBasePrice = this.onChangeModelEditionBasePrice.bind(this);
    this.onChangeModelEditionDescription = this.onChangeModelEditionDescription.bind(this);
    this.onChangeModelOption = this.onChangeModelOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValidated = this.setValidated.bind(this);

    const data = this.getDefaultData();
    const labels = this.getContent();
    this.state = {
      labels: labels,
      data: data,
      validated: false,
      alertDetails: {}
    };
    
  }

  getContent() {
    return ContentService.getFormLabels();
  }

  getDefaultData() {
    return {
      make: { name: "" },
      model: { name: "" },
      name: "",
      basePrice: "",
      description: "",
      modelOptions: [
        // {name: "", price: ""}
      ]
    };
    
  }

  saveVehicleDetails() {
    VehicleService.addVehicle(this.state.data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          const defaultData = this.getDefaultData();
          this.setState(prevState => {
            const newState = {
              data: {
                ...prevState.data, ...defaultData
              },
              validated: false,
              alertDetails: {
                variant: "success",
                message: response.data
              }
            };
            console.log(newState);
            return newState;
          });
        }
      })
      .catch(e => {
        console.log(e.response);
        this.setState(prevState => {
          const newState = {
            validated: false,
            alertDetails: {
              variant: "danger",
              message: e.response.data.message
            }
          };
          console.log(newState);
          return newState;
        });
      });
  }

  onChangeMakeName(event) {
    this.setState(prevState => {
      const { value } = event.target;
      const newState = {
        data: {...prevState.data, make: { name: value }}
      };
      console.log(newState);
      return newState;
    });
  }

  onChangeModelName(event) {
    this.setState(prevState => {
      const { value } = event.target;
      const newState = {
        data: {...prevState.data, model: { name: value}}
      };
      console.log(newState);
      return newState;
    });
  }

  onChangeModelEditionName(event) {
    this.setState(prevState => {
      const { value } = event.target;
      const newState = {
        data: {...prevState.data, name: value}
      };
      console.log(newState);
      return newState;
    });
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

  addOption(event) {
    this.setState(prevState => ({
      data: {...prevState.data, modelOptions: [...prevState.data.modelOptions, { name: "", price: "" }]}
    }));
  }

  deleteOption(event) {
    this.setState(prevState => {
      const id = event.target.dataset.id;
      const modelOptions = [...prevState.data.modelOptions];
      modelOptions.splice(id, 1);
      const newState = {
        data: {...prevState.data, modelOptions: modelOptions}
      };
      console.log(newState);
      return newState;
    });
  }

  onChangeModelOption(event) {
    this.setState(prevState => {
      const id = event.target.dataset.id;
      console.log(id);
      const { value } = event.target;
      const modelOptions = [...prevState.data.modelOptions];
      modelOptions[id][event.target.dataset.key] = value;
      const newState = {
        data: {...prevState.data, modelOptions: modelOptions}
      };
      console.log(newState);
      return newState;
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
    const { labels, data, validated, alertDetails } = this.state;
    console.log(this.state);

    return (
      <div>
        { alertDetails.message && !validated && <AlertBanner variant={alertDetails.variant} message={alertDetails.message}/> }
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="form-make-name">
            <Form.Label column="lg" md="2" xs="5">{labels.makeLabel}</Form.Label>
            <Col md="10" xs="12">
              <Form.Control required type="text"
                name="make.name" value={data.make.name} 
                onChange={this.onChangeMakeName}
                placeholder="Please enter make of the car"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="form-model-name">
            <Form.Label column="lg" md="2" xs="5">{labels.modelLabel}</Form.Label>
            <Col md="10" xs="12">
              <Form.Control required type="text"
                name="modelName" value={data.model.name} 
                onChange={this.onChangeModelName}
                placeholder="Please enter model of the car"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="form-model-edition-name">
            <Form.Label column="lg" md="2" xs="5">{labels.modelEditionLabel}</Form.Label>
            <Col md="10" xs="12">
              <Form.Control required type="text"
                name="modelEditionName" value={data.name} 
                onChange={this.onChangeModelEditionName}
                placeholder="Please enter model edition of the car"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="form-model-edition-base-price">
            <Form.Label column="lg" md="2" xs="5">{labels.basePriceLabel}</Form.Label>
            <Col md="10" xs="12">
              <Form.Control required type="text"
                name="modelEditionBasePrice" value={data.basePrice} 
                onChange={this.onChangeModelEditionBasePrice}
                placeholder="Please enter base price for the model"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="form-model-edition-description">
            <Form.Label column="lg" md="2" xs="5">{labels.descriptionLabel}</Form.Label>
            <Col md="10" xs="12">
              <Form.Control required as="textarea" rows={3}
                name="modelEditionDescription" value={data.description}
                onChange={this.onChangeModelEditionDescription}
                placeholder="Please enter description for the model"/>
            </Col>
          </Form.Group>
          <Row style={{alignItems: "center"}}>
            <Form.Label column="lg"  md="2" xs="3" id="form-model-option-title">{labels.optionsTitle}</Form.Label>
            <Col md="10" xs="5"><PlusCircle size={25} onClick={this.addOption}/></Col>
          </Row>
          {data.modelOptions.map((option, idx) => {
            return (
              <Form.Row className="mt-3" key={idx}>
                <Col md="1" xs="1">
                  <X size={25} data-id={idx} onClick={this.deleteOption}/>
                </Col>
                <Col md="6" xs="5">
                  <Form.Control id={`form-model-option-name-${idx}`} required type="text"
                    data-id={idx} data-key="name" name={`optionName-${idx}`} value={option.name}
                    onChange={this.onChangeModelOption}
                    placeholder={labels.optionLabel} />
                </Col>
                <Col md="5" xs="6">
                  <Form.Control id={`form-model-option-price-${idx}`} required type="text"
                    data-id={idx} data-key="price" name={`optionPrice-${idx}`} value={option.price}
                    onChange={this.onChangeModelOption}
                    placeholder={labels.optionPrice} />
                </Col>
              </Form.Row>
              );
            })}
          <Button className="mt-3" variant="dark" type="submit">{labels.saveButtonText}</Button>
        </Form>
      </div>
    );
  }

}

export default AddVehicle;