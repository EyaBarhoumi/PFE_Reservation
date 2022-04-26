
import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import getRoomsByHotelID from "@salesforce/apex/RoomController.getRoomsByHotelID";


export default class AvailableRoomsByHotel extends LightningElement {
    @track HotelId = "";

      

      @wire(CurrentPageReference)
      pageReference({ state }) {
        if (state && state.hoId) {
          this.HotelId = state.hoId;
        }
      }

      Rooms;
      @wire(getRoomsByHotelID, { HotelId: "$HotelId" }) roomByhotelId({ data, error }) {
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