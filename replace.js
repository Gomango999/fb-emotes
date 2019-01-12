setInterval(function(){
	var keyword = "!supik"
	var messageClass = "_3oh- _58nk"

	var imgURL = chrome.extension.getURL("32_pik.jpeg");
	var image = "<img src=" + imgURL + "> </img>"

    var elements = document.getElementsByTagName("span")

    for (var i = 0; i < elements.length; i++) {
        text = elements[i].innerHTML;
        if (elements[i].className == messageClass) {
	        if (text.includes(keyword)) {
	        	// console.log("I:", i)
	        	// console.log(elements[i])
	        	// console.log(text)
	        	elements[i].innerHTML = text.replace(keyword, image);
	        }
	    }
    }
}, 2*1000);

