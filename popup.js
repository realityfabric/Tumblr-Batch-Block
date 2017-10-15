document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('blockButton').addEventListener('click',
		function () {
			chrome.tabs.executeScript(null, {file: "jquery.min.js"},
				function () {
                    chrome.tabs.executeScript(null, {file: "contentscript.js"});
                }
            );
        }
    );

    document.getElementById('exportBlockListButton').addEventListener('click',
		function () {
			chrome.tabs.executeScript(null, {file: 'jquery.min.js'},
				function () {
					chrome.tabs.executeScript(null, {file: 'export.js'});
				}
			);
		}
	);
});
