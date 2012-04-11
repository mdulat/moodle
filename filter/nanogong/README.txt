Nanogong filter for Moodle
Version 2.0
Requires Moodle 2.0 or higher
Created by Margaret Dulat and Capilano University Educational Technology Resource Centre
Nanogong resource from http://gong.ust.hk/nanogong/

Files Located in:
------------------
Nanogong filter files:
moodle/filter/nanogong

Modified Moodle core file:
moodle/lib/weblib.php


To Install:
--------------
- copy the nanogong filter files into moodle/filter/nanogong
- apply the patch filter_nanogong.patch
- enable it from "Site administration/Plugins/Filters/Manage filters"

What it Does:
-------------
Before displaying content, all <nanogong> tags are converted into an image placeholder with optional caption next to it. When the user clicks on the icon, an embedded nanogong player is loaded with the sound file at the given url. 
Attributes for the <nanogong> tag include:
caption: to display next to the sound icon
url: location of sound file to load into the nanogong player

This filter is required for use with the Nanogong plugin for TinyMCE and other plugins/modules that output the <nanogong> tag.

Changes made to core files:
---------------------------
moodle/lib/weblib.php
    in purify_html function,
    in condition if ($def = $config->maybeGetRawHTMLDefinition()),
    add: 
    // add nanogong element
    $def->addElement('nanogong', 'Inline', 'Empty', array(), array('caption'=>'CDATA', 'url'=>'URI'));

