function handleResponse(message) {
  console.log("background script sent a response:",message);
}
function handleError(error) {
  console.log("Error:",error);
}
document.onkeydown= function(e) {
    if(e.shiftKey){
    	var s = document.getSelection().toString();
    	if(s) {
    		console.log(browser.runtime);
    		var sending=browser.runtime.sendMessage({text: s});
    		sending.then(handleResponse, handleError); 
    	}
	}
}