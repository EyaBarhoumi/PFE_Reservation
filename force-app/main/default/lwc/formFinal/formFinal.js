import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from "lightning/navigation";


var dataa = {
    begin: "bla bla bla ",
    end: "bla bla bla ",
    capacity: "2",
    HotelName: "bla bli"
  };


export default class FormFinal extends LightningElement {

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
        console.log(this.daTaa);
        console.log("🚀")
      }
    }













}