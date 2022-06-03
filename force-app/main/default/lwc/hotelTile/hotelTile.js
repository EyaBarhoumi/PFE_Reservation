import { LightningElement, api } from "lwc";

export default class HotelTile extends LightningElement {
  @api hotel;
  handleOpenRecordClick() {
    const selectEvent = new CustomEvent("hotelview", {
      bubbles: true
    });
    this.dispatchEvent(selectEvent);
  }
}