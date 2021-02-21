import http from '../http-common';

class VehicleService {

  getAllMake() {
    return http.get("/make");
  }

  getModelForMake(makeId) {
    return http.get(`/make/${makeId}/model`);
  }

  getAllEdition() {
    return http.get("/edition");
  }

  getEditionById(modelEditionId) {
    return http.get(`/edition/${modelEditionId}`)
  }

  addVehicle(data) {
    return http.post("/edition", data);
  }

  editVehicle(modelEditionId, data) {
    return http.put(`/edition/${modelEditionId}`, data);
  }
}

export default new VehicleService();