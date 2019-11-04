public with sharing class ChildController {
    
    @AuraEnabled
    public static Map<String, Integer> getAllRelatedChild(Id recordId) {

        String idRecord = String.valueOf(recordId);
        String query = '';
        List<SObject> childRecords = new List<SObject>();
        Map<String, Integer> outputMap = new Map<String, Integer>();

        try {
            //Get prefix from record ID
            //This assumes that you have passed at least 3 characters
            String myIdPrefix = String.valueOf(idRecord).substring(0,3);
             
            //Get schema information
            Map<String, Schema.SObjectType> gd =  Schema.getGlobalDescribe(); 
             
            //Loop through all the sObject types returned by Schema
            for(Schema.SObjectType stype : gd.values()){

                Schema.DescribeSObjectResult r = stype.getDescribe();
                String prefix = r.getKeyPrefix();

                if(prefix!=null && prefix.equals(myIdPrefix)) {
                    for(Schema.ChildRelationship i : r.getChildRelationships()) {
                        try {
                            query = 'SELECT Id FROM ' + String.valueOf(i.getChildSObject()) + ' WHERE ' +  String.valueOf(i.getField()) + ' =:recordId';
                            Schema.DescribeSObjectResult child = i.getChildSObject().getDescribe();

                            childRecords = Database.query(query);
                            if(childRecords.size() > 0){
                                if(outputMap.containsKey(String.valueOf(i.getChildSObject()))) {
                                    outputMap.put(String.valueOf(child.getLabelPlural()), childRecords.size() + outputMap.get(String.valueOf(i.getChildSObject())));
                                } else {
                                    outputMap.put(String.valueOf(child.getLabelPlural()), childRecords.size());
                                }
                            }
                        } catch(QueryException e) {
                            continue;
                        }
                    }
                    break;
                }
            }
        } catch(Exception e){
            System.debug(e);
        }
        return outputMap;
    }
}
