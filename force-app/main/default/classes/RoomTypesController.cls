public with sharing class RoomTypesController {
    public RoomTypesController() {

    }



    @AuraEnabled(cacheable=True)
    public static List<RoomType__c> searchRoomTypes(String searchString){
        List<List<SObject>> roomTypes = [FIND :searchString IN ALL FIELDS RETURNING RoomType__c(Name,PricePerNight__c )];
        return (List<RoomType__c>) roomTypes[0];
    }

   //  Get RoomsTypes By hotel 
    @AuraEnabled(Cacheable=true)
    public static List<RoomType__c> getRoomsTypesByHotelID( Id HotelId){
        return [
            SELECT Name, PricePerNight__c ,TotalRoomsAvailable__c,Hotel__c
            FROM RoomType__c
            WHERE Hotel__c = :HotelId];
    }



    // @AuraEnabled
    // public static RoomType__c createRoomType (Object RoomTypeRecObj){
    //     Map<String,Object> roomTypeinfo = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(RoomTypeRecObj));
    //     RoomType__c roomType = new RoomType__c() ;
       
    //     roomType.Name = String.valueOf(roomTypeinfo.get('Name'));
    //     roomType.Hotel__c = String.valueOf(roomTypeinfo.get('Hotel'));
    //     roomType.PricePerNight__c = Integer.valueOf(roomTypeinfo.get('PricePerNight')) ; 
    //     // Decimal d = Decimal.valueOf(!String.isEmpty(amount) ? amount : '0');
    //     // d = d.setScale(8, RoundingMode.HALF_EVEN);
       
    //         insert roomType;
    //         return roomType ;
    // }


    // @AuraEnabled
    // public static RoomType__c updateDepartment(RoomType__c roomT){
    //     RoomType__c roomType  = new RoomType__c() ;
    //     roomType = roomT;
    //     update roomType ;
    //     return roomType ;
    // }

    @AuraEnabled(cacheable=true)
    public static list <RoomType__c> getRoomType(Id RoomTypeID){
        return [ 
            SELECT  Name, PricePerNight__c ,TotalRoomsAvailable__c,Hotel__c
            FROM RoomType__c
            WHERE Id=:RoomTypeID 
            WITH SECURITY_ENFORCED
            ] ;
    }


    @AuraEnabled
    public static void deleteRoomTypes(List<Id> roomTypeIds){
        if(roomTypeIds.size() > 0 ){
            delete [SELECT Id FROM RoomType__c WHERE Id in: roomTypeIds];
        }
    }



    @AuraEnabled(cacheable=True)
    public static List<RoomType__c> getRoomTypes(){
        return [ SELECT  Name, PricePerNight__c ,TotalRoomsAvailable__c,Hotel__c
                FROM RoomType__c
                WITH SECURITY_ENFORCED];
    }


    @AuraEnabled(cacheable=True)
    public static List <AggregateResult> getRoomTypesName(){
        return [ SELECT  Name
                FROM RoomType__c
                GROUP BY Name];
    }





}
