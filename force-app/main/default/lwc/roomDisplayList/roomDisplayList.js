import { LightningElement, api, track, wire } from 'lwc';
import getAllRooms from "@salesforce/apex/RoomController.getAllRooms";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";
export default class RoomDisplayList extends NavigationMixin(LightningElement) {
  @track error;
  @track rooms = "";

  connectedCallback() {
    this.loadRooms();
  }
  //   loadHotels(result) {
  //     this.hotels = result;
  //     if (result.data) {
  //       fireEvent(this.pageRef, "hotelListUpdate", result.data);
  //     }
  //   }

  loadRooms() {
    getAllRooms()
      .then((result) => {
        this.rooms = result;
      })

      .catch((error) => {
        this.error = error;
      });
  }

  handleRoomDetail(event) {
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",

      attributes: {
        url: `/roomdetailpage/?blogId=${event.target.dataset.id}`
      }
    });
    console.log(event.target.dataset.id);
    console.log("c quoi ça ");
  }
}