
/**
 * @classdesc The timer class is used for countdown purposes and is able to execute a function when time is elapsed.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {Integer} pDuration - The duration of the timer in milliseconds.
 * @param {Integer} pDuration - The duration of the timer in milliseconds.
 * @property {Integer} duration - The duration.
 * @property {Integer} startTime - The time when the timer started.
 * @property {Integer} remainingTime - The remaining time.
 * @property {Boolean} paused - Tells, if the timer paused, Default is true;
 * @property {Boolean} elapsed - Tells, if the timer elapsed.
 * @property {Function} callback - (optional) The function that should be executed when the timer elapses.
 */
var yTimer = function(pDuration, pCallback){
	var that = this;
	that.duration = pDuration;
	that.startTime = Date.now();
	that.remainingTime = Date.now();
	that.paused = true;
	that.elapsed = false;
	that.callback = (pCallback ? pCallback : null);

	/**
	 * Updates remaining time and checks if time is up
	 */
	yTimer.prototype.update = function(){
		if(!that.paused){
			that.remainingTime = Date.now() - that.startTime - that.duration;
			
			if(remainingTime <= 0){
				that.elapsed = true;
				if(that.callback){
					eval(that.callback);
				}
				that.paused = true;
			}
		}
	}
	
	/**
	 * Starts the timer
	 */
	yTimer.prototype.start = function(){
		that.paused = false;
	}
	
	/**
	 * Pauses the timer
	 */
	yTimer.prototype.pause = function(){
		that.paused = true;
	}
};
