({
    doInit : function(component, event, helper) {
        var mainTime = component.get("v.commentary.TimeInMillis__c");
        component.set("v.formatdate", new Date(mainTime));
    },
})
