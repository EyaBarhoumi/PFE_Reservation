import { LightningElement, track, wire } from "lwc";
import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
export default class RoomDisplayList extends LightningElement {
  hotels;
  error;
  @track hotels;

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
}
