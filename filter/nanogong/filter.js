// This file will be called many times if multiple nanogongs on a page
var $ = jQuery.noConflict();

// only initialize these once
if (typeof hidden_nanogong_container == 'undefined') {
    hidden_nanogong_container = new Array();
}
if (typeof hidden_nanogong_applet == 'undefined') {
    is_sound_loaded = new Array();
}

// wait until document elements are loaded
$(document).ready(init);

function init() {
    // initialize each nanogong applet container
    $('span').filter(function() {
            return this.id.match(/^nanogong_applet_container_for_embed_\d*/);
        }).each(initialize_nanogong_container);  
}

function remove_scrollbars() {
    $(this).parent().parent().css('overflow', 'visible');
}

function initialize_nanogong_container() {
    // extract id number
    var id = $(this).attr('id').substring(36);
    
    // make sure this one has not already been initialized
    if(!(id in is_sound_loaded)) {
        // make sure no scrollbars appear next to nanogong
        $(this).parent().parent().css('overflow', 'visible');
        
        hide_nanogong_applet(id);
        is_sound_loaded[id] = false;
    }
};

// this is not a jQuery function
function hide_nanogong_applet(id) {
    hidden_nanogong_container[id] = $('#nanogong_applet_container_for_embed_'+id).detach();
};

// this is not a jQuery function
function show_nanogong_applet(id, url) {
    hidden_nanogong_container[id].insertAfter("#nanogong_span_"+id);
    hidden_nanogong_container[id] = null;
    
    // if sound not already loaded, load it
//    if(!is_sound_loaded[id]) {
        document.getElementById("embedded_nanogong_player_"+id).sendGongRequest("LoadFromURL", url);
        is_sound_loaded[id] = true;
//    }
}

function is_nanogong_visible(id) {
    return hidden_nanogong_container[id] == null;
}

// toggles nanogong applet
// this is not a jQuery function
function onclick_nanogong_applet(id, url) {
    if (is_nanogong_visible(id)) {
        hide_nanogong_applet(id);
    } else {
        show_nanogong_applet(id, url);
    }
}





