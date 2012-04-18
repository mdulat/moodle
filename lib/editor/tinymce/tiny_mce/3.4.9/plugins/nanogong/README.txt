Nanogong plugin for TinyMCE in Moodle
Version 2.0
Requires Moodle 2.0 or higher
Created by Margaret Dulat and Capilano University Educational Technology Resource Centre

Requires:
---------
Nanogong filter version 2.0 or higher
moodle/repository/
moodle/repository/upload/


Files Located in:
------------------
Nanogong plugin files:
moodle/lib/editor/tinymce/tiny_mce/{version}/plugins/nanogong/

Modified TinyMCE core files:
moodle/lib/editor/tinymce/lib.php
moodle/lib/editor/tinymce/module.js
moodle/lib/editor/tinymce/tiny_mce/{version}/tiny_mce_src.js
moodle/lib/editor/tinymce/tiny_mce/{version}/tiny_mce.js
moodle/lib/editor/tinymce/lang/en/editor_tinymce.php


To Install:
--------------
- copy the nanogong plugin files to moodle/lib/editor/tinymce/tiny_mce/{version}/plugins/nanogong/
- apply the patch tinymce_plugin_nanogong.patch 


What it Does:
-------------
Adds a nanogong button to the tinyMCE editor functions (sound icon). When clicked, a dialog appears
with an embedded nanogong applet. The user can record a sound, then insert it into the editor. The 
resulting generated nanogong tag includes a sound icon placeholder for the editor. 

The nanogong filter is required to view the nanogong on the resulting page after saving.


Changes made to tinyMCE core files:
---------------------------
moodle/lib/editor/tinymce/lib.php
in function get_init_params:
    after initializing $filters variable,
    add:
    if (array_key_exists('filter/nanogong', $filters)) {
        $xnanogong = 'nanogong,';
    } else {
        $xnanogong = '';
    }
    
    in $params array, add:
    {$xnanogong} after {$xdragmath} in both places

    directly underneath (within nested-if):
    $params['file_browser_callback'] = "M.editor_tinymce.filepicker";
    add:
    // add callback function for nanogong plugin
    $params['nanogong_callback'] = "M.editor_tinymce.nanogong";

moodle/lib/editor/tinymce/module.js
    add:
    // callback for nanogong plugin
    M.editor_tinymce.nanogong = function(target_id, win) {
        YUI(M.yui.loader).use('core_filepicker', function (Y) {
            var editor_id = tinyMCE.selectedInstance.editorId;
            if (editor_id == 'mce_fullscreen') {
                editor_id = tinyMCE.selectedInstance.settings.elements;
            }
            var options = null;
            
            // use functions from filepicker
            options = M.editor_tinymce.filepicker_options[editor_id]['link'];
    
            options.formcallback = M.editor_tinymce.filepicker_callback;
            options.editor_target = win.document.getElementById(target_id);
    
            if (!M.core_filepicker.instances[options.client_id]) {
                M.core_filepicker.init(Y, options);
            }
    
            options.editor_target.value = options.itemid;
        });
    };
    
moodle/lib/editor/tinymce/tiny_mce/{version}/tiny_mce_src.js
    add nanogong to defaultWhiteSpaceElementsMap
    
moodle/lib/editor/tinymce/tiny_mce/{version}/tiny_mce.js
    simply needs to be re-compressed after tiny_mce_src.js is modified (http://javascriptcompressor.com/)
    
moodle/lib/editor/tinymce/lang/en/editor_tinymce.php
    add:
    $string['nanogong:desc'] = 'Record a sound';
    $string['nanogong_dlg:title'] = 'Nanogong';