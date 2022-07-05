public with sharing class ReservationController {
    @AuraEnabled(cacheable=true)
         public static List<Room__c> getAvailableRooms(Map<String,String> ResDetails){
            
        Date beginDate = Date.valueOf(ResDetails.get('begin'));
        Date endDate = Date.valueOf(ResDetails.get('end'));
        string capacity = ResDetails.get('capacity');
        string city = ResDetails.get('city');
            system.debug('hello');
            system.debug(beginDate);   
            system.debug(endDate);
            
            List<Id> reservedRooms = new List<Id>();

            List<Reserved_Room__c> reservationList = [SELECT Room__c, name FROM Reserved_Room__c WHERE End_Date__c >= :beginDate AND Start_Date__c <= :endDate AND Room__r.Capacity__c = :capacity ];


             for (Reserved_Room__c item : reservationList) {
                reservedRooms.add(item.Room__c);
             }

             // test
             List<Room__c> foundRooms = [SELECT Name, RoomPrice__c,Capacity__c, Room_Type__c, Room_Type__r.Hotel__c , Room_Type__r.hotel__r.name, Room_Type__r.hotel__r.Description__c, Room_Type__r.hotel__r.Phone_Number__c ,Room_Type__r.Hotel__r.Hotel_Picture_Url__c,Room_Type__r.Hotel__r.City__c FROM Room__c
             WHERE Id NOT IN :reservedRooms
             AND Capacity__c = :capacity
             AND  Room_Type__r.Hotel__r.City__c  LIKE :city
             ORDER BY Name ASC
             ];

              for(integer i=0;i<foundRooms.size();i++) {
                Room__c hospi = foundRooms.get(i);
                 for(integer j=0;j<foundRooms.size();j++) {
                  
                    Room__c hospj = foundRooms.get(j); 
                     if(hospi.Room_Type__r.hotel__r.name == hospj.Room_Type__r.hotel__r.name && i!=j) {
                        foundRooms.remove(j); 
                         system.debug('REMOVED::'+j);  
                     }
                 }
             }
             if (foundRooms.size() > 0) {
                return foundRooms;
            } else {
                return null;
            }

         }
         
         @AuraEnabled
         public static Id temporallyBlockRooms(List<Room__c> roomsToReserve, Map<String, String> dates) {
             List<Reserved_Room__c> reservedRooms = new List<Reserved_Room__c>();
     
             Datetime beginDate = (Datetime) JSON.deserialize('"'+dates.get('begin')+'"', Datetime.class);
             Datetime endDate = (Datetime) JSON.deserialize('"'+dates.get('end')+'"', Datetime.class);
     
             Reservation__c reservation = new Reservation__c(Reservation_Begin__c=beginDate, Reservation_End__c=endDate);
     
             insert reservation;
     
             for (Room__c room : roomsToReserve) {
                 Reserved_Room__c tempReservedRoom = new Reserved_Room__c(Room__c=room.Id, Reservation__c=reservation.Id);
                 reservedRooms.add(tempReservedRoom);
             }
     
             insert reservedRooms;
     
             return reservation.Id;
         }


         // @AuraEnabled
         // public static String[] fulfillReservation(Contact[] contact, RegistredContact__c[] registeredContacts) {
     
         //     for (Contact contact : contacts) {
         //         upsert contact Cin__c;
         //     }
     
         //     for (Integer i=0; i<registeredContacts.size(); i++) {
         //       registeredContacts[i].Contact = contacts[i].Id;
         //     }
     
         //     insert registeredContacts;
     
         //     Reservation__c reservation = [SELECT Id, Name FROM Reservation__c WHERE Id = :registeredContacts[0].Reservation__c];
         //     List<String> reservationInfo = new List<String> {reservation.Id, reservation.Name};
     
         //     return reservationInfo;
         // }
     


         @AuraEnabled
         public static void cancelReservation(String reservationId) {
             Reservation__c reservationToDelete = [SELECT Id FROM Reservation__c WHERE Id= :reservationId];
             delete reservationToDelete;
         }
     




      
}