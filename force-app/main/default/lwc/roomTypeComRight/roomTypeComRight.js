import { LightningElement, wire, track } from 'lwc';

export default class RoomTypeComRight extends LightningElement {
    @track modal=false ; 

    openmodal(){
        this.modal=true;
    }

}