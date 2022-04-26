import { LightningElement, api, track, wire } from 'lwc';
import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

export default class HotelListDisplay extends NavigationMixin(LightningElement) {
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

  handleHotelDetail(event) {
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",

      attributes: {
        url: `/hoteldetailpage/?hoId=${event.target.dataset.id}`
      }
    });
    console.log(event.target.dataset.id);
    console.log("c quoi ça ");
  }
 
}
