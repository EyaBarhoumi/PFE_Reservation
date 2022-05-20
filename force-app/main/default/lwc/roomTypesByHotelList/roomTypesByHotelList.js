import { LightningElement, wire, track } from "lwc";
import getRoomsTypesByHotelID from "@salesforce/apex/RoomTypesController.getRoomsTypesByHotelID";
import { CurrentPageReference } from "lightning/navigation";
export default class RoomTypesByHotelList extends LightningElement {
    @track HotelId = "";

    @wire(CurrentPageReference)
    pageReference({ state }) {
      if (state && state.hoId) {
        this.HotelId = state.hoId;
      }
    }



    Rooms;
  @wire(getRoomsTypesByHotelID, { HotelId: "$HotelId" }) RoomTById({ data, error }) {
    if (data) {
      this.Rooms = data;
      console.log(data);
      console.log("data");
    } else if (error) {
      console.log(error);
      console.log("error");
      console.log(Rooms);
    }
  }

}