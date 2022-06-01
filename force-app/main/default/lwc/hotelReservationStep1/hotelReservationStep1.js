import { LightningElement ,track } from 'lwc';

export default class HotelReservationStep1 extends LightningElement {
    @track firststep=true;
    @track miaw=false;
    clickhere(){
        this.firststep = false;
        this.miaw =true;
    }
}