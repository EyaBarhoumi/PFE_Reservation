import { LightningElement } from "lwc";

import { loadScript } from "lightning/platformResourceLoader";
import JSPDF from "@salesforce/resourceUrl/JSFile";
import img from "@salesforce/resourceUrl/LogoDR";
import getReservations from "@salesforce/apex/ReservationController.getReservations";

export default class ReservationPDF extends LightningElement {
  reservationList = [];
  headers = this.createHeaders([
    "Reservation_Number__c",
    "Reservation_Begin__c",
    "Reservation_End__c",
    "Status__c"
  ]);

  renderedCallback() {
    Promise.all([loadScript(this, JSPDF)]);
  }

  generatePdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // {
    // encryption: {
    // 	userPassword: "user",
    // 	ownerPassword: "owner",
    // 	userPermissions: ["print", "modify", "copy", "annot-forms"]
    // try changing the user permissions granted
    // 	}
    // }
	doc.textWithLink("Click me!", 10, 10, {
		url: "https://moons-developer-edition.um8.force.com/DreamReservation/s/"
	  });
    doc.text("Here's the full list of reservation", 20, 20);
    
    doc.table(10, 30, this.reservationList, this.headers, { autosize: true });
    doc.save("ReservationsList.pdf");
  }

  generateData() {
    getReservations().then((result) => {
      this.reservationList = result;
      this.generatePdf();
    });
  }

  createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
}
