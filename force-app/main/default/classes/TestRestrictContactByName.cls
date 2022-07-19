@IsTest
public class TestRestrictContactByName {
    @IsTest static void createBadContact(){
        
        Contact c=new Contact(Firstname='John',LastName='INVALIDNAME');
        
        Test.startTest();
        Database.SaveResult result = Database.insert(c, false);
        Test.stopTest();
        
        System.assert(!result.isSuccess());
    }
}