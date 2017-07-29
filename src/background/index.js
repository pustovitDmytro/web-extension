function handleMessage(request, sender, sendResponse) {
	var text = request.text;
	notify(text);
	sendResponse({response: "response "+text});
}

browser.runtime.onMessage.addListener(handleMessage);

var notify = function(text){
	browser.notifications.create("cakeNotification", {
		"type": "basic",
		"iconUrl": browser.extension.getURL("icons/main_ico.png"),
		"title": "Title",
		"message": text
	});
}