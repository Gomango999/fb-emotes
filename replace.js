
function Emote (cmd) {
	this.cmd = cmd;
	this.keyword = `!${cmd}`;
	this.filepath = `emotes/${cmd}_32.jpeg`;
	this.url = chrome.extension.getURL(this.filepath);
	this.imgElement = `<img src=${this.url}>`;
}

let supik = new Emote("supik");


let fbMsg = "span._3oh-._58nk"

setInterval(function(){
	$(fbMsg).each(function(i) {
		if ($(this).html().includes(supik.keyword)) {
			replaced = $(this).html().replace(supik.keyword, supik.imgElement);
			$(this).html(replaced)
		}
	})
	
}, 2*1000);
