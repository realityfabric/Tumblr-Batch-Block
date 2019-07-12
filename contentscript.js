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
	var str = window.prompt("Please input comma separated list of users to be blocked","");
	var str = str.replace(" ", "");
	var arr = str.split(",");

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
}

activate ();
