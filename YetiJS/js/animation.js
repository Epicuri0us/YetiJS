
/**
 * @classdesc The animation-object saves all the information and provides all methods to play sprite animations
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {ySpriteSheet} pSpriteSheet - The spritesheet.
 * @param {Integer} pFrameTime - The length in milliseconds a frame should be displayed.
 * @param {Integer} pFirstFrame - The ID on the spritesheet where the animation should begin.
 * @param {Integer} pLastFrame - The ID on the spritesheet where the animation should end.
 * @param {Boolean} pLoop - (optional) Tells, if the animation should loop (Default: false).
 * @property {ySpriteSheet} spriteSheet - The spritesheet.
 * @property {Integer} frameTime - The length in milliseconds a frame is displayed.
 * @property {Integer} firstFrame - The ID on the spritesheet where the animation begins.
 * @property {Integer} lastFrame - The ID on the spritesheet where the animation ends.
 * #property {Integer} activeFrame - The ID of the active frame.
 * @property {Boolean} loop - Tells, if the animation loops.
 * @property {Boolean} stopped - Tells, if the animation is running.
 * @property {Integer} lastFrameTime - Used to determine if the next frame should be drawn.
 */
var yAnimation = function(pSpriteSheet, pFrameTime, pFirstFrame, pLastFrame, pLoop){
	var that = this;
	that.spriteSheet = pSpriteSheet;
	that.frameTime = pFrameTime;
	that.firstFrame = pFirstFrame;
	that.lastFrame = pLastFrame;
	that.activeFrame = that.firstFrame;
	that.loop = (pLoop ? pLoop : false);
	that.stopped = false;
	that.lastFrameTime = Date.now();
	
	/**
	 * Draws the animation
	 * @param {yCamera} pCamera - The camera.
	 */
	yAnimation.prototype.draw = function(pCamera){
		if(Date.now() - this.lastFrameTime > this.frameTime){
			this.lastFrameTime = Date.now();
			if(this.activeFrame+1 > this.lastFrame){
				if(this.loop){
					this.activeFrame = this.firstFrame;
				}else{
					that.stopped = true;
				}
			}else{
				this.activeFrame++;
			}
		}
		this.spriteSheet.drawFrame(that.activeFrame, (position), pCamera);
	}
	
	/**
	 * Resets the active frame to the first one and starts the animation again
	 */
	yAnimation.prototype.reset = function(){
		that.activeFrame = that.firstFrame;
		that.lastFrameTime = Date.now();
		that.stopped = false;
	}
};
