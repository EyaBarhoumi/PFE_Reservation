public with sharing class QuoteController {
    public Account account {get; Set;}
    public Contact contact {get; Set;}

    public Opportunity opp {get; Set;}
     public Quote quote {get; Set;}    

    
    public QuoteController( ApexPages.StandardController controller){
        this.quote = (Quote)controller.getRecord();
        this.quote = [ select Id, Name, QuoteNumber, ContactId, AccountId, OpportunityId, Subtotal, TotalPrice, GrandTotal, ExpirationDate, CreatedById, Phone, Email
                      from Quote where Id = :quote.Id];
        this.contact = [ select Id, Name ,MobilePhone,MailingStreet,MailingCity,MailingPostalCode from Contact where Id = :quote.ContactId];
 
        this.account = [ select Id, Name from Account where Id = :quote.AccountId];
    }
    
    @InvocableMethod(label='Quote email ')
    public static void generatePDF (list<list<String>> args) {
        list<String> nested = args[0];
        String email = nested[0];
        String recordId = nested[1];

        PageReference QuotePDF = new PageReference ('/apex/QuotePDFView?id=' + recordId );
        Messaging.EmailFileAttachment att = new Messaging.EmailFileAttachment();
        att.setContentType('application/pdf');
        att.setFileName('QuotePDF');
        att.body= QuotePDF.getContent();
        att.setInline(true);
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage(); 
        mail.setToAddresses(new String[] {email});
        mail.setSubject('Invoice');
        mail.setHtmlBody('Please find attached your reservation quote');
        mail.setFileAttachments(new Messaging.EmailFileAttachment[] {att});
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

    }
}
