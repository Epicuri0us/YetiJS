
/**
 * @classdesc The sound class should be used to play a short sound file.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {String} pFileName - The file name of the sound.
 */
var ySound = function(pFileName){
	var that = this;
	
	/**
	 * Loads the audio file that can be played by the browser
	 */
	if(new Audio().canPlayType("audio/ogg; codecs=vorbis")){
		this.audio = new Audio(pFileName + ".ogg");
	}else{
		this.audio = new Audio(pFileName + ".mp3");
	}
	
	/**
	 * Plays the sound
	 */
	that.prototype.play = function(){
		this.audio.play();
	}
	
	
	/**
	 * Pauses the sound
	 */
	that.prototype.pause = function(){
		this.audio.pause();
	}
};