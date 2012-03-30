/**
 * editor_plugin_src.js
 *
 * This plugin allows users to record and insert Nanogong sound objects
 * Author: Margaret Dulat
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
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
		    var self = this;                
            this.editor = ed;
            this.url = url;
            //JSON = tinymce.util.JSON;
            
 /*           function isNanogongImg(node) {
                return  ed.selection.getNode().nodeName == "IMG" && ed.dom.hasClass(node, 'mceItemNanogong');
            };
*/
            ed.onPreInit.add(function() {
                // Allow nanogong tags
                ed.schema.addValidElements('nanogong[caption|url]');
                
                // Convert nanogong elements to image placeholder
  /*              ed.parser.addNodeFilter('nanogong', function(nodes) {
                    var i = nodes.length;
                    while (i--) {
                        alert("obj to img: " + nodes[i].name);
                        self.objectToImg(nodes[i], ed, url);
                    }
                });
*/
                // Convert image placeholders to nanogong elements
             //   ed.serializer.addNodeFilter('img', function(nodes, name, args) {
             //       var i = nodes.length, node;
             //       while (i--) {
             //           if ((nodes[i].attr('class') || '').indexOf('mceItemNanogong') !== -1)
             //               self.imgToObject(nodes[i], args, ed);
             //       }
             //   });
                
            });
            
   /*          ed.onInit.add(function() {
                // Display "nanogong" instead of "img" in element path
               if (ed.theme && ed.theme.onResolveName) {
                    ed.theme.onResolveName.add(function(theme, path_object) {
                        if (path_object.name === 'img' && ed.dom.hasClass(path_object.node, 'mceItemNanogong'))
                            path_object.name = 'nanogong';
                    });
                }
    
                // Add context menu if it's loaded
                //if (ed && ed.plugins.contextmenu) {
                //    ed.plugins.contextmenu.onContextMenu.add(function(plugin, menu, element) {
                //        if (element.nodeName === 'IMG' && element.className.indexOf('mceItemNanogong') !== -1)
                //                menu.add({title : 'nanogong.edit', icon : 'nanogong', cmd : 'mceNanogong'});
                //    });
                //}
            });
*/
			
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
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		//createControl : function(n, cm) {
		//	return null;
		//},
		
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
				version : "1.0"
			};
		}
		
		/**
         * Converts the nanogong object to an img node.
         */
/*        objectToImg : function(data, ed, url) {
            img = ed.dom.create('img', {
                src: url +'/img/icon.gif',
                alt: 'mceItemNanogong'
                'class' : 'mceItemNanogong mceItem'
                
                'data-mce-json' : JSON.serialize(data, "'")
            });
        img.attr('src', url +'/img/icon.gif');
        img.attr('alt', 'mceItemNanogong');

            return img;
        },
*/
        /**
         * Converts a tinymce.html.Node image element to Google Maps data.
         */
/*        imgToObject : function(node, args, ed) {
        alert("Image to object");
            var value, data, dataSerialized, script, scriptInclude, div, divPlaceholder;

            dataSerialized = node.attr('data-mce-json');

            if (!dataSerialized)
                    return;
            
            data = JSON.parse(dataSerialized);

            width = parseInt(node.attr('width'));
            height = parseInt(node.attr('height'));
            
            if(width != NaN && width != data.width)
                    data.width = width;
            
            if(height != NaN && height != data.height)
                    data.height = height;
            
            // Add main div
            div = new Node('div', 1);
            div = div.attr('id', 'NanogongMainDiv');
            div.append(new Node('#cdata', 8)).value = 'data: ' + dataSerialized;    
            
            // Add map placeholder
            divPlaceholder = new Node('div', 1);
            divPlaceholder = divPlaceholder.attr('id', 'NanogongDiv');
            divPlaceholder = divPlaceholder.attr('style', 'text-align:center;background:#EFEFEF;width: ' + data.width + 'px; height: ' + data.height + 'px;');      
            div.append(divPlaceholder);
            
            // Replace img node
            node.replace(div);                      
        }
*/
        /**
         * Converts a tinymce.html.Node video/object/embed to an img element.
         *
         * The Google Maps data will be converted into an image placeholder with a JSON data attribute like this:
         * <img class="mceItemVisualAid mceItemGoogleMap" width="100" height="100" data-mce-json="{..}" />
         *
         * The JSON structure will be like this:
         * {'coords':'mycoords', 'width':'100', 'height':'100', 'zoom':'8', 'showScale':'false', 'mapType':'roadmap','controlStyle':'default','streetViewControl':'false'}
         */
        //objectToImg : function(node, ed) {
                //rawData = node.firstChild.value;
                //if(rawData.substring(0,7) == "data: {");
                //data = JSON.parse(rawData.substring(6));                      
                //node.replace(this.dataToImg(data, ed));
        //}



	});
            
	// Register plugin
	tinymce.PluginManager.add('nanogong', tinymce.plugins.NanogongPlugin);
})();