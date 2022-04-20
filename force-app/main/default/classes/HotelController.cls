public with sharing class HotelController {
    @AuraEnabled(cacheable=true)
    public static List<Hotel__c> getHotelList() {
        return [
            SELECT Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,Street__c
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
            Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,Street__c
            FROM Hotel__c
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }


    @AuraEnabled(Cacheable=true)
    public static Hotel__c[] getAllHotels() {
        return [
            SELECT
            Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,Street__c
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
            Name, Description__c ,Hotel_Picture_Url__c,Hotel_Location__c,Hotel_Location__Latitude__s,Hotel_Location__Longitude__s,Phone_Number__c,Street__c
            FROM Hotel__c 
            WHERE Id = :HotelId];
    }
}
