public with sharing class LeadController {
    public LeadController() {

    }



     
    @AuraEnabled
    public static Lead createLead(Object leadRecObj){
        Map<String,Object> leadinfo = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(leadRecObj));
        system.debug(leadinfo);
        system.debug(leadinfo.get('StartDate'));
        system.debug(leadinfo.get('EndDate'));
        
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
            lead.ReservationStartDate__c = Date.valueOf(String.valueOf(leadinfo.get('StartDate')));
            lead.ReservationEndDate__c = Date.valueOf(String.valueOf(leadinfo.get('EndDate')));

            // lead.ReservationStartDate__c = Date.valueOf('2022-08-10');
            // lead.ReservationEndDate__c = Date.valueOf('2022-08-20');
            
            lead.RoomType__c = String.valueOf(leadinfo.get('RoomType'));
            lead.Hotel__c=String.valueOf(leadinfo.get('Hotel'));
           
            system.debug('debug');
            system.debug(lead);

            insert lead ;
            return lead ;
       
    }



    
    // @AuraEnabled
    // public static list<Lead> readCSVFileLead(Id idContentDocument){
    //     list<Lead> lstAccsToInsert = new list<Lead>();
    //     if(idContentDocument != null) {
            
    //         // getting File Data based on document id 
    //         ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
    //         // split the file data
    //         list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');

    //         for(Integer i = 1; i < lstCSVLines.size(); i++){
    //             Lead objAcc = new Lead();
    //             list<String> csvRowData = lstCSVLines[i].split(',');
    //             System.debug('csvRowData====> '+csvRowData);
                
    //             objAcc.FirstName = csvRowData[0]; 
    //             objAcc.LastName = csvRowData[1];
    //             objAcc.UserName__c = csvRowData[2];
    //             objAcc.Company = csvRowData[3];
    //             objAcc.Phone = csvRowData[4];
    //             objAcc.Email = csvRowData[5];
    //             objAcc.Cin__c = csvRowData[6];
    //             objAcc.Age__c = csvRowData[7];
    //             objAcc.NumberOfGuests__c = csvRowData[8];
    //             objAcc.NumberOfRooms__c = csvRowData[9];
    //             objAcc.ReservationStartDate__c = csvRowData[10];
    //             objAcc.ReservationEndDate__c = csvRowData[11];
    //             objAcc.RoomType__c = csvRowData[12];
    //             objAcc.Hotel__c = csvRowData[13];
              

               
            
    //             lstAccsToInsert.add(objAcc);
    //         }

    //         try{    
    //             if(!lstAccsToInsert.isEmpty()) {
    //                 insert lstAccsToInsert;
    //             }
    //         }
    //         catch (Exception ex) {
    //             throw new AuraHandledException(ex.getMessage());
    //         } 
    //     }
    //     return lstAccsToInsert;    
    // }

}