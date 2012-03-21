tinyMCEPopup.requireLangPack();
var editor;
var NanogongDialog = {
	init : function() {
		var f = document.forms[0];
		editor = tinyMCEPopup.getWindowArg('editor');
		//tinyMCEPopup.openBrowser('itemid', 'file', 'nanogong_file_browser_callback');
		
		editor.execCallback('nanogong_callback', 'itemid', window);
		
/*		var target_id = 'itemid';
		var type = 'file';
		var win = window;
		
		alert ("here");
        editor.YUI(editor.M.yui.loader).use('core_filepicker', function (Y) {
            alert("here 2");
            var editor_id = tinyMCE.selectedInstance.editorId;
            if (editor_id == 'mce_fullscreen') {
                editor_id = tinyMCE.selectedInstance.settings.elements;
            }
            var options = null;
            if (type == 'media') {
                // when mediaw button clicked
                options = M.editor_tinymce.filepicker_options[editor_id]['media'];
            } else if (type == 'file') {
                // when link button clicked
                options = M.editor_tinymce.filepicker_options[editor_id]['link'];
                alert(options);
            } else if (type == 'image') {
                // when image button clicked
                options = M.editor_tinymce.filepicker_options[editor_id]['image'];
            } 
    
            options.formcallback = M.editor_tinymce.filepicker_callback;
            options.editor_target = win.document.getElementById(target_id);
    
            M.core_filepicker.show(Y, options);
        });
*/		
	},

	insert : function() {
	    var form = document.forms[0];
        
        // Find the applet object
        var applet = document.getElementById("nanogong");
    
        
        // Tell the applet to post the voice recording to the backend PHP code
        
        //alert(itemid);
        var itemid = form.elements['itemid'].value;
        var ret = applet.sendGongRequest( "PostToForm", "ngupload.php?elname=voicefile&itemid="+itemid, "voicefile", "", "temp");
        //var ret = applet.sendGongRequest( "PostToForm", "#", "repo_upload_file", "", "temp");
        
    //    if (ret == null || ret == "")
    //        alert("Failed to submit the voice recording!");
    //    else {
	        //alert("inserting " + ret);
	        
	        
	        
	        tinyMCEPopup.editor.execCommand('mceInsertContent', true, '<nanogong caption="'+form.caption.value+'" url = "'+ret+'"></nanogong>');
	//    }
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(NanogongDialog.init, NanogongDialog);