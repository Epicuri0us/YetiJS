
/**
 * @class yAssetManager
 * @augments Class
 * @classdesc The asset manager is able to load different assets and cache them
 * 
 * @author Leo Zurbriggen
 * @property {Object[]} loadQueue - The queue array of files to load.
 * @property {Object[]} cache - The array of cached assets.
 * @property {Integer} progress - The count of assets loaded.
 * @property {Integer} IMAGE - 0.
 * @property {Integer} SOUND - 1.
 */
var yAssetManager = Class.extend({
	init: function(){
		this.loadQueue = [];
		this.cache = [];
		this.progress = 0;
		
		this.IMAGE = 0;
		this.SOUND = 1;
	},
	
	/**
	 * Returns the asset
	 * @memberOf yAssetManager
	 * @param {String} pPath - The path you loaded the asset from.
	 */
	getAsset: function(pPath){
		return this.cache[pPath];
	},
	
	/**
	 * Returns the asset
	 * @memberOf yAssetManager
	 * @param {String} pPath - The path to load the asset from.
	 * @param {Integer} pType - The type of the asset.
	 * @param {Boolean} pFallback - (Optional) Tells, if the sound file has a fallback file (ogg- AND mp3-file is available), in this case, don't add the extension to the file path.
	 */
	queueAsset: function(pPath, pType, pFallback){
		if(pType == this.SOUND && pFallback){
			this.loadQueue.push({path: pPath, type: pType, fallback: pFallback});
		}else{
			this.loadQueue.push({path: pPath, type: pType});
		}
		
	},
	
	/**
	 * Clears the cache array
	 * @memberOf yAssetManager
	 */
	clearCache: function(){
		this.cache = [];
	},
	
	/**
	 * Loads all queued assets and stores them in the cache
	 * @memberOf yAssetManager
	 * @param {Function} pCallback - The function to call when all assets are loaded.
	 */
	loadAssets: function(pCallback){
		this.progress = 0;
		
		if(this.loadQueue.length == 0){
        	pCallback();
        }
		
		// Load image files
		for(var i = 0; i < this.loadQueue.length; i++){
			var asset = this.loadQueue[i];

			if(asset.type == this.IMAGE){
				var img = new Image();
		        var that = this;
		        img.addEventListener("load", function() {
		            console.log("Info: " + this.src + " loaded.");
		            that.progress++;
		            if(that.progress = that.loadQueue.length){
		            	pCallback();
		            }
		        }, false);
		        img.addEventListener("error", function() {
		            console.log("Error: " + this.src + " could not be loaded.");
		            that.progress++;
		            if(that.progress = that.loadQueue.length){
		            	pCallback();
		            }
		        }, false);
		        img.src = asset.path;
		        this.cache[asset.path] = img;
			}else if(asset.type == this.SOUND){
				var sound = new Audio();
				if(asset.fallback){
					if(sound.canPlayType("audio/ogg; codecs=vorbis")){
						sound.src = asset.path + ".ogg";
					}else{
						sound.src = asset.path + ".mp3";
					}
				}else{
					sound.src = asset.path;
				}
				
		        var that = this;
		        sound.addEventListener("load", function() {
		            console.log("Info: " + this.src + " loaded.");
		            that.progress++;
		            if(that.progress = that.loadQueue.length){
		            	pCallback();
		            }
		        }, false);
		        sound.addEventListener("error", function() {
		            console.log("Error: " + this.src + " could not be loaded.");
		            that.progress++;
		            if(that.progress = that.loadQueue.length){
		            	pCallback();
		            }
		        }, false);
		        sound.src = path;
		        this.cache[asset.path] = sound;
			}
		}
		this.loadQueue = [];
	}
});
