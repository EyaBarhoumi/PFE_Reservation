public class ContactSearch {
    public static List<Contact> searchForContacts(String lastname,String postalCode){
        
        List <Contact> contactsFound=[
            Select Id,Name
            From Contact 
            Where LastName=:lastName and MailingPostalCode=:postalCode
        ];
        return contactsFound;
    }
}