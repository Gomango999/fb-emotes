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

function updateSpan(span) {
	emotes.forEach(function (emote) {
		replaced = $(span).html().replaceAll(emote.keyword, emote.imgElement);
		$(span).html(replaced);
	})
}
	

function subscriber (mutations) {
	mutations.forEach((mutation) => {
		//Replace the stuff in span
		let span = mutation.target.childNodes[1].firstChild;
		if (span.tagName != "SPAN") {
			return
		}
		updateSpan(span);
	});
}


//Attach observer onto the message div when it loads
const config = {
	attributes: true,
	subtree: true
};
const observer = new MutationObserver(subscriber)
waitLoad = setInterval(function() {
	try {
		messageBox = $("div.uiScrollableAreaContent")[2].firstChild.childNodes[2];
	}
	catch {}

	if (messageBox != undefined) {
		updateAll();
		observer.observe(messageBox, config);
		clearInterval(waitLoad);
	}
}, 1*1000)

