public with sharing class RoomController {
    @AuraEnabled(cacheable=true)
    public static List<Room__c> getRoomList() {
        return [
            SELECT Name, RoomCapacity__c ,RoomDescription__c,RoomNumber__c,RoomPictureUrl__c,RoomPrice__c,RoomStatus__c,RoomView__c
            FROM Room__c
            WITH SECURITY_ENFORCED
        ];

    }


    @AuraEnabled(Cacheable=true)
    public static Room__c[] getAllRooms() {
        return [
            SELECT Name, RoomCapacity__c ,RoomDescription__c,RoomNumber__c,RoomPictureUrl__c,RoomPrice__c,RoomStatus__c,RoomView__c
            FROM Room__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Room__c> getRoomByID( Id RoomId){
        return [
            SELECT Name, RoomCapacity__c ,RoomDescription__c,RoomNumber__c,RoomPictureUrl__c,RoomPrice__c,RoomStatus__c,RoomView__c
            FROM Room__c
            WHERE Id = :RoomId];
    }

    //Get Rooms By hotel 
    //Get Rooms by status 
    




}
