({
    pollApex : function(component, event, helper) {
        helper.refreshChat(component, event, helper);

        window.setInterval($A.getCallback(function() {
                            helper.refreshChat(component, event, helper);
                        }), 5000);    
    },

    refreshChat : function(component, event, helper) {
        var action = component.get("c.getChat");
        var recordId = component.get("v.recordId");

        action.setParams({"recordId": recordId});

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
