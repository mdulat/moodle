tinyMCEPopup.requireLangPack();
var itemid;
var NanogongDialog = {
	init : function() {
		var f = document.forms[0];
		itemid = tinyMCEPopup.getWindowArg('itemid');
	},

	insert : function() {
	    var form = document.forms[0];
        
        // Find the applet object
        var applet = document.getElementById("nanogong");
    
        // Tell the applet to post the voice recording to the 
        // backend PHP code
        
        //alert(itemid);
        var ret = applet.sendGongRequest( "PostToForm", "ngupload.php?elname=voicefile&itemid="+itemid, "voicefile", "", "temp");
        if (ret == null || ret == "")
            alert("Failed to submit the voice recording!");
        else {
	        //alert("inserting " + ret);
	        tinyMCEPopup.editor.execCommand('mceInsertContent', true, '<nanogong caption="'+form.caption.value+'" url = "'+ret+'"></nanogong>');
	    }
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(NanogongDialog.init, NanogongDialog);