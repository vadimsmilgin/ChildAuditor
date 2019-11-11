({  
    doInit : function(component, event, helper) {
        var action = component.get("c.getChat");
        var recordId = component.get("v.recordId");

        action.setParams({"recordId": recordId});

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue();
                console.log(conts);
                var dateForMessages = [];
                for(var i in conts) {
                    dateForMessages.push({value: conts[i].DateCreated__c});                   
                }
                console.log(dateForMessages);
                component.set("v.chat", conts);
            }
        });
        $A.enqueueAction(action);
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
                component.set("v.chat", conts);
            }
        });
        $A.enqueueAction(action); 
    }
})
