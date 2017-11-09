var Immunology = Immunology || {};
Immunology.Common = Immunology.Common || {};

(function (module) {
	"use strict";
	var counter = 0;
	module.waitDialog = null;

	/*=========================================================================
	Description: Show wait dialogue after scripts are loaded
	Input Parameters: Message to display
	Output: None
	=========================================================================*/
	module.showWaitDialogScriptsLoaded = function (message) {
		if (module.waitDialog == null) {
			if (!message) {
				message = 'Loading...';
			}
			module.waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(message, 'Please wait...');
		}
	};

	/*=========================================================================
	Description: Method to show error messages to user
	Input Parameters: Message to display
	Output: None
	=========================================================================*/
	module.showErrorMessage = function (message) {
		counter = 0;
		if (module.waitDialog != null) {
			module.waitDialog.close();
			module.waitDialog = null;
		}
		//Ensure ULS logging is enabled
		ULS.enable = true;
		//Log to SharePoint ULS logs
		ULSSendExceptionImpl(message, location.href, 0, '');
		alert(message);
	};

	/*=========================================================================
	Description: Check and close wait dialogue is all requests are complete
	Input Parameters: None
	Output: None
	=========================================================================*/
	module.checkAndCloseWaitDialog = function () {
		try {
			counter--;
			if (counter <= 0 && module.waitDialog != null) {
				module.waitDialog.close();
				module.waitDialog = null;
				counter = 0;
			}
		} catch (ex) {
			module.showErrorMessage(ex.message);
		}
	};

	/*=========================================================================
	Description: Check and show the wait dialogue
	Input Parameters: Message to display
	Output: None
	=========================================================================*/
	module.checkAndShowWaitDialog = function (message) {
		try {
			counter++;
			//SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
			//if (counter > 0) {
			showWaitDialogScriptsLoaded(message);
			//}
			//});
		} catch (ex) {
			module.showErrorMessage(ex.message);
		}
	};

	module.getParameterByName = function (name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	module.ShowWaitScreen = function () {
        EnsureScript('sp.ui.dialog.js', typeof (SP.UI.ModalDialog), function () {
            module.waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('WORKING ON IT...');
        });
    };

    module.CloseWaitDialog = function () {
        if (typeof (module.waitDialog) != 'undefined' && module.waitDialog != null) {
            module.waitDialog.close();
            module.waitDialog = null;
        }
	};
	
	module.DateFormatter = function(DateString){
		var DateFormat = new Date(DateString);
		return DateFormat.format("MM-dd-yyyy");
	}

})(Immunology.Common);
