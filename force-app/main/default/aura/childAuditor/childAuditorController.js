({
    doInit : function(component, event, helper) {
        var action = component.get("c.getAllRelatedChild");
        var recordId = component.get("v.recordId");

        action.setParams({"recordId": recordId});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var custs = [];
                var conts = response.getReturnValue();
                for(var key in conts){
                    custs.push({value:conts[key], key:key});
                }
                component.set("v.childs", custs);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        $A.enqueueAction(action);
    }
})
