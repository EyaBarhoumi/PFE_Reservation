public with sharing class HotelController {
    @AuraEnabled(cacheable=true)
    public static List<Hotel__c> getHotelList() {
        return [
            SELECT Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,City__c
            FROM Hotel__c
            WITH SECURITY_ENFORCED
        ];

    }


    @AuraEnabled(Cacheable=true)
    public static Hotel__c[] searchHotels(String searchTerm) {
        // Return all hotels when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllHotels();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT
            Name, Description__c ,Hotel_Picture_Url__c,City__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c
            FROM Hotel__c
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }


    @AuraEnabled(cacheable=true)
    public static List<Hotel__c> getHotelsSearch(String searchKey) {
        String key = '%' + searchKey + '%';
        return [ SELECT Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,City__c FROM Hotel__c  where Name LIKE :key WITH SECURITY_ENFORCED];
    }



    @AuraEnabled(Cacheable=true)
    public static Hotel__c[] getAllHotels() {
        return [
            SELECT
            Name, Id, Description__c ,Hotel_Picture_Url__c,City__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c
            FROM Hotel__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }


    @AuraEnabled(Cacheable=true)
    public static List<Hotel__c> getHotelByID( Id HotelId){
        return [
            SELECT
            Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,City__c
            FROM Hotel__c 
            WHERE Id = :HotelId];
    }



    //get hotels by city = ( city = city l donnée search key)
    // @AuraEnabled(cacheable=true)
    // public static List<Hotel__c> getHotelsByCity(String searchKey){
    //     String key = '%' + searchKey + '%';
    //     return [SELECT Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__Latitude__s,
    //     Hotel_Location__Longitude__s,Phone_Number__c,City__c FROM Hotel__c WHERE City__c LIKE :key ];
    // }



    @AuraEnabled(cacheable=True)
    public static List<AggregateResult> getCities(){
 
                return [ SELECT  City__c
                FROM Hotel__c
                GROUP BY City__c];
    }



    @AuraEnabled(cacheable=true)
    public static List<Hotel__c> getHotelsByCity(String searchKey){
        String key = '%' + searchKey + '%';
        return [SELECT Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__Latitude__s,
        Hotel_Location__Longitude__s,Phone_Number__c,City__c FROM Hotel__c WHERE City__c LIKE :key ];
    }


    @AuraEnabled
    public static void deleteHotel(Hotel__c objHotel){
        try {
            delete objHotel;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteHotels(List<Id>hotelIds){
        if (hotelIds.size()>0) {
            delete [SELECT Id FROM Hotel__c  WHERE Id in:hotelIds ];
        }
    }


    // @AuraEnabled
    // public static Hotel__c createHotel (Object HotelRecObj){
    //     Map<String,Object> hotelinfo = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(HotelRecObj));
    //     Hotel__c hotel = new Hotel__c() ;
       
    //     hotel.Name = String.valueOf(hotelinfo.get('Name'));
    //     hotel.Description__c = String.valueOf(hotelinfo.get('Description'));
    //     hotel.City__c = String.valueOf(hotelinfo.get('City')) ; 
    //     hotel.Phone_Number__c = String.valueOf(hotelinfo.get('Phone_Number')) ; 
    //     hotel.Hotel_Location__c = Geolocation.valueOf(hotelinfo.get('Location')) ; 
    //     hotel.Hotel_Picture_Url__c = String.valueOf(hotelinfo.get('HOTEL_PICTURE_FIELD')) ; 
    //     hotel.Street__c = String.valueOf(hotelinfo.get('Street')) ; 
        


    //         insert hotel;
    //         return hotel ;
    // }




}
