import { LightningElement, api, track, wire } from 'lwc';
import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";
import HOTEL_OBJECT from '@salesforce/schema/Hotel__c';
import NAME_FIELD from '@salesforce/schema/Hotel__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Hotel__c.Hotel_Picture_Url__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Hotel__c.Description__c';
import CITY_FIELD from '@salesforce/schema/Hotel__c.City__c';
export default class HotelListDisplay extends NavigationMixin(LightningElement) {
  @track error;
  @track hotels = "";
  static = false;
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
        console.log("oui");
        console.log(result);
        if(result.length > 1){
          console.log("truuueee");
          console.log("temchi");
        }
        else{
          console.log("faaaaalse");
          this.static=true;
        }
      })

      .catch((error) => {
        this.error = error;
        console.log("non");
        console.log(error);
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