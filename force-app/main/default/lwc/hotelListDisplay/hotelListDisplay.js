import { LightningElement, track, wire, api } from "lwc";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import searchHotels from "@salesforce/apex/HotelController.searchHotels";

export default class HotelListDisplay extends NavigationMixin(LightningElement) {
  @api pageTitle;
  @track searchTerm = "";
  @track hotels;
  @wire(CurrentPageReference) pageRef;
  @wire(searchHotels, { searchTerm: "$searchTerm" })
  hotels;
  error;

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

  handleRoomDetail(event) {
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",

      attributes: {
        url: `/RoomDetailPage` }
    });
    console.log(event.target.dataset.id);
    console.log("c quoi ça ");
  }

 
}
