var openBlockList = function () {
	$('document').ready( function () {
		$("#blocked_blogs > .accordion_trigger_wrapper > .accordion_trigger").click();
	});
}

var block = function (blog) {
    $("#blocked_blogs > .accordion_content > .block-input > .text > #block").val(blog);
    $("#blocked_blogs > .accordion_content > .block-input > .block-button").click();
}

/* activate
 * blocks an array of users
 * @usersToBeBlocked an array of usernames (should be prestripped of already blocked users)
 */
var activate = function (usersToBeBlocked) {
    console.log ("activate");

	// we will be watching the blockListContainer for changes
	var blockListContainer = $('#blocked_blogs > div.accordion_content.show');

	// i don't know if i need all this to do what i need to do
	// TODO: determine what to keep and what to trim
	var mutationObserverConfig = { attributes: true, childList: true, subtree: true };

	var i = 0;
	var mutationObserverCallback = function (mutationsList, observer) {
		for (var mutation of mutationsList) {
			if (mutation.type == 'childList') {
				if (mutation.target.classList[0] == "error_tag") {
					console.log("Error on " + usersToBeBlocked[i]);
					block(usersToBeBlocked[++i]);
				}
				else if (mutation.addedNodes.length > 0) {
					var tumblelog = (mutation.addedNodes[0]).getAttribute('data-tumblelog');
					if (tumblelog !== null) {
						if (i == 0 && tumblelog == usersToBeBlocked[0]) {
							console.log("Added to blocklist: " + tumblelog);
							block(usersToBeBlocked[++i]);
						} else if (i !== 0) {
							console.log("Added to blocklist: " + tumblelog);
							block(usersToBeBlocked[++i]);
						}
					}
				}
			}
		}

		// this seems like it listens for one element extra, but i'm not sure
		if (i > usersToBeBlocked.length) {
			observer.disconnect();
		}
	};

	var observer = new MutationObserver(mutationObserverCallback);

	// in the console you don't need [0], but in the extension you do... a frustrating adventure in troubleshooting
	observer.observe(blockListContainer[0], mutationObserverConfig);
	// trigger a cascade of MutationObserver events (starts iteration through the blocklist)
	block(usersToBeBlocked[0]);
}

// expandBlockList clicks the button which opens the blocklist
// Then it clicks the 'Show More' button until it is no longer visible
// The 'Show More' button still exists, and will loop through the block list if you continue to click it.
var expandBlockList = function (callback) {
    $('document').ready(function () {
		$("#blocked_blogs > .accordion_trigger_wrapper > .accordion_trigger").click();

		var expandInterval = setInterval(function() {
			if ($('#blocked_blogs > div.accordion_content.show > button').is(':visible')) {
				$('#blocked_blogs > div.accordion_content.show > button').click();
			} else {
				clearInterval(expandInterval);
				callback();
			}
		}, 500);
    });
}

// getBlockList gathers all the blog names in a user's block list
// It returns the list as an array
var getBlockList = function () {
    var i = 1;
    var blocklist = [];

    var blog = jQuery('#blocked_blogs > div.accordion_content.show > ul > li:nth-child(' + i++ + ') > div.blog-info > a.name');

    while (blog !== undefined && blog[0] !== undefined) {
        blocklist.push(blog[0].innerText);

        var blog = jQuery('#blocked_blogs > div.accordion_content.show > ul > li:nth-child(' + i++ + ') > div.blog-info > a.name');
    }

    return blocklist;
}

// get list of users who will be blocked
var usersToBeBlockedStr = window.prompt("Please input comma separated list of users to be blocked","");
// convert user input to array
var usersToBeBlocked = usersToBeBlockedStr.split(",");
// trim whitespace (necessary for filtering)
for (var index = 0; index < usersToBeBlocked.length; index++) {
	usersToBeBlocked[index] = usersToBeBlocked[index].trim();
}
expandBlockList(function() {
	// get list of users who are already blocked
    var blockedUsers = JSON.stringify(getBlockList());
	// remove already blocked users from user input
	usersToBeBlocked = usersToBeBlocked.filter(user => !(blockedUsers.includes(user)));

	activate(usersToBeBlocked);
});

