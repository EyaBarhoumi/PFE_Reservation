import { LightningElement, api, track, wire } from 'lwc';
import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";
export default class RoomDisplayList extends NavigationMixin(LightningElement) {
  @track error;
  @track hotels = "";

  connectedCallback() {
    this.loadHotels();
  }
  //   loadHotels(result) {
  //     this.hotels = result;
  //     if (result.data) {
  //       fireEvent(this.pageRef, "hotelListUpdate", result.data);
  //     }
  //   }

  loadHotels() {
    getAllHotels()
      .then((result) => {
        this.hotels = result;
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
