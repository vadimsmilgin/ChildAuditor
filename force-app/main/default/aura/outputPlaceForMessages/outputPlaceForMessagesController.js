({  
    doInit : function(component, event, helper) {
        helper.pollApex(component, event, helper);
    },

    addComment : function(component, event, helper) {       
        var action = component.get("c.addCommentInObject");
        var message = event.getParam("message");
        var recordId = component.get("v.recordId");
        var userId = $A.get("$SObjectType.CurrentUser.Id");

        action.setParams({"recordId": recordId, "message": message, "idUser": userId});

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue();
                component.set("v.comments", conts);
            }
        });
        $A.enqueueAction(action); 
    }
})
