<?php
/**
 * This file is part of the Nanogong plugin for TinyMCE editor for Moodle - http://moodle.org/.
 *
 * @package tinymce
 * @subpackage nanogong
 * @copyright 2012 Margaret Dulat, Capilano University Educational Technology Resource Centre
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 * Moodle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Moodle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Moodle. If not, see <http://www.gnu.org/licenses/>.
 */

require_once("../../../../../../../config.php");
require_once("$CFG->libdir/filelib.php");

$elname = required_param('elname', PARAM_TEXT);
$itemid = required_param('itemid', PARAM_INT);

// TO DO later: insert fields for "save as" and "license", like in filepicker
$saveas_filename = time();
$maxbytes = -1;
$usercontext = context_user::instance($USER->id);

$record = new object;
$record->userid = $USER->id;
$record->contextid = $usercontext->id;
$record->filearea = 'draft';
$record->component = 'user';
$record->filepath = '/';
$record->itemid = $itemid;

$fs = get_file_storage();

if (!isset($_FILES[$elname])) {
    throw new moodle_exception('nofile');
}
if (!empty($_FILES[$elname]['error'])) {
    throw new moodle_exception('error');
}

if (empty($saveas_filename)) {
    $record->filename = clean_param($_FILES[$elname]['name'], PARAM_FILE);
} else {
    $ext = '';
    $match = array();
    $filename = clean_param($_FILES[$elname]['name'], PARAM_FILE);
    if (preg_match('/\.([a-z0-9]+)$/i', $filename, $match)) {
        if (isset($match[1])) {
            $ext = $match[1];
        }
    }
    $ext = !empty($ext) ? $ext : '';
    if (preg_match('#\.(' . $ext . ')$#i', $saveas_filename)) {
        // saveas filename contains file extension already
        $record->filename = $saveas_filename;
    } else {
        $record->filename = $saveas_filename . '.' . $ext;
    }
}

if (($maxbytes!==-1) && (filesize($_FILES[$elname]['tmp_name']) > $maxbytes)) {
    throw new file_exception('maxbytes');
}

if ($stored_file = $fs->create_file_from_pathname($record, $_FILES[$elname]['tmp_name'])) {
    $draftitemid = file_get_submitted_draft_itemid($elname);
   
    print moodle_url::make_draftfile_url($itemid, $stored_file->get_filepath(), $stored_file->get_filename())->out();
} else {
    print '';
}
