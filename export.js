// expandBlockList clicks the button which opens the blocklist
// Then it clicks the 'Show More' button until it is no longer visible
// The 'Show More' button still exists, and will loop through the block list if you continue to click it.
var expandBlockList = function () {
    $('document').ready( function () {
        $("#blocked_blogs > .accordion_trigger_wrapper > .accordion_trigger").click();

        var expandInterval = setInterval(function() {
            if ($('#blocked_blogs > div.accordion_content.show > button').is(':visible')) {
                $('#blocked_blogs > div.accordion_content.show > button').click();
            } else {
                clearInterval(expandInterval);
                alert('COMPLETE');
            }
        }, 500);
    });
}
