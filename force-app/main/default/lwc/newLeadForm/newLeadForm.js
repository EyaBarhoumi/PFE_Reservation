import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import leadFirstName from '@salesforce/schema/Lead.FirstName';
import leadLastName from '@salesforce/schema/Lead.LastName';
export default class ExploreFormWizard extends LightningElement {
    @api recordId;
    @track currentStep;
    
    @track Leadid;
    @track error;    
    @track getLeadRecord={
        FirstName:leadFirstName,       
        LastName:leadLastName,  
        
              
    };   
    LastNameInpChange(event){
        this.getLeadRecord.LastName = event.target.value;
        //window.console.log(this.getLeadRecord.Name);
      }
 
      FirstNameChange(event){
        this.getLeadRecord.FirstName = event.target.value;
        //window.console.log(this.getLeadRecord.Phone);
     }
     
       /*saveLeadAction(){
         window.console.log('before save' + this.createLead);
         insertLeadMethod({LeadObj:this.getLeadRecord})
         .then(result=>{
           window.console.log(this.createLead);
             this.getLeadRecord={};
             this.Leadid=result.Id;
             window.console.log('after save' + this.Leadid);
             
             const toastEvent = new ShowToastEvent({
               title:'Success!',
               message:'Lead created successfully',
               variant:'success'
             });
             this.dispatchEvent(toastEvent);
         })
         .catch(error=>{
            this.error=error.message;
            window.console.log(this.error);
         });
       }*/

    
    
    
       handleSuccess( event ) { 
         
        const toastEvent = new ShowToastEvent({ 
            title: 'Case Updated', 
            message: 'Case Updated Successfully!!!', 
            variant: 'success' 
        }); 
        this.dispatchEvent( toastEvent ); 
 
    }
   
    handleChange(event) {
        this.value = event.detail.value;
    }
    showText = false;
    text = '';
    showcons(event){
    this.text="Pour faire face aux dépenses imprévues, notre banque vous offre la possibilité un crédit remboursable sur une durée maximale de 3 ans selon votre capacité de remboursement."  ;
    console.log(event.target.value);
    }
    showvoiture(event){
            this.text="Nous vous offrons la possibilité de financer l'acquisition d'un véhicule neuf ou d'occasion à travers un crédit pouvant atteindre 80% du montant global TTC.";
    }

    showlog(event){
        this.text="Crédit aménagement :Notre banque vous propose une solution adaptée à vos besoins : un crédit pour financer les travaux d'aménagement de votre logement sur une durée qui peut atteindre 5 ans.";          
    }

    goBackToStepOne() {
        this.currentStep = '1';

        this.template.querySelector('div.stepTwo').classList.add('slds-hide');
        this.template
            .querySelector('div.stepOne')
            .classList.remove('slds-hide');
    }

    goToStepTwo() {
        this.currentStep = '2';

        this.template.querySelector('div.stepOne').classList.add('slds-hide');
        this.template
            .querySelector('div.stepTwo')
            .classList.remove('slds-hide');
    }
    goBackToStepTwo() {
        this.currentStep = '2';

        this.template.querySelector('div.stepThree').classList.add('slds-hide');
        this.template
            .querySelector('div.stepTwo')
            .classList.remove('slds-hide');
    }
    goToStepThree() {
        this.currentStep = '3';

        this.template.querySelector('div.stepTwo').classList.add('slds-hide');
        this.template
            .querySelector('div.stepThree')
            .classList.remove('slds-hide');
    }
    get options() {
        return [
            { label: 'Monsieur', value: 'Monsieur' },
            { label: 'Madame', value: 'Madame' },
            { label: 'Mademoiselle', value: 'Mademoiselle' },
        ];
    }
    get options1() {
        return [
            { label: 'CIN', value: 'CIN' },
            { label: 'Passport', value: 'Passport' },
        ];
    }
    get optionslog() {
        return [
            { label: 'Propriétaire', value: 'Propriétaire' },
            { label: 'locataire', value: 'locataire' },
        ];
    }
    get optionssit() {
        return [
            { label: 'Célibataire', value: 'Célibataire' },
            { label: 'Marié(e)', value: 'Marie' },
            { label: 'Divorcé(e)', value: 'Divorce' },
            { label: 'Veuf', value: 'Veuf' },
        ];
    }
    get optionsenfant() {
        return [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '+3', value: '+3' },
        ];
    }
    
    
}