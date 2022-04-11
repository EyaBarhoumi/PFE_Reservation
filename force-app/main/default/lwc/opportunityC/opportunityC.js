import { LightningElement, wire, track } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import getAccountName from "@salesforce/apex/createobjects.getAccountName";
import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";
import Id from "@salesforce/user/Id";
import NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import STAGE_FIELD from "@salesforce/schema/Opportunity.StageName";
import CLOSEDATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
export default class opportunityC extends LightningElement {
  userId = "";
  userId = Id;

  @track AccountName = "";
  //accountID = '0018d0000078sCGAAY';
  oppName = "OPPORTUNITY first normalement mchet ";

  @wire(getAccountName, { ContactId: "$userId" }) wireHandler({ data, error }) {
    if (data) {
      console.log("data");
      console.log(data);
      console.log(this.userId);
      this.AccountName = data;
      console.log("this.AccountName");
      console.log(this.AccountName);
    } else if (error) {
      console.log("erreur");
      console.log(this.userId);
      console.log(error);
    }
  }
  oppDate = new Date(2022, 6, 7);
  //oppExternalId = "88d48q4dq8d4q8d4q8zd4qzq48zd4";
  //oppExternalId=Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*Math.random();
  oppStage = "Qualification";

  CreateOpp() {
    const fields = {};

    fields[NAME_FIELD.fieldApiName] = this.oppName;

    fields[ACCOUNT_FIELD.fieldApiName] = this.AccountName;

    fields[STAGE_FIELD.fieldApiName] = this.oppStage;

    fields[CLOSEDATE_FIELD.fieldApiName] = this.oppDate;

    // fields[EXTERNALID_FIELD.fieldApiName] = this.oppExternalId;

    const objRecordInput = {
      apiName: OPPORTUNITY_OBJECT.objectApiName,
      fields
    };
    console.log("loula");
    console.log(this.AccountName);
    createRecord(objRecordInput)
      .then((Opportunity) => {
        console.log("mchet");
        alert("Opportunity created with Id: " + Opportunity.id);
      })
      .catch((error) => {
        console.log("mamchetech");
        alert("Error: " + JSON.stringify(error));
        console.log(JSON.stringify(error));
      });
  }
}
