({
    postMessage : function(component, event, helper) {
        var message = component.get("v.message");
        var showComment = component.getEvent("showComment");
        showComment.setParams({ "message": message });
        showComment.fire();
    }
})
