import { LightningElement, api, track, wire } from 'lwc';

import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

export default class ThankYouPage extends NavigationMixin(LightningElement) {



    handleHomePage(event) {
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
    
          attributes: {
            pageName: 'Home'
          }
        });
       
        console.log("c quoi ça ");
      }
    
}