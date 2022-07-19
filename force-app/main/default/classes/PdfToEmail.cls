public with sharing class PdfToEmail  implements Schedulable {
    public List<Reservation__c> Reservations {get; set;}


    public PdfToEmail() {
        Reservations =  [
            SELECT Id , Number_Of_Guests__c, Number_of_Reserved_Rooms__c,Reservation_Begin__c,Reservation_End__c,Reservation_Number__c,Status__c,Total_Reservation_Cost__c,Contact__c ,Total_Cost__c
             FROM Reservation__c
                 WHERE Reservation_Begin__c = THIS_WEEK 
                 ORDER BY Reservation_Begin__c
        ]; }

        @Future(callout=true)
        @AuraEnabled
        public static void sendReport() {
     
            string [] toaddress= New string[]{'eya.barhoumi@esprit.tn'};
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
            message.setToAddresses(toaddress);
            message.setSubject('This Week Reservations');
            message.setsaveasactivity(false);
    
            message.setHtmlBody('Please find attached this week Reservations Data');
            
            
            PageReference pdf = Page.PdfToEmail;
                
            Blob reportPdf;
            try {
                reportPdf = pdf.getContentAsPDF();
            }
            catch (Exception e) {
                reportPdf = Blob.valueOf(e.getMessage());
            }
            
            Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
            attachment.setContentType('application/pdf');
            attachment.setFileName('Reservation : '+system.today().format());
            attachment.setInline(false);
            //attachment.setBody('reportPdf');
            attachment.body = pdf.getContent();
            message.setFileAttachments(new Messaging.EmailFileAttachment[]{ attachment });
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ message });
     
        }
    
    
        public void execute(SchedulableContext sc){
            PdfToEmail.sendReport();
        }



}
