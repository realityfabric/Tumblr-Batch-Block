// expandBlockList clicks the button which opens the blocklist
// Then it clicks the 'Show More' button until it is no longer visible
// The 'Show More' button still exists, and will loop through the block list if you continue to click it.
var expandBlockList = function (callback) {
    $('document').ready( function () {
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

expandBlockList(function() {
    var blocklist = JSON.stringify(getBlockList());

    blocklist = blocklist.replace('[','');
    blocklist = blocklist.replace(']','');

    while (blocklist.indexOf('\"') !== -1) {
		blocklist = blocklist.replace('\"','');
	}

    // create a text area and insert it at the top of the sidebar
    var right_column = document.getElementById('right_column');
    var blockListTextArea = document.createElement('textarea');
    blockListTextArea.setAttribute('id', 'blocklist');
    blockListTextArea.style.background = 'white';
    right_column.insertBefore(blockListTextArea, right_column.firstChild);

    blockListTextArea.innerText = blocklist;
});
