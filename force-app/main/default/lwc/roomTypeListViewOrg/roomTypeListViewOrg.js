import { LightningElement, wire, api, track } from "lwc";
import { refreshApex } from "@salesforce/apex";
import createDepartment from "@salesforce/apex/departmentListViewHelper.createDepartment";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
import updateDepartment from "@salesforce/apex/departmentListViewHelper.updateDepartment";
import roomTypeObject from "@salesforce/schema/RoomType__c";
import getUserList from "@salesforce/apex/departmentListViewHelper.getUserList";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import submitDepartmentAction from "@salesforce/apex/lwcAppExampleApex.submitDepartmentAction";
import getRoomTypes from "@salesforce/apex/RoomTypesController.getRoomTypes";
import searchRoomTypes from "@salesforce/apex/RoomTypesController.searchRoomTypes";
import deleteRoomTypes from "@salesforce/apex/RoomTypesController.deleteRoomTypes";
import getRoomType from "@salesforce/apex/RoomTypesController.getRoomType";
import createRoomType from "@salesforce/apex/RoomTypesController.createRoomType";

const actions = [
  { label: "Delete", name: "delete" },
  { label: "View", name: "view" },
  { label: "Edit", name: "edit" }
];

const COLS = [
  {
    label: "Room Type Name",
    fieldName: "link",
    type: "url",
    typeAttributes: { label: { fieldName: "Name" } }
  },
  { label: "Description", fieldName: "Description" },
  {
    fieldName: "actions",
    type: "action",
    typeAttributes: { rowActions: actions }
  }
];

export default class RoomListViewOrg extends LightningElement {
  cols = COLS;
  roomtypes;
  wiredRoomTypes;
  selectedRoomTypes;
  baseData;
  @track customFormModal = false;
  @track roomTypeRecoredId;
  @wire(getHotelList) Hotel;
  @track wiredgetHotel;
  @wire(getObjectInfo, { objectApiName: roomTypeObject })
  roomTypeInfo;

  @track isModalOpenEdit = false;
  @api objectApiName;

  @track error;
  @api NewRoomType = {};
  @api roomType = {};
  @api roomt = {};

  @api roomTypeObject = {};

  @track isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  handleNameChange(event) {
    this.roomTypeObject.Name = event.target.value;
  }

