var openBlockList = function (blog) {
        $('document').ready( function () {
            $("#blocked_blogs > .accordion_trigger_wrapper > .accordion_trigger").click();
            block(blog);
        });
}

var block = function (blog) {
    $("#blocked_blogs > .accordion_content > .block-input > .text > #block").val(blog);
    setTimeout(function () {
        $("#blocked_blogs > .accordion_content > .block-input > .block-button").click();
    }, 500);
}

var str = window.prompt("Please input comma separated list of users to be blocked","");
var str = str.replace(" ", "");

var arr = str.split(",");

// expandBlockList clicks the button which opens the blocklist
// Then it clicks the 'Show More' button until it is no longer visible
// The 'Show More' button still exists, and will loop through the block list if you continue to click it.
// TODO: this was copied as a part of a hotfix from export.js
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
// TODO: this was copied as a part of a hotfix from export.js
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

// removes blogs that are already blocked from list to be blocked
// newBlocks: array of blogs to be blocked
// TODO: return list of duplicates
var cleanBlocklist = function (newBlocks) {
    var existingBlocks = getBlockList();
    var uniqueBlocks = [];

    // https://stackoverflow.com/a/9229932
    $.each(newBlocks, function(i, el) {
        // if the element doesn't already exist in uniqueBlocks, add it
        if($.inArray(el, existingBlocks) === -1) {
            uniqueBlocks.push(el);
        }
    });

    var reallyUniqueBlocks = [];

    $.each(uniqueBlocks, function (i, el) {
        if($.inArray(el, reallyUniqueBlocks) === -1) {
            reallyUniqueBlocks.push(el);
        }
    });

    return reallyUniqueBlocks;
}

// returns the username at the top of the block list
// this should be the last user who was blocked
var getLastBlockedUser = function () {
    blog = $("li.avatar_container:nth-child(1)");
    blog_name = blog.getAttribute("data-tooltip");

    return blog_name;
}

var activate = function () {
    console.log ("activate");

    expandBlockList(function() {
        arr = cleanBlocklist(arr);

        openBlockList(arr[0]);

        var i = 1;
        var inter = setInterval (function () {
            console.log (i + " -- " + arr[i]);
            block(arr[i++]);
            if (i >= arr.length) {
                clearInterval(inter);
                console.log ("exit");
            }
        }, 1100);
    });
}

activate ();
