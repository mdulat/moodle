tinyMCEPopup.requireLangPack();

var NanogongDialog = {
	init : function() {
		//var f = document.forms[0];

		// Get the selected contents as text and place it in the input
		//f.someval.value = tinyMCEPopup.editor.selection.getContent({format : 'text'});
		//f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');
	},

	insert : function() {
	    var form = document.forms[0];
	    
	    // Insert the recorded sound into the document
        //var url = form.filename.value;
        //var linkname = url.substring(url.lastIndexOf('/')+1);
        //var linktag = '<a href="'+f.src.value+'">'+linkname+'</a>';
        
        // Find the applet object
        var applet = document.getElementById("nanogong");
    
        // Tell the applet to post the voice recording to the 
        // backend PHP code
        var ret = applet.sendGongRequest( "PostToForm", "ngupload.php", "repo_upload_file", "", "temp");
        if (ret == null || ret == "")
            alert("Failed to submit the voice recording!");
        else 
            //tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<p><a href="'+ret+'"><img src="/moodle/lib/editor/tinymce/tiny_mce/3.4.9/plugins/nanogong/img/icon.gif" alt="sound file" /></a>'+form.caption.value+'</p>');
	    
	        tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<nanogong caption="'+form.caption.value+'" url = "'+ret+'" />');
	    
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(NanogongDialog.init, NanogongDialog);
