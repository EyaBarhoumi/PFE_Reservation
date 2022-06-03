import { LightningElement, wire, track } from 'lwc';
import getHotelByID from "@salesforce/apex/HotelController.getHotelByID";
import getRoomsByHotel from "@salesforce/apex/HotelController.getAvailableRoomsByHotel";
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';


var dataa = {
    begin: "bla bla bla ",
    end: "bla bla bla ",
    capacity: "2",
    Hotel: "bla bli"
  };



export default class ReservationOptionsPage extends NavigationMixin(LightningElement) {


HotelId ='';
capacity='';
Edate='';
Sdate='';

daTaa = {
    'capacity':'2'
  };

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.HotelId) {
            //this.HotelId = state.HotelId;
            console.log(state.HotelId);
            console.log("HEHI HEHI ID LAHNE HEEEEHI");
            var splitted = state.HotelId.split('/');
            console.log(splitted[0]);
            this.daTaa.HotelId = splitted[0];
            console.log(splitted[1]);
            this.daTaa.capacity = splitted[1];
            console.log(splitted[2]);
            this.daTaa.begin = splitted[2];
            console.log(splitted[3]);
            this.daTaa.end = splitted[3];
            console.log(this.daTaa);
            console.log("🚀")
        }
    }



    
    Hotello
    @wire(getRoomsByHotel, { ResDetails: '$daTaa' }) WiredData({ data, error }) {
        if (data) {
            this.Hotello = data;
            console.log("🚀🚀")
            console.log(data)
        } else if (error) {
            console.log(error);
            console.log("💀");
        }



    };





    
    Reserve(event)
    {
        console.log("click");
        console.log(event.target.dataset.id);
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
              url: `/reservationoptionspage/?HotelId=${event.target.dataset.id}`
          }
      },
      true
      );
    }












}