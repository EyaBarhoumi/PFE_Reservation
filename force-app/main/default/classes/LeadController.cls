public with sharing class LeadController {
    public LeadController() {

    }



     
    @AuraEnabled
    public static Lead createLead(Object leadRecObj){
        Map<String,Object> leadinfo = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(leadRecObj));
        Lead lead = new Lead() ; 
             //Lead Fields
            lead.FirstName = String.valueOf(leadinfo.get('FirstName'));
            lead.UserName__c = String.valueOf(leadinfo.get('UserName'));
            lead.LastName = String.valueOf(leadinfo.get('LastName'));
            lead.Phone = String.valueOf(leadinfo.get('Phone'));
            lead.Email = String.valueOf(leadinfo.get('Email'));
            lead.Cin__c=String.valueOf(leadinfo.get('Cin'));
            lead.Age__c=Integer.valueOf(leadinfo.get('Age'));
            // String  BirthDate =String.valueOf(leadinfo.get('DateOfBirth'));
            // lead.Date_of_birth__c=Date.valueOf(BirthDate);
            lead.Company ='Talan';
            //Reservation Fields
            lead.NumberOfGuests__c = Integer.valueOf(leadinfo.get('NumberOfGuests'));
            lead.NumberOfRooms__c = Integer.valueOf(leadinfo.get('NumberOfRooms'));
            lead.ReservationStartDate__c = Date.valueOf(leadinfo.get('StartDate'));
            lead.ReservationEndDate__c = Date.valueOf(leadinfo.get('EndDate'));
            lead.RoomType__c = String.valueOf(leadinfo.get('RoomType'));
            lead.Hotel__c=String.valueOf(leadinfo.get('Hotel'));


            insert lead ;
            return lead ;
       
    }

}
