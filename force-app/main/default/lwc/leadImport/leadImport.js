import { LightningElement , api , track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import readCSVFileLead from '@salesforce/apex/LeadController.readCSVFileLead';


const COLUMNS = [
    { label: 'Name', fieldName: 'LastName', type: 'text' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'Email' },
    { label: 'Company', fieldName: 'Company', type: 'text' },
    { label: 'Lead source', fieldName: 'LeadSource', type: 'picklist' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Rating', fieldName: 'Rating', type: 'picklist' },
];


export default class LeadImport extends LightningElement {
    @track COLUMNS = COLUMNS;

    @track error;

    @track recordId ; 
@track data;
@api recordId;
loading;


//////////////////////////////// import 


    // accepted parameters
    get acceptedFormats() {
        return ['.csv'];
    }
    
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
  
        // calling apex class
        readCSVFileLead({idContentDocument : uploadedFiles[0].documentId})
        .then(result => {
            window.console.log('result ===> '+result);
            this.data = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts are created based CSV file',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );     
        })
  
    }

    get acceptedFormatssss() {
        return ['.xlsx'];
    }

   


}