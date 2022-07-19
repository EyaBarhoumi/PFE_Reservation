public with sharing class ContactController {
    public ContactController() {

    }


    @AuraEnabled(cacheable=true)
    public static String getContactId (String userId){
         List<User> users = [Select ContactId from User where Id =: userId];
          Id contactid = users.get(0).ContactId;
          return contactid;}
}