// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*************************************************************************************
 * This file is part of the Nanogong plugin for tinyMCE
 * Author: Margaret Dulat, Capilano University Educational Technology Resource Centre
 ************************************************************************************/
tinyMCEPopup.requireLangPack();
var url;
var NanogongDialog = {
	init : function() {
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
        var r = tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<nanogong caption="'+form.caption.value+'" url = "'+ret+'"><img src="'+url+'/img/icon.gif" alt="nanogong_sound_placeholder" /></nanogong>');

		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(NanogongDialog.init, NanogongDialog);