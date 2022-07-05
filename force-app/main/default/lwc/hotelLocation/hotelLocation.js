import { LightningElement, api, wire, track } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { CurrentPageReference } from "lightning/navigation";
import getHotelByID from "@salesforce/apex/HotelController.getHotelByID";

//Set Hotel object fields

const NAME_FIELD = "Hotel__c.Name";
const LOCATION_LATITUDE_FIELD = "Hotel__c.Hotel_Location__Latitude__s";
const LOCATION_LONGITUDE_FIELD = "Hotel__c.Hotel_Location__Longitude__s";
const hotelFields = [
  NAME_FIELD,
  LOCATION_LATITUDE_FIELD,
  LOCATION_LONGITUDE_FIELD
];

// const hotelFields = [
//   "Hotel__c.Name",
//   "Hotel__c.Hotel_Location__Latitude__s",
//   "Hotel__c.Hotel_Location__Longitude__s"
// ];

export default class HotelLocation extends LightningElement {
  // @api recordId;
  name;
  mapMarkers = [];
  @track HotelId = "";

  @wire(CurrentPageReference)
  pageReference({ state }) {
    if (state && state.hoId) {
      this.HotelId = state.hoId;
    }
  }

  @wire(getRecord, { recordId: '$HotelId', fields: hotelFields })
  loadHotels({ error, data }) {
    if (error) {
      // TODO: handle error
      console.log(error);
      console.log("error ?");
      
    } else if (data) {
      console.log("working");
      // Get Hotel data

      // console.log(data);
      // this.name = data.fields.Name.value;
      // console.log(this.name);
      // const Latitude = data.fields.Hotel_Location__Latitude__s.value;
      // const Longitude = data.fields.Hotel_Location__Longitude__s.value;
      // console.log(Latitude);

      // Get Hotel data

      this.name = getFieldValue(data, NAME_FIELD);
      console.log(this.name);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform Hotel data into map markers
      console.log("params",Latitude,Longitude);
      this.mapMarkers = [
        {
          location: { Latitude, Longitude },
          title: this.name,
          description: `Coords: ${Latitude}, ${Longitude}`
        }
      ];
    }
  }
  get cardTitle() {
    return this.name ? `${this.name}'s location` : "Hotel location";
  }
}
