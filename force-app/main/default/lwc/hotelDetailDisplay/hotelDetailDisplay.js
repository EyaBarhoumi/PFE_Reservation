import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import getHotelByID from "@salesforce/apex/HotelController.getHotelByID";

export default class HotelDetailDisplay extends LightningElement {
  @track HotelId = "";
 



  @wire(CurrentPageReference)
  pageReference({ state }) {
    if (state && state.blogId) {
      this.HotelId = state.blogId;
    }
  }

  Hotels;
  @wire(getHotelByID, { HotelId: "$HotelId" }) HotelById({ data, error }) {
    if (data) {
      this.Hotels = data;
      console.log(data);
      console.log("data");
    } else if (error) {
      console.log(error);
      console.log("error");
      console.log(Hotels);
    }
  }


 
 
}
