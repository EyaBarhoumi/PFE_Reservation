import { LightningElement, track, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from 'lightning/navigation';
export default class CreateLeadRec extends NavigationMixin(LightningElement) {
  @track recId;


  handleSuccess(event) {
    this.recId = event.detail.id;
  }
  showToast(title, variant, message) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    })
    this.dispatchEvent(event);
  }

  gotoThankyoupage(event) {
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",

      attributes: {
        url: `/thankyoupage`
      }
    });
   
    console.log("c quoi ça ");
  }

//   gotoThankyoupage(event) {
//     // Navigate to a specific CustomTab.
//     this[NavigationMixin.Navigate]({
//         type: 'standard__navItemPage',
//         attributes: {
//             // CustomTabs from managed packages are identified by their
//             // namespace prefix followed by two underscores followed by the
//             // developer name. E.g. 'namespace__TabName'
//             apiName: 'ThankYouPage'
//         }
//     });
}