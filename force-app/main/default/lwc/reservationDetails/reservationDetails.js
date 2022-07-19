import { LightningElement, wire, track, api } from "lwc";
import getReservationDetails from "@salesforce/apex/ReservationController.getReservationDetails";
import UsId from "@salesforce/user/Id";
import getContactId from "@salesforce/apex/ContactController.getContactId";
export default class ReservationDetails extends LightningElement {
  @track ContactId = "";
  userId = UsId;

  @wire(getContactId, { userId: "$userId" }) loggedinid({ error, data }) {
    if (data) {
      this.ContactId = data;
      console.log("1");

      console.log(data);
    } else if (error) {
      this.error = error;

      console.log("erreur1");

      console.log(JSON.stringify(error));
    }
  }

  @wire(getReservationDetails, { ContactId: "$ContactId" })
  All;

  renderedCallback() {
    console.log(this.All.data);
  }
}