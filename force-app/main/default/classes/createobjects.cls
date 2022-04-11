public with sharing class createobjects {

public createobjects(){
    
}

    @AuraEnabled(cacheable=true)
    public static String getAccountName(ID ContactId){
        List<Contact> Contacts = [SELECT AccountId FROM Contact WHERE Id =: ContactId];
        ID acctId = Contacts.get(0).AccountId;
        //List<Account> accounts = [select Name from Account where Id=:acctId];
        return acctId;
        }
}
