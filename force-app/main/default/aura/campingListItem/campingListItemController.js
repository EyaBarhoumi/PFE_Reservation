({
	packItem : function(component, event, helper) {
		component.set("v.item.Packed__c",true);
        event.getsource(). set("v.disabled", true);
	}
})