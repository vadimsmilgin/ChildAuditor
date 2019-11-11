({
    postMessage : function(component, event, helper) {
        var message = component.get("v.message");
        var emptyString = "";
        var showComment = component.getEvent("showComment");
        showComment.setParams({ "message": message });
        component.set('v.message', emptyString);
        showComment.fire();
    }
})
