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
 * These functions are used with the nanogong filter. Each instance of the nanogong
 * placeholder will have an onclick event handler attached. Only one nanogong player will be 
 * displayed on a page at any given time.
 *
 * @package    filter
 * @subpackage nanogong
 * @copyright  2012 Margaret Dulat, Capilano University Educational Technology Resource Centre
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// This file will be called many times if multiple nanogongs on a page
var $ = jQuery.noConflict();

// initialize only once
if (typeof current_loaded == 'undefined') {
    current_loaded = -1;
}

// wait until document elements are loaded
$(document).ready(init);

function init() {
    // find all nanogong icon containers
    var nanogongs = $('span').filter(function() {
            return this.id.match(/^nanogong_icon_container_\d*/);
        });
    
    nanogongs.each(initialize_nanogong_container);  
       
    // if this is the first nanogong, add the applet container and applet
    if(nanogongs.length > 0 && $('#nanogong_applet_container_for_embed').length == 0) {
        var archive = $('.nanogong_archive').first().attr('value');
        
        // check installed JRE versions - must be >= 1.4.2
        var jres = deployJava.getJREs();
        var jre_ok = false;
        var i;
        for(i = 0; i < jres.length; i++) {
            if(jres[i] == "1.5.0" || jres[i] == "1.5.0_01" || jres[i] == "1.5.0_02") // incompatible versions
                continue;
            if(parseInt(jres[i].charAt(0)) > 1) {
                jre_ok = true;
                break;
            }
            if(parseInt(jres[i].charAt(0)) == 1 && parseInt(jres[i].charAt(2)) > 4) {
                jre_ok = true;
                break;
            }
            if(parseInt(jres[i].charAt(0)) == 1 && parseInt(jres[i].charAt(2)) == 4 && parseInt(jres[i].charAt(4)) >= 2) {
                jre_ok = true;
                break;
            }
        }

        if(jre_ok) {
            $(nanogongs).first().after('\
                <span id="nanogong_applet_container_for_embed" style="position:relative; top:15px; display:none">\
                    <applet id="embedded_nanogong_player" archive="nanogong.jar" codebase="' + archive + '" code="gong.NanoGong" width="130px" height="40px">\
                        <param name="ShowTime" value="true" />\
                        <param name="ShowAudioLevel" value="false" />\
                        <param name="ShowRecordButton" value="false" />\
                    </applet>\
                </span>\
            ');
        }
        else { // updated JRE must be installed
            if(confirm("The NanoGong sound applet on this page will not work with the currently installed Java version. Do you wish to upgrade Java to the newest version now?")) {
                deployJava.installLatestJRE();
            }
        }
    }

}


function remove_scrollbars() {
    $(this).css('overflow', 'visible');
}

// makes sure no scrollbars appear next to nanogong
function initialize_nanogong_container() {
    $(this).parent().parent().parent().parent().find('*').each(remove_scrollbars);
}

// this is not a jQuery function
function hide_nanogong_applet(id) {
    $('#nanogong_applet_container_for_embed').hide();
}

// this is not a jQuery function
function show_nanogong_applet(id, url) {
    $('#nanogong_applet_container_for_embed').insertAfter("#nanogong_icon_container_"+id);
    current_loaded = id;
    
    if($('#nanogong_applet_container_for_embed').is(':hidden'))
        $('#nanogong_applet_container_for_embed').show();
        
    document.getElementById("embedded_nanogong_player").sendGongRequest("LoadFromURL", url);
}

function is_nanogong_visible(id) {
    return $('#nanogong_applet_container_for_embed').css('display') == 'inline' && id == current_loaded;
}

// this is not a jQuery function
function onclick_nanogong_applet(id, url) {
    // always shows the applet, i.e. toggling is not possible due to limitations of loading 
    // the plugin file from url without re-sending all details required by Moodle, which nanogong
    // applet has no access to
    show_nanogong_applet(id, url);
}




