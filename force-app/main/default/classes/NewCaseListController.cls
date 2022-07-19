public class NewCaseListController {
    
    public List<case> getNewCases () {
        
        List<Case> results = Database.query(
            
            'SELECT Id, caseNumber from Case where Status = \'New\'');
        
        
        return results;
        
    }
    
}