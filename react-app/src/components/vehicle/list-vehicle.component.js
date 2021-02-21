import { Component, Fragment } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import VehicleService from '../../services/vehicle.service';
import { currencyFormat } from '../../util/StringFormatter';

class ListVehicle extends Component {

  constructor(props) {
    super(props);

    this.retrieveVehicles = this.getVehicleList.bind(this);

    this.state = {
      pageTitle: "Vehicle list",
      optionsTitle: "Options",
      editLabel: "Edit",
      vehicles: []
    };
  }

  componentDidMount() {
    this.getVehicleList();
  }

  getVehicleList() {
    VehicleService.getAllEdition()
      .then(response => {
        this.setState({
          vehicles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { pageTitle, optionsTitle, editLabel, vehicles } = this.state;
    console.log(this.state);

    return (
      <div>
        <h1>{pageTitle}</h1>
        {vehicles && vehicles.map(vehicle => (
            <Card className="mt-3" key={vehicle.id}>
              <Row>
                <Col md="9" xs="12">
                  <Card.Body>
                    <Card.Title>
                      {vehicle.make.name} {vehicle.model.name} {vehicle.name} 
                      <Badge as="a" variant="secondary" href={`#/edit/${vehicle.id}`} className="ml-2">
                        {editLabel}<PencilSquare className="ml-1"/>
                      </Badge>
                    </Card.Title>
                    <Card.Text>{vehicle.description}</Card.Text>
                    <RenderOptions 
                      optionsTitle={optionsTitle} 
                      options={vehicle.modelOptions}></RenderOptions>
                  </Card.Body>
                </Col>
                <Col md="3" xs="6">
                  <Card.Body>
                    <Card.Text>
                      Base price:
                      <span className="font-weight-bolder">
                        {currencyFormat(vehicle.basePrice)}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
      </div>
    );
  }
}

function RenderOptions(props) {
  const options = props.options;
  if (options.length > 0) {

    function createOptionLabel(option) {
      const priceFormatted = currencyFormat(option.price);
      return `${option.name} (${priceFormatted})`;
    }

    return (
      <Fragment>
        <Card.Title>{props.optionsTitle}</Card.Title>
        <ul className="list-inline">
        {options.map(option => (
          <li className="list-inline-item " id={`inline-${option.name}`} key={`inline-${option.id}`}>
            {createOptionLabel(option)}
          </li>
        ))}
        </ul>
      </Fragment>
    );
  }

  return null;
}

export default ListVehicle;
