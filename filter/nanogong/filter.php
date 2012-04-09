<?php 
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

/**
 *  Nanogong plugin filtering
 *
 *  This filter will replace any <nanogong> tags with
 *  an image placeholder which when clicked, loads a nanogong
 *  player with the sound file at the given url
 *
 * @package    filter
 * @subpackage nanogong
 * @copyright  2012 Margaret Dulat, Capilano University Educational Technology Resource Centre
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

class filter_nanogong extends moodle_text_filter {

    function filter($text, array $options = array()) {
        global $CFG;

        $nanogong_script = "";
     
        // find nanogong tags
        $search = '/(<nanogong.*?>\s*)+/is';
        if (preg_match($search, $text) ) { 
            
            // remove icon placeholder and closing </nanogong> tags
            $text = preg_replace('/(<img.*alt="nanogong_sound_placeholder" \/>)+/is', "", $text);
            $text = preg_replace('/(<\/nanogong>\s*)+/is', "", $text);
            
            // replace each instance of <nanogong> with embedded nanogong player
            return preg_replace_callback($search, 'nanogong_filter_callback', $text);
        }
        else
            return $text;
    }
}

/* replaces an instance of <nanogong> with embedded player. Finds url to sound file, 
 * as well as optional caption
 */
function nanogong_filter_callback($nanogong_tag) {
    global $CFG;
    global $PAGE;

    static $nanogong_index = 0;
    
    // Cannot cache a nanogong filter
    $PAGE->set_cacheable(false);

    $search = '/caption="([^"]*)"/is';
    preg_match_all($search, $nanogong_tag[0], $matches, PREG_SET_ORDER);
    $caption = (isset($matches[0][1]))? $matches[0][1] : null;
    $matches = null;

    $search = '/url="([^"]*)"/is';
    preg_match_all($search, $nanogong_tag[0], $matches, PREG_SET_ORDER);
    $url = (isset($matches[0][1]))? $matches[0][1] : null;
    $matches = null;
    
    if ($caption == null) $caption = "";

    $nanogong_span = <<<NANOGONG_SPAN
    <script type="text/javascript" src="{$CFG->wwwroot}/filter/nanogong/js/jquery.js"></script>
    <script type="text/javascript" src="{$CFG->wwwroot}/filter/nanogong/js/filter.js"></script>
    
    <span id="nanogong_icon_container_$nanogong_index" style="font-size:7pt; font-weight:bold; text-decoration:none; color:black; cursor: pointer;" onclick = "javascript: onclick_nanogong_applet('$nanogong_index', '$url')">
        <input type="hidden" class="nanogong_archive" id="archive_$nanogong_index" value="{$CFG->wwwroot}/filter/nanogong/resource/nanogong.jar" />
        <img id="nanogong_img_$nanogong_index" alt="Show/Hide NanoGong" src="{$CFG->wwwroot}/filter/nanogong/pix/sound.gif" />
        $caption
    </span>
NANOGONG_SPAN;

    $nanogong_index++;
    return $nanogong_span;
}

