import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import getRoomByID from "@salesforce/apex/RoomController.getRoomByID";

export default class RoomDetailDisplay extends LightningElement {
  @track RoomId = "";

  @wire(CurrentPageReference)
  pageReference({ state }) {
    if (state && state.blogId) {
      this.RoomId = state.blogId;
    }
  }

  Rooms;
  @wire(getRoomByID, { RoomId: "$RoomId" }) roomById({ data, error }) {
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