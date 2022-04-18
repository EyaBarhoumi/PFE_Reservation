import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import { LightningElement, wire, api, track } from "lwc";

export default class HotelDataTable extends LightningElement {
  @wire(getAllHotels) hotels;
  hotels;
  error;
  @track hotels;
  columns = columns;

  connectedCallback() {
    this.loadHotels();
  }
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
