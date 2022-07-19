public with sharing class OpportunityController {
    public OpportunityController() {

    }


    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> aggregateOpportunities(){
        Map<String, Integer> opportunityStatusMap = new Map<String, Integer>();
        //Aggregate the opportunities. 
        for(AggregateResult aggr : [SELECT Count(Id), StageName
                                    FROM Opportunity
                                    GROUP BY StageName]) {
            opportunityStatusMap.put((String)(aggr.get('StageName')), (Integer)(aggr.get('expr0')));
        }

        return opportunityStatusMap;
    }

}
