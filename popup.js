document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', 
		function () { 
			chrome.tabs.executeScript(null, {file: "jquery.min.js"}, 
				function () {
					chrome.tabs.executeScript(null, {file: "contentscript.js"}); 
				}
			);
		}
	);
});
