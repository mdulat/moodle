<?php  // $Id: filter.php,v 4.1 2011/02/20 00:00:00 gibson Exp $

defined('MOODLE_INTERNAL') || die();

class filter_nanogong extends moodle_text_filter {
    static $loaded = false;
    function filter($text, array $options = array()) {
        global $CFG;

        $nanogong_script = "";
        
        $search = '/(<nanogong.*?>\s*)+/is';
        if (preg_match($search, $text) ) { 
            if(!self::$loaded) {
                $nanogong_script = <<<NANOGONG_SCRIPT
    <script type="text/javascript" src="{$CFG->wwwroot}/filter/nanogong/jquery.js"></script>
    <script language="Javascript" type="text/javascript">
        var current_nanogong_id = -1;
        var loaded_nanogong_id = -1;
        
        function set_nanogong_visible(visible) {
            var container = document.getElementById("nanogong_applet_container_for_embed");
            if (visible)
                container.style.visibility = "visible";
            else
                container.style.visibility = "hidden";
        }
        
        function show_nanogong_applet(obj, id, url) {
          if (current_nanogong_id != id) {
            $("#nanogong_applet_container_for_embed").insertAfter("#nanogong_span_"+id);
            current_nanogong_id = id;
          }
          
          set_nanogong_visible(true);
          
          if(loaded_nanogong_id != id) {
                document.getElementById("embedded_nanogong_player").sendGongRequest("LoadFromURL", url);
                loaded_nanogong_id = id;
            }
        }
        
        function is_nanogong_applet_visible() {
            return $("#nanogong_applet_container_for_embed").css("visibility") == "visible";
        }
        
        function onclick_nanogong_applet(obj, id, url) {
            obj.parentNode.parentNode.style.overflow = "visible";
            if (current_nanogong_id == id && is_nanogong_applet_visible())
                set_nanogong_visible(false);
            else
                show_nanogong_applet(obj, id, url);
        }
    </script>   
    
    <span id="nanogong_applet_container_for_embed" style="visibility:hidden; position:relative; top:15px;">
        <applet id="embedded_nanogong_player" archive="{$CFG->wwwroot}/filter/nanogong/nanogong.jar" code="gong.NanoGong" width="130px" height="40px">
            <param name="ShowTime" value="true" />
            <param name="ShowAudioLevel" value="false" />
            <param name="ShowRecordButton" value="false" />
        </applet>
    </span>    
    
NANOGONG_SCRIPT;
                self::$loaded = true;
            }
            
            // remove icon placeholder and closing </nanogong> tags
            $text = preg_replace('/(<img.*alt="nanogong_sound_placeholder" \/>)+/is', "", $text);
            $text = preg_replace('/(<\/nanogong>\s*)+/is', "", $text);
            
            // concatenate $nanogong_script with filtered text
            //return $nanogong_script.preg_replace_callback($search, 'nanogong_filter_callback', $text);
            return preg_replace_callback($search, 'nanogong_filter_callback', $text);
        }
        else
            return $text;
    }
}

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
    <script type="text/javascript" src="{$CFG->wwwroot}/filter/nanogong/jquery.js"></script>
    <script type="text/javascript" src="{$CFG->wwwroot}/filter/nanogong/filter.js"></script>
    
    <span id="nanogong_icon_container_$nanogong_index" style="font-size:7pt; font-weight:bold; text-decoration:none; color:black;" onclick = "javascript: onclick_nanogong_applet('$nanogong_index', '$url')">
        <input type="hidden" class="nanogong_archive" id="archive_$nanogong_index" value="{$CFG->wwwroot}/filter/nanogong/nanogong.jar" />
        <img id="nanogong_img_$nanogong_index" alt="Show/Hide NanoGong" src="{$CFG->wwwroot}/filter/nanogong/pix/sound.gif" />
        $caption
    </span>
NANOGONG_SPAN;

    $nanogong_index++;
    return $nanogong_span;
}

