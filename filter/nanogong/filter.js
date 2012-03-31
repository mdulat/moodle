// This file will be called many times if multiple nanogongs on a page
var $ = jQuery.noConflict();

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
        $(nanogongs).first().after('\
            <span id="nanogong_applet_container_for_embed" style="position:relative; top:15px; display:none">\
                <applet id="embedded_nanogong_player" archive="' + archive + '" code="gong.NanoGong" width="130px" height="40px">\
                    <param name="ShowTime" value="true" />\
                    <param name="ShowAudioLevel" value="false" />\
                    <param name="ShowRecordButton" value="false" />\
                </applet>\
            </span>\
        ');

    }

}


function remove_scrollbars() {
    $(this).css('overflow', 'visible');
}

function initialize_nanogong_container() {
    // make sure no scrollbars appear next to nanogong
    $(this).parent().parent().parent().parent().find('*').each(remove_scrollbars);
}

// this is not a jQuery function
function hide_nanogong_applet(id) {
    //hidden_applet_container[id] = $('#nanogong_applet_container_for_embed_'+id).detach();
    $('#nanogong_applet_container_for_embed').hide();
}

// this is not a jQuery function
function show_nanogong_applet(id, url) {
   // hidden_applet_container[id].insertAfter("#nanogong_icon_container_"+id);
    //hidden_applet_container[id] = null;
   // if(id != current_loaded) {
        $('#nanogong_applet_container_for_embed').insertAfter("#nanogong_icon_container_"+id);
        current_loaded = id;
   // }
    
    $('#nanogong_applet_container_for_embed').show();
    document.getElementById("embedded_nanogong_player").sendGongRequest("LoadFromURL", url);
}

function is_nanogong_visible(id) {
    return $('#nanogong_applet_container_for_embed').css('display') == 'inline' && id == current_loaded;
    //return hidden_applet_container[id] == null;
}

// toggles nanogong applet
// this is not a jQuery function
function onclick_nanogong_applet(id, url) {
//    if (is_nanogong_visible(id)) {
//        hide_nanogong_applet(id);
//    } else {
        show_nanogong_applet(id, url);
//    }
}




