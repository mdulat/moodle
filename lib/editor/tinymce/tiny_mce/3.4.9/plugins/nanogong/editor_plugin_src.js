/**
 * editor_plugin_src.js
 *
 * This plugin allows users to record and insert Nanogong sound objects
 * Author: Margaret Dulat, Capilano University Educational Technology Resource Centre
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
    var Node = tinymce.html.Node;

	tinymce.create('tinymce.plugins.NanogongPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use 
		 * the onInit event of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
		    var self = this;                
            this.editor = ed;
            this.url = url;
            
            ed.onPreInit.add(function() {
                // Allow nanogong tags
                ed.schema.addValidElements('nanogong[caption|url]');
            });
			
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceNanogong');
			ed.addCommand('mceNanogong', function() {
				ed.windowManager.open({
					file : url + '/dialog.htm',
					width : 220,
					height : 220,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
					editor : ed
				});
			});

			// Register nanogong button
			ed.addButton('nanogong', {
				title : 'nanogong.desc',
				cmd : 'mceNanogong',
				image : url + '/img/icon.gif'
			});

		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Nanogong plugin',
				author : 'Margaret Dulat',
				authorurl : '',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/nanogong',
				version : "2.0"
			};
		}
	});
            
	// Register plugin
	tinymce.PluginManager.add('nanogong', tinymce.plugins.NanogongPlugin);
})();