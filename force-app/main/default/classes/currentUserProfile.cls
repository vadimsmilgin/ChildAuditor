public class currentUserProfile {
    @AuraEnabled 
    public static List<MyChatter__c> addCommentInObject(Id recordId, String message, String idUser) {
        String idRecord = String.valueOf(recordId);
        TimeZone tz = UserInfo.getTimeZone();
        MyChatter__c mc = new MyChatter__c(Comment__c = message, 
                                           idRecord__c = idRecord, 
                                           User__c = idUser,
                                           DateCreated__c = string.valueof(DateTime.now()),
                                           Difference_from_GMT__c = (tz.getOffset(DateTime.now()))/3600000,
                                           TimeInMillis__c = DateTime.now().getTime());                                  
        insert mc;

        List<MyChatter__c> listOfChat = [select Comment__c, User__r.Name, User__r.SmallPhotoUrl, DateCreated__c, Difference_from_GMT__c, TimeInMillis__c from MyChatter__c where idRecord__c =: idRecord ORDER BY CreatedDate DESC LIMIT 5];
        return listOfChat;
    }

    @AuraEnabled    
    public static List<MyChatter__c> getChat(Id recordId) {
        String idRecord = String.valueOf(recordId);
        List<MyChatter__c> listOfChat = [select Comment__c, User__r.Name, User__r.SmallPhotoUrl, DateCreated__c, Difference_from_GMT__c, TimeInMillis__c from MyChatter__c where idRecord__c =: idRecord ORDER BY CreatedDate DESC LIMIT 5];
        return listOfChat;
    }
}
