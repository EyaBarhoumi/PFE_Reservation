public with sharing class ReservationController {
    @AuraEnabled(cacheable=true)
         public static List<Room__c> getAvailableRooms(Map<String,String> ResDetails){
            
        Date beginDate = Date.valueOf(ResDetails.get('begin'));
        Date endDate = Date.valueOf(ResDetails.get('end'));

            // Date beginDate = Date.valueOf('2022-06-01');
            // Date endDate = Date.valueOf('2022-08-01');
            system.debug('hello');
            system.debug(beginDate);   
            system.debug(endDate);
            //Date beginDate = Date.valueOf(SDate);
           // Date endDate = Date.valueOf(EDate);


           // List<Room__c> Roomet = new List<Room__c>();
            List<Id> reservedRooms = new List<Id>();


            List<Reserved_Room__c> reservationList = [SELECT Room__c, name FROM Reserved_Room__c WHERE End_Date__c >= :beginDate AND Start_Date__c <= :endDate ];


             for (Reserved_Room__c item : reservationList) {
                reservedRooms.add(item.Room__c);
             }

    
            List<Room__c> foundRooms = [SELECT Name, RoomPrice__c, Room_Type__c FROM Room__c WHERE Id NOT IN :reservedRooms ORDER BY Name ASC];

            // for(Integer i = 0; i < reservationList.size(); i++){
            //     ID RoomIds =  reservationList.get(i).Room__c;
            //     List<Room__c> Rooom = [ SELECT Name, Price_per_Day__c, Hotel__r.Name FROM Room__c where id= :RoomIds];
            //     Roomet.add(Roomet.get(0));
            // } 
            return foundRooms;


         }
}
