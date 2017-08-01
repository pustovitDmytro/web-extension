console.log("background",browser);

browser.runtime.onMessage.addListener(handleMessage);
function handleMessage(request, sender, sendResponse) {
	console.log(browser);
	let text = request.text;
	notify(text);
	sendResponse({response: "response "+text});
}

var notify = function(text){
	browser.notifications.create("cakeNotification", {
		"type": "basic",
		"iconUrl": browser.extension.getURL("icons/main_ico.png"),
		"title": "Title",
		"message": text
	});
}