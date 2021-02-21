import { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import AddVehicle from './vehicle/add-vehicle.component';
import EditVehicle from './vehicle/edit-vehicle.component';
import ListVehicle from './vehicle/list-vehicle.component';

function NoMatchPage() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}

class RouterSection extends Component {
  render() {
    return (
      <Fragment>
        <main>
          <Container className="mt-3">
            <Switch>
              <Route exact path="/" component={ListVehicle}></Route>
              <Route exact path="/add" component={AddVehicle}></Route>
              <Route exact path="/edit/:modelEditionId" component={EditVehicle}></Route>
              <Route component={NoMatchPage} />
            </Switch>
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default RouterSection;