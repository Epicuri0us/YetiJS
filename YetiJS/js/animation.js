
/**
 * @class yAnimation
 * @augments Class
 * @classdesc The animation-object saves all the information and provides all methods to play sprite animations
 * 
 * @author Leo Zurbriggen
 * @param {ySpriteSheet} pSpriteSheet - The spritesheet.
 * @param {Integer} pFrameTime - The length in milliseconds a frame should be displayed.
 * @param {Integer} pFirstFrame - The ID on the spritesheet where the animation should begin.
 * @param {Integer} pLastFrame - The ID on the spritesheet where the animation should end.
 * @param {Boolean} pLoop - (optional) Tells, if the animation should loop (Default: false).
 * @property {ySpriteSheet} spriteSheet - The spritesheet.
 * @property {Integer} frameTime - The length in milliseconds a frame is displayed.
 * @property {Integer} firstFrame - The ID on the spritesheet where the animation begins.
 * @property {Integer} lastFrame - The ID on the spritesheet where the animation ends.
 * @property {Integer} activeFrame - The ID of the active frame.
 * @property {Boolean} loop - Tells, if the animation loops.
 * @property {Boolean} stopped - Tells, if the animation is running.
 * @property {Integer} lastFrameTime - Used to determine if the next frame should be drawn.
 */
var yAnimation = Class.extend({
	init: function(pSpriteSheet, pFrameTime, pFirstFrame, pLastFrame, pLoop){
		this.spriteSheet = pSpriteSheet;
		this.frameTime = pFrameTime;
		this.firstFrame = pFirstFrame;
		this.lastFrame = pLastFrame;
		this.activeFrame = this.firstFrame;
		this.loop = (pLoop ? pLoop : false);
		this.stopped = false;
		this.lastFrameTime = Date.now();
	},
	
	/**
	 * Draws the animation
	 * @memberOf  yAnimation
	 * @param {yVector} pPosition - The position to draw.
	 * @param {yCamera} pCamera - The camera.
	 */
	draw: function(pPosition, pCamera){
		if(Date.now() - this.lastFrameTime > this.frameTime){
			this.lastFrameTime = Date.now();
			if(this.activeFrame+1 > this.lastFrame){
				if(this.loop){
					this.activeFrame = this.firstFrame;
				}else{
					this.stopped = true;
				}
			}else{
				this.activeFrame++;
			}
		}
		this.spriteSheet.drawFrame(this.activeFrame, pPosition, pCamera);
	},
	
	/**
	 * Resets the active frame to the first one and starts the animation again
	 * @memberOf  yAnimation
	 */
	reset: function(){
		this.activeFrame = this.firstFrame;
		this.lastFrameTime = Date.now();
		this.stopped = false;
	}
});