  handleHotelChange(event) {
    this.roomTypeObject.Hotel = event.target.value;
  }
  handlePriceChange(event) {
    this.roomTypeObject.PricePerNight = event.target.value;
  }
  // handleManagerChange(event) {
  //   this.departmentObject.Manager = event.target.value;
  // }
  // handleProjectManagerChange(event) {
  //   this.departmentObject.Project_Manager = event.target.value;
  // }
  submitDetails() {
    console.log("Name", this.roomTypeObject.Name);
    console.log("Hotel", this.roomTypeObject.Hotel);
    console.log("Price per night", this.roomTypeObject.PricePerNight);
    createRoomType({ RoomTypeRecObj: this.roomTypeObject })
      .then((result) => {
        this.roomTypeRecoredId = result.Id;
        window.console.log(
          "roomTypeRecoredId##Vijay2 " + this.roomTypeRecoredId
        );
        console.log("success" + result);
        this.isModalOpen = false;
        this.roomTypeObject = {};
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Room Type created successfully..!",
            variant: "success"
          })
        );
        refreshApex(this.wiredRoomTypes);
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: result.Id,
            objectApiName: "RoomType__c",
            actionName: "view"
          }
        });
      })

      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error creating record",
            message: error.body.message,
            variant: "error"
          })
        );
      });
  }

  @track roomTypeObjName;
  @track departmentObjDescription;

  @track roomTypeRecoredId;
  @track errorMsg;

  roomTypeHandleChange(event) {
    if (event.target.name == "room type Name") {
      this.roomTypeObjName = event.target.value;
      //window.console.log('scoreObName ##' + this.scoreObName);
    }
    if (event.target.name == "hotel") {
      this.departmentObjDescription = event.target.value;
    }
  }

  get selectedRoomTypesLen() {
    if (this.selectedRoomTypes == undefined) return 0;
    return this.selectedRoomTypes.length;
  }

  @wire(getRoomTypes)
  roomtypesWire(result) {
    this.wiredRoomTypes = result;
    if (result.data) {
      this.roomtypes = result.data.map((row) => {
        return this.mapRoomtypes(row);
      });
      this.baseData = this.roomtypes;
    }
    if (result.error) {
      console.error(result.error);
    }
  }

  mapRoomtypes(row) {
    return {
      ...row,
      Name: `${row.Name}`,
      link: `/${row.Id}`,
      Hotel: `${row.Hotel__c}`
    };
  }

  handleRowSelection(event) {
    this.selectedRoomTypes = event.detail.selectedRows;
  }

  async handleSearch(event) {
    if (event.target.value == "") {
      this.roomtypes = this.baseData;
    } else if (event.target.value.length > 1) {
      const searchRoomTypes = await searchRoomTypes({
        searchString: event.target.value
      });

      this.roomtypes = searchRoomTypes.map((row) => {
        return this.mapRoomtypes(row);
      });
    }
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    this.recordId = row.Id;
    switch (actionName) {
      case "view":
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: row.Id,
            actionName: "view"
          }
        });
        break;
      case "edit":
        getRoomType({ RoomTypeID: row.Id }).then((result) => {
          console.log("test", result[0]);
          this.roomType = result[0];
          this.NewRoomType.Id = this.roomType.Id;
          this.openModalEdit();
          console.log("test1", result[0]);
        });
        break;
      case "delete":
        deleteRoomTypes({ roomTypeIds: [event.detail.row.Id] })
          .then(() => {
            refreshApex(this.wiredRoomTypes);
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Success",
                message: "Record deleted",
                variant: "success"
              })
            );
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
    }
  }
  openModalEdit() {
    console.log("hi");
    this.isModalOpenEdit = true;
  }
  closeModalEdit() {
    this.isModalOpenEdit = false;
  }
  handleNameEdit(event) {
    this.NewRoomType.Name = event.target.value;
  }

  handleHotelEdit(event) {
    this.NewRoomType.Hotel__c = event.target.value;
  }
  handleMemberEdit(event) {
    this.NewRoomType.PricePerNight__c = event.target.value;
  }
  // handleManagerEdit(event) {
  //   this.NewRoomType.Manager__c = event.target.value;
  // }
  // handleProjectManagerEdit(event) {
  //   this.NewRoomType.Project_Managers__c = event.target.value;
  // }

  submitDetailsEdit() {
    console.log("hi", this.NewRoomType.Name);
    console.log("hi", this.NewRoomType.Hotel__c);
    console.log("hi", this.NewRoomType.PricePerNight__c);
    updateRoomType({ dep: this.NewRoomType }).then((result) => {
      this.roomTypeRecoredId = result.Id;
      window.console.log("roomTypeRecoredId##Vijay2 " + this.roomTypeRecoredId);
      console.log("success" + result);

      console.log("tested", this.roomtype);
      this.NewRoomType = {};
      console.log("teste", this.NewRoomType);
      this.isModalOpenEdit = false;
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success",
          message: "Room Type updated successfully..!",
          variant: "success"
        })
      );
      refreshApex(this.wiredRoomTypes);
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          recordId: result.Id,
          objectApiName: "RoomType__c",
          actionName: "view"
        }
      });
    });
  }

  deleteSelectedRoomTypes() {
    const idList = this.selectedRoomTypes.map((row) => {
      return row.Id;
    });
    deleteRoomTypes({ roomTypeIds: idList })
      .then(() => {
        refreshApex(this.wiredRoomTypes);
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Records deleted",
            variant: "success"
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error deleting records",
            message: error.body.message,
            variant: "error"
          })
        );
      });
    this.template.querySelector("lightning-datatable").selectedRows = [];
    this.selectedRoomTypes = undefined;
  }
}
