import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

// Set Hotel object fields
const NAME_FIELD = "Hotel__c.Name";
const LOCATION_LATITUDE_FIELD = "Hotel__c.Hotel_Location__Latitude__s";
const LOCATION_LONGITUDE_FIELD = "Hotel__c.Hotel_Location__Longitude__s";
const hotelFields = [
  NAME_FIELD,
  LOCATION_LATITUDE_FIELD,
  LOCATION_LONGITUDE_FIELD
];

export default class HotelLocation extends LightningElement {
  @api recordId;
  name;
  mapMarkers = [];
  @wire(getRecord, { recordId: "$recordId", fields: hotelFields })
  loadHotel({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      // Get Hotel data
      this.name = getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform Hotel data into map markers
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
