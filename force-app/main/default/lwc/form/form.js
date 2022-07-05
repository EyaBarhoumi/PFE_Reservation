import { LightningElement, wire, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference } from "lightning/navigation";
import createLead from "@salesforce/apex/LeadController.createLead";





var dataa = {
  begin: "bla bla bla ",
  end: "bla bla bla ",
  capacity: "2",
  HotelName: "bla bli"
};


export default class Form extends LightningElement {
  @api recordLead;
  @api leadObject = {};

  daTaa = {
    capacity: "2"
  };



  @wire(CurrentPageReference)
  pageReference({ state }) {
    if (state && state.Data) {
      //this.HotelId = state.HotelId;
      console.log(state.Data);
      console.log("HEHI HEHI ID LAHNE HEEEEHI");
      var splitted = state.Data.split("/");
      console.log(splitted[0]);
      this.daTaa.Capacity = splitted[0];
      console.log(splitted[1]);
      this.daTaa.end = splitted[1];
      console.log(splitted[2]);
      this.daTaa.begin = splitted[2];
      console.log(splitted[3]);
      this.daTaa.roomTypeId = splitted[3];
      console.log(splitted[4]);
      this.daTaa.NumberOfRooms = splitted[4];
      console.log(splitted[5]);
      this.daTaa.HotelName = splitted[5];
      console.log(splitted[6]);
      console.log("machili aka l hotel "+splitted[6]);
      this.daTaa.HotelId = splitted[6];
      console.log(this.daTaa);
      console.log("🚀")
    }
  }

  submitDetails() {
    this.leadObject.NumberOfGuests=this.daTaa.Capacity;
    this.leadObject.NumberOfRooms=this.daTaa.NumberOfRooms;
    this.leadObject.StartDate=this.daTaa.begin;
    this.leadObject.EndDate=this.daTaa.end;
    this.leadObject.RoomType=this.daTaa.roomTypeId;
    this.leadObject.Hotel=this.daTaa.HotelId;
    console.log("le lead :" + JSON.stringify(this.leadObject));
    createLead({ leadRecObj: this.leadObject })
      .then((result) => {
        this.recordLead = result.Id;
        console.log("success" + this.recordLead);

        this.leadObject = {};
      })
      .catch((error) => {
        this.error = error.message;
        console.log("errooorrr", error);
        this.errorAdd = true;
      });
  }

  //lead fields
  handleFirstNameChange(event) {
    this.leadObject.FirstName = event.target.value;
  }
  handleLastNameChange(event) {
    this.leadObject.LastName = event.target.value;
  }
  handleUserNameChange(event) {
    this.leadObject.UserName = event.target.value;
  }
  handlePhoneChange(event) {
    this.leadObject.Phone = event.target.value;
  }
  handleEmailChange(event) {
    console.log(event.target.value);
    this.leadObject.Email = event.target.value;
  }
  handleCinChange(event) {
    this.leadObject.Cin = event.target.value;
  }
  handleAgeChange(event) {
    this.leadObject.Age = event.target.value;
  }


// Reservation fields of lead



}
