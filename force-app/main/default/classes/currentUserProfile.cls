public class currentUserProfile {
    @AuraEnabled 
    public static user fetchUserDetail(){
        return [Select SmallPhotoUrl
                From User
                Where Id =: Userinfo.getUserId()];
    }
}
