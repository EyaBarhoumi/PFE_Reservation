import { LightningElement, wire, track } from "lwc";
import getHotelByID from "@salesforce/apex/HotelController.getHotelByID";
import getRoomsByHotel from "@salesforce/apex/HotelController.getAvailableRoomsByHotel";
import CheckRes from "@salesforce/apex/HotelController.ReserveRequest";
import { CurrentPageReference } from "lightning/navigation";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

var dataa = {
  begin: "bla bla bla ",
  end: "bla bla bla ",
  capacity: "2",
  Hotel: "bla bli"
};

export default class ReservationOptionsPage extends NavigationMixin(
  LightningElement
) {
  HotelId = "";
  HotelName = "";
  capacity = "";
  Edate = "";
  Sdate = "";
  NumberOfRooms = "";
  roomTypeId = "";
  daTaa = {
    capacity: "2"
  };

  @wire(CurrentPageReference)
  pageReference({ state }) {
    if (state && state.HotelId) {
      //this.HotelId = state.HotelId;
      console.log(state.HotelId);
      console.log("HEHI HEHI ID LAHNE HEEEEHI");
      var splitted = state.HotelId.split("/");
      console.log(splitted[0]);
      this.daTaa.HotelId = splitted[0];
      console.log(splitted[1]);
      this.daTaa.capacity = splitted[1];
      console.log(splitted[2]);
      this.daTaa.begin = splitted[2];
      console.log(splitted[3]);
      this.daTaa.end = splitted[3];
      console.log(this.daTaa);
      console.log("🚀");
    }
  }

  Hotello;
  @wire(getRoomsByHotel, { ResDetails: "$daTaa" }) WiredData({ data, error }) {
    if (data) {
      this.Hotello = data;
      this.HotelName = data[0].Room_Type__r.Hotel__r.Name;
      console.log("🚀🚀");
      console.log(data);
    } else if (error) {
      console.log(error);
      console.log("💀💀");
    }
  }

  handleRooms(event) {
    this.NumberOfRooms = event.target.value;
  }

  Reserve(event) {
    console.log("clickewi");
    this.roomTypeId = event.target.dataset.idd;
    console.log(this.roomTypeId);

    CheckRes({ RoomType: this.roomTypeId })
      .then((result) => {
        console.log("🚀🚀");
        console.log(result.length);
        console.log("deyta", this.daTaa);
        console.log("number of rooms" + this.NumberOfRooms);

        if (result.length >= this.NumberOfRooms) {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Done",

              message: "stand by",

              variant: "success"
            })
          );
          this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: `/formwithsteps/?Data=${this.daTaa.capacity}/${this.daTaa.end}/${this.daTaa.begin}/${this.roomTypeId}/${this.NumberOfRooms}/${this.HotelName}/${this.daTaa.HotelId}`
              }
            },
            true
          );
        } else {
          console.log("allah ghaleb");
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Not enough available rooms",

              message: result.length,

              variant: "error"
            })
          );
        }
      })
      .catch((error) => {
        console.log("💀");
        console.log("💀");
        console.log(error);
      });
  }
}
