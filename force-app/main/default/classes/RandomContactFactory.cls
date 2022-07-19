public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer numofContacts, String lastName){
        List<Contact> contacts = new List<Contact>();
        for(Integer i=0;i<numOfContacts;i++) {
            Contact c = new Contact(FirstName='Test' + i, LastName=lastName);
            contacts.add (c);
            system.debug(contacts);
        }
        return contacts;
    }
}