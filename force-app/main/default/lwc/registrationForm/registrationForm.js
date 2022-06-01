import { LightningElement, wire, api, track } from "lwc";
import getRooms from "@salesforce/apex/ReservationController.getAvailableRooms";
import getCities from "@salesforce/apex/HotelController.getCities ";

var dataa = {
    begin: "bla bla bla ",
    end: "bla bla bla ",
    capacity: "2"
  };

export default class RegistrationForm extends LightningElement {
    rooms = "" ;
    @track errorMsg;
    @track miaw=false;


    @wire(getCities) City;
  
    @track startDt;
    @track endDt;
    @track capacity;
    @track city="pz";
  
    daTaa = {
        'capacity':'2'
      };
  
      handleSDate(event){
  
        this.startDt = event.target.value;
      }
  
      handleEDate(event){
        this.endDt = event.target.value;
  
  
      }
      handleGetCapacity(event){
        this.capacity = event.target.value;
      }
      handleGetCity(event){
        this.city = event.target.value;
      }
  
  
  
      
    CheckRes(event){
        this.daTaa.begin=this.startDt;
        this.daTaa.end=this.endDt;
        this.daTaa.capacity=this.capacity;
        this.daTaa.city=this.city;
        getRooms({ResDetails:this.daTaa})
        .then(result =>{
          this.miaw =true;
            this.rooms = result;
            console.log(this.daTaa);
            console.log("🚀 result");
            console.log(result);
            console.log(this.rooms);
        })
        .catch(error =>{
            this.errorMsg = error;
            console.log(dataa);
            console.log(this.startDt);
            console.log(this.endDt);
            console.log( JSON.stringify('error ' + error));
            console.log("🚀 error");
            console.log(errorMsg);
  
        })
    
  
  }
  



}