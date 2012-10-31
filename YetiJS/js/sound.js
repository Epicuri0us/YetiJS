
/**
 * @classdesc The sound class should be used to play a short sound file.
 * 
 * @author Leo Zurbriggen
 * @constructor
 */
var ySound = function(pFileName){
	var that = this;
	if(new Audio().canPlayType("audio/ogg; codecs=vorbis")){
		this.audio = new Audio(pFileName + ".ogg");
	}else{
		this.audio = new Audio(pFileName + ".mp3");
	}
	
	that.prototype.play = function(){
		this.audio.play();
	}
	
	that.prototype.pause = function(){
		this.audio.pause();
	}
};