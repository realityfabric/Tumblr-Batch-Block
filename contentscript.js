var openBlockList = function () {
        $('document').ready( function () {
            $("#blocked_blogs > .accordion_trigger_wrapper > .accordion_trigger").click();
        });
}

var block = function (blog) {
    $("#blocked_blogs > .accordion_content > .block-input > .text > #block").val(blog);
    setTimeout(function () {
        $("#blocked_blogs > .accordion_content > .block-input > .block-button").click();
    }, 500);
}

var activate = function () {
    console.log ("activate");
	var usersToBeBlockedStr = window.prompt("Please input comma separated list of users to be blocked","");
	var usersToBeBlocked = usersToBeBlockedStr.split(",");

	openBlockList();

	// we will be watching the blockListContainer for changes
	var blockListContainer = $('#blocked_blogs > div.accordion_content');

	// i don't know if i need all this to do what i need to do
	// TODO: determine what to keep and what to trim
	var mutationObserverConfig = { attributes: true, childList: true, subtree: true };

	var mutationObserverCallback = function (mutationsList, observer) {
		for (var mutation of mutationsList) {
			if (mutation.type == 'childList') {
				if (mutation.target.classList[0] == "error_tag") {
					console.log("Error");
				}
				else if (mutation.addedNodes.length > 0) {
					if ((mutation.addedNodes[0]).getAttribute('data-tumblelog') !== null) {
						console.log("Added to blocklist: " + (mutation.addedNodes[0]).getAttribute('data-tumblelog'));
					}
				}
				else if (mutation.removedNodes.length > 0) {
					if ((mutation.removedNodes[0]).getAttribute('data-tumblelog') !== null) {
						console.log("Removed from blocklist: " + (mutation.removedNodes[0]).getAttribute('data-tumblelog'));
					}
				}
			}
		}
	};

	var observer = new MutationObserver(mutationObserverCallback);

	// in the console you don't need [0], but in the extension you do... a frustrating adventure in troubleshooting
	observer.observe(blockListContainer[0], mutationObserverConfig);

    var i = 0;
    var inter = setInterval (function () {
        console.log (i + " -- " + usersToBeBlocked[i]);
        block(usersToBeBlocked[i++]);
        if (i >= usersToBeBlocked.length) {
            clearInterval(inter);
            console.log ("exit");
        }
    }, 1100);

	// observer.disconnect() // this is disabled because it triggers before any of the blocking happens
}

activate ();
