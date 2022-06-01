import { LightningElement, wire, track, api } from "lwc";
import getAllHotels from "@salesforce/apex/HotelController.getAllHotels";
import getHotelsSearch from "@salesforce/apex/HotelController.getHotelsSearch";
import deleteHotel from "@salesforce/apex/HotelController.deleteHotel";
import deleteHotels from "@salesforce/apex/HotelController.deleteHotels";
import HOTEL_OBJECT from "@salesforce/schema/Hotel__c";
import HOTEL_LOCATION_FIELD from "@salesforce/schema/Hotel__c.Hotel_Location__c";
import HOTEL_CITY_FIELD from "@salesforce/schema/Hotel__c.City__c";
import HOTEL_PICTURE_FIELD from "@salesforce/schema/Hotel__c.Hotel_Picture_Url__c";
import PHONENUMBER_FIELD from "@salesforce/schema/Hotel__c.Phone_Number__c";
// import STREET_FIELD from "@salesforce/schema/Hotel__c.Street__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Hotel__c.Description__c";
import NAME_FIELD from "@salesforce/schema/Hotel__c.Name";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { deleteRecord } from "lightning/uiRecordApi";

const DELAY = 300;

//les noms des colonnes dans le datatable
const columns = [
  // { label: "Hotel Id", fieldName: "Id", type: "text" },
  { label: "Hotel Name", fieldName: "Name", type: "text" },
  { label: "City", fieldName: "City__c", type: "text " },
  { label: "Phone Number", fieldName: "Phone_Number__c", type: "text " },
  // { label: "Location", fieldName: "Hotel_Location__c", type: "Geolocation" },
  // {
  //   label: "Hotel Picture",
  //   fieldName: "Hotel_Picture_Url__c",
  //   type: "Text Area"
  // },
  // {label:'Departement', fieldName:'departement__c' , type:'Master-Detail(departement)'},
  // // { label: "Street", fieldName: "Street__c", type: "text " },
  // { label: "Description", fieldName: "Description__c", type: "Text Area" },
  {
    label: "See full details",
    type: "button",
    typeAttributes: {
      label: "View details",
      name: "view_details"
    }
  },
  {
    label: "Delete",
    type: "button",
    typeAttributes: {
      name: "delete",
      label: "Delete",

      title: "Delete",
      variant: "destructive",
      class: "scaled-down"
    }
  },

  {
    label: "Update ",
    type: "button",
    typeAttributes: {
      name: "update",
      label: "Update",
      title: "Update",
      variant: "success"
    }
  }
];

export default class HotelDataTable extends NavigationMixin(LightningElement) {
  rowOffset = 0;
  searchKey = "";
  @track data;
  @track allActivitiesData;
  @track columns = columns;
  @api objectApiName;

  @track error;

  @track page = 1;
  @track startingRecord = 1;
  @track endingRecord = 0;
  @track pageSize = 8;
  @track totalRecountCount = 0;
  @track totalPage = 0;

  @track items = [];
  @track wiredDataResult;

  loading;
  selectedHotels;
  @wire(getAllHotels) wiredHotels;

  handleRowSelection(event) {
    this.selectedHotels = event.detail.selectedRows;
  }

  deleteSelectedHotels() {
    const idList = this.selectedHotels.map((row) => {
      return row.Id;
    });
    deleteHotels({ hotelIds: idList }).then(() => {
      refreshApex(this.wiredHotels);
    });
    this.template.querySelector("lightnint-datatable").selectedRows = [];
    this.selectedHotels = undefined;
  }

  connectedCallback() {
    //this.loading = true;
    this.stopLoading(500);
  }

  /**
   * The stopLoading utility is used to control a consistant state experience for the user - it ensures that
   * we don't have a flickering spinner effect when the state is in flux.
   * @param {timeoutValue} timeoutValue
   */
  stopLoading(timeoutValue) {
    setTimeout(() => {
      refreshApex(this.wiredDataResult);

      this.loading = false;
    }, timeoutValue);
  }

