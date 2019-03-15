String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function Emote (cmd) {
	this.cmd = cmd;
	this.keyword = `!${cmd}`;
	this.filepath = `emotes/${cmd}_24.png`;
	this.url = chrome.extension.getURL(this.filepath);
	this.imgElement = `<img src=${this.url}>`;
}

//Define all emotes here
let emotes = [];
emotes.push(new Emote("supik"));
emotes.push(new Emote("pogchamp"));



let fbMsgSel = "span._3oh-._58nk";
let messageBox = undefined;

// Called when fb opened for the first time. Will update all messages to the correct image
function updateAll() {
	emotes.forEach(function (emote) {
		$(fbMsgSel).each(function(i) {	
			if ($(this).html().includes(emote.keyword)) {
				replaced = $(this).html().replaceAll(emote.keyword, emote.imgElement);
				$(this).html(replaced);
			}
		})
	})
}

//Called to update all spans in a newly loaded div
function updateDiv(div) {
	$(div).find(fbMsgSel).each(function (i) {
		updateSpan($(this))
	})
}

//Called to update a span
function updateSpan(span) {
	emotes.forEach(function (emote) {
		replaced = $(span).html().replaceAll(emote.keyword, emote.imgElement);
		$(span).html(replaced);
	})
}

//Gets the last span from a div (when a new message has been typed)
function getLastMsgFromDiv(div) {
	return div.lastChild.firstChild.lastChild.firstChild
}

function message_handler (mutations) {
	mutations.forEach((mutation) => {

		// Added new chat div
		if ($(mutation.target).hasClass("_41ud")) {

			if ($(mutation.addedNodes[0]).hasClass("_ih3")) {
				// If loaded a whole div
				updateDiv(mutation.target)

			} else if ($(mutation.addedNodes[0]).hasClass("clearfix")) { // Having multiple classes in here doesn't work
				// If loaded a single message
				let span = getLastMsgFromDiv(mutation.target)
				updateSpan(span);
			}
		}
	});
}


//Attach observer onto the message div when it loads
const config = {
	childList: true,
	subtree: true
};
const observer = new MutationObserver(message_handler)
waitLoad = setInterval(function() {
	try {
		messageBox = $("div.uiScrollableAreaContent")[2].firstChild.childNodes[2];
	}
	catch {}

	if (messageBox != undefined) {
		updateAll();
		console.log(messageBox)
		observer.observe(messageBox, config);
		clearInterval(waitLoad);
	}
}, 1*1000)


// If added a whole div, gives addednode: 	h5._ih3._-ne
// If just added an end part, gives 		div.clearfix._o46._3erg._3i_m._nd_.direction_ltr.text_align_ltr

