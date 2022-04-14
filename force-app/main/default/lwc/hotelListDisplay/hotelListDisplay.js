import { LightningElement, track, wire } from "lwc";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import searchHotels from "@salesforce/apex/HotelController.searchHotels";
export default class HotelListDisplay extends NavigationMixin(
  LightningElement
) {
  @track searchTerm = "";
  @track hotels;
  @wire(CurrentPageReference) pageRef;
  @wire(searchHotels, { searchTerm: "$searchTerm" })
  hotels;
  error;

  connectedCallback() {
    this.loadHotels();
  }
  loadHotels(result) {
    this.hotels = result;
    if (result.data) {
      fireEvent(this.pageRef, "hotelListUpdate", result.data);
    }
  }

  handleSearchTermChange(event) {
    // Debouncing this method: do not update the reactive property as
    // long as this function is being called within a delay of 300 ms.
    // This is to avoid a very large number of Apex method calls.
    window.clearTimeout(this.delayTimeout);
    const searchTerm = event.target.value;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.searchTerm = searchTerm;
    }, 300);
  }
  get hasResults() {
    return this.hotels.data.length > 0;
  }
  handleHotelView(event) {
    // Navigate to hotel record page
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: event.target.hotel.Id,
        objectApiName: "hotel__c",
        actionName: "view"
      }
    });
  }
}
