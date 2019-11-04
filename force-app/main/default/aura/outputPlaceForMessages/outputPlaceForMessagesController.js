({
    checkAvatar : function(component, event, helper) {
        var action = component.get("c.fetchUserDetail");
        var message = event.getParam("message");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                component.set('v.currentUser', res);
                component.set('v.message', message);
            }
        });
        $A.enqueueAction(action); 
    }
})
