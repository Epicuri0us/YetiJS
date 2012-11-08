
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
function yTimer(pDuration, pCallback){
	this.duration = pDuration;
	this.startTime = Date.now();
	this.remainingTime = Date.now();
	this.paused = true;
	this.elapsed = false;
	this.callback = (pCallback ? pCallback : null);

	/**
	 * Updates remaining time and checks if time is up
	 */
	yTimer.prototype.update = function(){
		if(!this.paused){
			this.remainingTime = Date.now() - this.startTime - this.duration;
			
			if(remainingTime <= 0){
				this.elapsed = true;
				if(this.callback){
					eval(this.callback);
				}
				this.paused = true;
			}
		}
	}
	
	/**
	 * Starts the timer
	 */
	yTimer.prototype.start = function(){
		this.paused = false;
	}
	
	/**
	 * Pauses the timer
	 */
	yTimer.prototype.pause = function(){
		this.paused = true;
	}
};
