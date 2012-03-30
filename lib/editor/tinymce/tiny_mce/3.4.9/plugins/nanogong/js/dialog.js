tinyMCEPopup.requireLangPack();
var url;
var NanogongDialog = {
	init : function() {
		var f = document.forms[0];
		var editor = tinyMCEPopup.getWindowArg('editor');
		url = tinyMCEPopup.getWindowArg('plugin_url');
		
		// sets the correct itemid to 'itemid' hidden element in dialog
		editor.execCallback('nanogong_callback', 'itemid', window);		
	},

	insert : function() {
	    var form = document.forms[0];
        
        // Find the applet object
        var applet = document.getElementById("nanogong");
    
        // get the itemid needed for constructing the correct file record
        var itemid = form.elements['itemid'].value;

        // Tell the applet to post the voice recording to the backend PHP code
        var ret = applet.sendGongRequest( "PostToForm", "ngupload.php?elname=voicefile&itemid="+itemid, "voicefile", "", "temp");

        // insert nanogong object into editor's text area
        var r = tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<nanogong caption="'+form.caption.value+'" url = "'+ret+'">&nbsp;</nanogong>');

		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(NanogongDialog.init, NanogongDialog);