  @wire(getHotelsSearch, { searchKey: "$searchKey" })
  contacts(result) {
    this.loading = true;
    this.stopLoading(500);
    this.wiredDataResult = result;
    if (result.data) {
      this.allActivitiesData = result.data;

      this.items = this.allActivitiesData;
      this.totalRecountCount = this.allActivitiesData.length;
      this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);

      this.allActivitiesData = this.items.slice(0, this.pageSize);
      this.endingRecord = this.pageSize;
      this.columns = columns;
    } else if (result.error) {
      this.error = result.error;
      this.columns = undefined;
    }
  }

  previousHandler() {
    if (this.page > 1) {
      this.page = this.page - 1; //decrease page by 1
      this.displayRecordPerPage(this.page);
    }
  }

  //clicking on next button this method will be called
  nextHandler() {
    if (this.page < this.totalPage && this.page !== this.totalPage) {
      this.page = this.page + 1; //increase page by 1
      this.displayRecordPerPage(this.page);
    }
  }

  //this method displays records page by page
  displayRecordPerPage(page) {
    this.startingRecord = (page - 1) * this.pageSize;
    this.endingRecord = this.pageSize * page;

    this.endingRecord =
      this.endingRecord > this.totalRecountCount
        ? this.totalRecountCount
        : this.endingRecord;

    this.allActivitiesData = this.items.slice(
      this.startingRecord,
      this.endingRecord
    );

    this.startingRecord = this.startingRecord + 1;
  }

  @track recordId;

  handleclick(event) {
    const row = event.detail.row;
    const actionName = event.detail.action.name;
    if (actionName === "view_details") {
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          objectApiName: "Hotel__c",
          recordId: row.Id,
          actionName: "view"
        }
      });
    } else if (actionName === "delete") {
      const row = event.detail.row;

      console.log("test2" + row.Id);

      deleteRecord(row.Id)
        .then(() => {
          this.loading = true;
          this.stopLoading(500);
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Success",
              message: "Record deleted",
              variant: "success"
            })
          );
          // Navigate to a record home page after
          // the record is deleted, such as to the
          // contact home page
          this[NavigationMixin.Navigate]({
            //type: 'standard__objectPage',
            // attributes: {
            //objectApiName: 'Account',
            //actionName: 'new',

            type: "standard__navItemPage",
            attributes: {
              apiName: "Emplois"
            }
          });
        })
        .catch((error) => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Error deleting record",
              message: error.body.message,
              variant: "error"
            })
          );
        });
    } else if (actionName === "update") {
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          objectApiName: "Hotel__c",
          recordId: row.Id,
          actionName: "edit"
        }
      });
    }
  }

  handleKeyChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }

  New() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Hotel__c",
        actionName: "new"
      }
    });
  }

  refrech() {
    // Navigate to the Account home page
    this[NavigationMixin.Navigate]({
      //type: 'standard__objectPage',
      // attributes: {
      //objectApiName: 'Account',
      //actionName: 'new',

      type: "standard__navItemPage",
      attributes: {
        apiName: "Hotels"
      }
    });
  }

  /// export

  downloadCSVFile() {
    let rowEnd = "\n";
    let csvString = "";
    // this set elminates the duplicates if have any duplicate keys
    let rowData = new Set();

    // getting keys from data
    this.allActivitiesData.forEach(function (record) {
      Object.keys(record).forEach(function (key) {
        rowData.add(key);
      });
    });

    // Array.from() method returns an Array object from any object with a length property or an iterable object.
    rowData = Array.from(rowData);

    // splitting using ','
    csvString += rowData.join(",");
    csvString += rowEnd;

    // main for loop to get the data based on key value
    for (let i = 0; i < this.allActivitiesData.length; i++) {
      let colValue = 0;

      // validating keys in data
      for (let key in rowData) {
        if (rowData.hasOwnProperty(key)) {
          // Key value
          // Ex: Id, Name
          let rowKey = rowData[key];
          // add , after every value except the first.
          if (colValue > 0) {
            csvString += ",";
          }
          // If the column is undefined, it as blank in the CSV file.
          let value =
            this.allActivitiesData[i][rowKey] === undefined
              ? ""
              : this.allActivitiesData[i][rowKey];
          csvString += '"' + value + '"';
          colValue++;
        }
      }
      csvString += rowEnd;
    }

    // Creating anchor element to download
    let downloadElement = document.createElement("a");

    // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
    downloadElement.href =
      "data:text/csv;charset=utf-8," + encodeURI(csvString);
    downloadElement.target = "_self";
    // CSV File Name
    downloadElement.download = "Hotels Data.csv";
    // below statement is required if you are using firefox browser
    document.body.appendChild(downloadElement);
    // click() Javascript function to download CSV file
    downloadElement.click();
  }

  report() {
    // Navigate to the Account home page
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Dashboard",
        recordId: "01Z7Q000000LhIIUA0",
        actionName: "view"
      }
    });
  }
}
