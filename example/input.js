//
//
//
//
//


function onSliderChange(element, handler, updateFunction) {
    element.updateFunction = updateFunction;
    element.currentValue = element.value;
    element.newValue = element.value;
    
    element.addEventListener("input", function(event) {
        event.target.inputCalled = true;
        event.target.newValue = event.target.value;
        if (event.target.newValue !== event.target.currentValue) handler(event);
        event.target.currentValue = event.target.newValue;
    });
  
    element.addEventListener("change", function(event) {
        if (! event.target.inputCalled) handler(event);
    }); 
}


export { onSliderChange };