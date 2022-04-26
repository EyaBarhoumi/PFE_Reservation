import { LightningElement, track, wire } from "lwc";

import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class CreateLeadForm extends LightningElement {
  @track recId;

  handleUpload(event) {
    this.showButtons = true;

    this.recId = event.detail.id;

    this.showToast("Information", "info", "You can upload your CIN picture  now!!!");
  }

  showToast(title, variant, message) {
    const event = new ShowToastEvent({
      title: title,

      message: message,

      variant: variant
    });

    this.dispatchEvent(event);
  }

  get acceptedFormats() {
    return [
      ".pdf",
      ".png",
      ".jpg",
      ".jpeg",
      ".txt",
      ".docx",
      ".attachment",
      ".js",
      ".cls",
      ".apxt",
      ".html",
      ".zip"
    ];
  }

  handleUploadFinished(event) {
    let strFileNames = "";

    const uploadedFiles = event.detail.files;

    for (let i = 0; i < uploadedFiles.length; i++) {
      strFileNames += uploadedFiles[i].name + ", ";
    }

    this.showToast(
      "Success!!",
      "success",
      strFileNames + " File uploaded Successfully!!!"
    );
  }

  handleFinish() {
    this.handleReset();

    this.recId = undefined;

    this.showButtons = false;
  }

  handleReset() {
    const inputFields = this.template.querySelectorAll("lightning-input-field");

    if (inputFields) {
      inputFields.forEach((field) => {
        field.reset();
      });
    }
  }
//   goToStepTwo() {
//     this.currentStep = '2';

//     this.template.querySelector('div.stepOne').classList.add('slds-hide');
//     this.template
//         .querySelector('div.stepTwo')
//         .classList.remove('slds-hide');
// }


}
