import { LightningElement,api,wire,track } from 'lwc';
import getHotelsNumber from "@salesforce/apex/HotelController.getHotelsNumber"
export default class HotelDashboardNumber extends LightningElement {

    @wire(getHotelsNumber)
    number;







}