@IsTest
public class TestVerifyDate {
    @isTest static void dateWithin() {
        Date returnDate1 = verifyDate.CheckDates(date.valueOf('2020-02-14'), date.valueOf('2020-02-24') );
        System.assertEquals(date.valueOf('2020-02-24'), returnDate1);
    }

    @isTest static void dateNotWithin() {
        Date returnDate2 = verifyDate.CheckDates(date.valueOf('2020-02-14'), date.valueOf('2020-03-24') );
        System.assertEquals(date.valueOf('2020-02-29'), returnDate2);
    }    
}