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

var activate = function () {
    console.log ("activate");
	var usersToBeBlockedStr = window.prompt("Please input comma separated list of users to be blocked","");
	var usersToBeBlockedStr = usersToBeBlockedStr.replace(" ", "");
	var usersToBeBlocked = usersToBeBlockedStr.split(",");

	openBlockList(usersToBeBlocked[0]);

    var i = 1;
    var inter = setInterval (function () {
        console.log (i + " -- " + usersToBeBlocked[i]);
        block(usersToBeBlocked[i++]);
        if (i >= usersToBeBlocked.length) {
            clearInterval(inter);
            console.log ("exit");
        }
    }, 1100);
}

activate ();
