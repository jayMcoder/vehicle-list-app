class ContentService {

  getFormLabels() {
    return {
      makeLabel: "Make",
      modelLabel: "Model",
      modelEditionLabel: "Model Edition",
      basePriceLabel: "Base price",
      descriptionLabel: "Description",
      optionsTitle: "Options",
      optionLabel: "Option name",
      optionPrice: "Option price",
      submitButtonText: "Submit",
      saveButtonText: "Save",
      cancelButtonText: "Cancel"
    };
  }
}

export default new ContentService();